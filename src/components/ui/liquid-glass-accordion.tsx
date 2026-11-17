"use client"

import * as React from "react"
import { LayoutGroup, motion, useReducedMotion } from "framer-motion"

export type LiquidAccordionItem = {
  question: string
  answer: React.ReactNode
  id?: string
}

export type LiquidAccordionProps = {
  items: LiquidAccordionItem[]
  defaultOpen?: number | null
  open?: number | null
  onOpenChange?: (index: number | null) => void
  collapsible?: boolean
  headingLevel?: 2 | 3 | 4 | 5 | 6
  className?: string
}

const VERTEX_SHADER = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`
const FRAGMENT_SHADER = `precision mediump float;
uniform vec2 uResolution;uniform vec2 uScale;uniform float uTime;uniform vec4 uPool;uniform vec3 uRipple;
float roundedBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){
 vec2 p=vec2(gl_FragCoord.x/uScale.x,uResolution.y-gl_FragCoord.y/uScale.y);
 vec2 halfSize=uPool.zw*.5;float d=roundedBox(p-uPool.xy-halfSize,halfSize,min(20.,min(halfSize.x,halfSize.y)));
 float mask=1.-smoothstep(-1.2,1.2,d);float edge=1.-smoothstep(0.,4.,abs(d));
 float x=clamp((p.x-uPool.x+halfSize.x)/max(uPool.z,1.),0.,1.);
 float wave=sin(p.x*.045-uTime*4.6+p.y*.018)*1.3+sin(p.x*.021+uTime*2.8)*.8;
 float crestDelta=(p.y-(uPool.y-halfSize.y+7.+wave))*.16;float crest=exp(-crestDelta*crestDelta);
 float ripple=0.;if(uRipple.z>=0.){float ring=(length(p-uRipple.xy)-uRipple.z*150.)*.12;ripple=exp(-ring*ring)*(1.-smoothstep(.38,.62,uRipple.z));}
 vec3 amber=vec3(.96,.47,.12),cyan=vec3(.02,.65,.76);vec3 water=mix(amber,cyan,x);
 vec3 color=mix(vec3(.99,.97,.92),water,.12+crest*.13);color=mix(color,vec3(1.),edge*.42+ripple*.52);
 float alpha=mask*(.28+crest*.12)+edge*.18+ripple*.28;
 gl_FragColor=vec4(color,alpha);
}`

type WaterGL = { gl: WebGLRenderingContext; program: WebGLProgram; buffer: WebGLBuffer; uniforms: Record<string, WebGLUniformLocation | null> }
type Pool = { x: number; y: number; w: number; h: number; vx: number; vy: number; vw: number; vh: number }
type WaterState = {
  pool: Pool
  target: Pool
  ready: boolean
  moving: boolean
  ripple: { x: number; y: number; age: number } | null
  raf: number
  last: number
  time: number
  visible: boolean
  reduce: boolean
  gl: WaterGL | null
}

const createPool = (): Pool => ({ x: 0, y: 0, w: 0, h: 0, vx: 0, vy: 0, vw: 0, vh: 0 })
const createWaterState = (): WaterState => ({ pool: createPool(), target: createPool(), ready: false, moving: false, ripple: null, raf: 0, last: 0, time: 0, visible: true, reduce: false, gl: null })

function createWaterGL(canvas: HTMLCanvasElement): WaterGL | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: false })
  if (!gl) return null
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
    gl.deleteShader(shader)
    return null
  }
  const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex)
    if (fragment) gl.deleteShader(fragment)
    if (program) gl.deleteProgram(program)
    return null
  }
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  if (!buffer) {
    gl.deleteProgram(program)
    return null
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const attribute = gl.getAttribLocation(program, "a")
  gl.enableVertexAttribArray(attribute)
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0)
  const uniforms: Record<string, WebGLUniformLocation | null> = {}
  for (const name of ["uResolution", "uScale", "uTime", "uPool", "uRipple"]) uniforms[name] = gl.getUniformLocation(program, name)
  return { gl, program, buffer, uniforms }
}

export function LiquidAccordion({
  items,
  defaultOpen = 0,
  open,
  onOpenChange,
  collapsible = true,
  headingLevel = 3,
  className = "",
}: LiquidAccordionProps) {
  const [innerOpen, setInnerOpen] = React.useState<number | null>(defaultOpen)
  const current = open === undefined ? innerOpen : open
  const reducedMotion = useReducedMotion()
  const id = React.useId().replace(/:/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rowRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const lastSelected = React.useRef(defaultOpen ?? 0)
  const currentRef = React.useRef(current)
  const stepWaterRef = React.useRef<(now: number) => void>(() => {})
  const water = React.useRef(createWaterState())
  const [hasWebGL, setHasWebGL] = React.useState(false)
  const Heading = `h${headingLevel}` as const

  const measureTarget = React.useCallback((index: number | null): Pool | null => {
    const root = rootRef.current
    if (!root) return null
    const rootRect = root.getBoundingClientRect()
    if (index !== null && rowRefs.current[index]) {
      const rect = rowRefs.current[index]!.getBoundingClientRect()
      return { ...createPool(), x: rect.left - rootRect.left + rect.width / 2, y: rect.top - rootRect.top + rect.height / 2, w: rect.width, h: rect.height }
    }
    const icon = iconRefs.current[lastSelected.current]
    if (!icon) return null
    const rect = icon.getBoundingClientRect()
    return { ...createPool(), x: rect.left - rootRect.left + rect.width / 2, y: rect.top - rootRect.top + rect.height / 2, w: 34, h: 34 }
  }, [])

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return
    const rect = root.getBoundingClientRect()
    const logicalHeight = Math.max(600, rect.height)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(600_000 / Math.max(1, rect.width * logicalHeight)))
    const width = Math.max(1, Math.round(rect.width * dpr))
    const height = Math.max(1, Math.round(logicalHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
  }, [])

  const drawWater = React.useCallback(() => {
    const state = water.current
    const canvas = canvasRef.current
    if (!state.gl || !canvas) return
    const { gl, uniforms } = state.gl
    const width = Math.max(1, rootRef.current?.offsetWidth ?? 1)
    const height = Math.max(1, rootRef.current?.offsetHeight ?? 1)
    const scaleX = canvas.width / width
    const scaleY = canvas.height / height
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform2f(uniforms.uResolution, width, height)
    gl.uniform2f(uniforms.uScale, scaleX, scaleY)
    gl.uniform1f(uniforms.uTime, state.time)
    gl.uniform4f(uniforms.uPool, state.pool.x, state.pool.y, state.pool.w, state.pool.h)
    gl.uniform3f(uniforms.uRipple, state.ripple?.x ?? 0, state.ripple?.y ?? 0, state.ripple?.age ?? -1)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }, [])

  const stepWater = React.useCallback((now: number) => {
    const state = water.current
    const dt = Math.min((now - state.last) / 1000, 1 / 30)
    state.last = now
    state.time += dt
    const next = measureTarget(currentRef.current)
    if (next) state.target = next

    if (state.reduce) {
      Object.assign(state.pool, state.target, { vx: 0, vy: 0, vw: 0, vh: 0 })
      state.moving = false
      state.ripple = null
    } else {
      const wasMoving = state.moving
      const pool = state.pool
      const spring = (value: number, velocity: number, target: number) => {
        velocity += (520 * (target - value) - 44 * velocity) * dt
        return [value + velocity * dt, velocity] as const
      }
      for (const key of ["x", "y", "w", "h"] as const) {
        const velocityKey = `v${key}` as "vx" | "vy" | "vw" | "vh"
        const [value, velocity] = spring(pool[key], pool[velocityKey], state.target[key])
        pool[key] = value
        pool[velocityKey] = velocity
      }
      state.moving = Math.abs(pool.x - state.target.x) > 0.35 || Math.abs(pool.y - state.target.y) > 0.35 || Math.abs(pool.w - state.target.w) > 0.35 || Math.abs(pool.h - state.target.h) > 0.35 || Math.abs(pool.vx) + Math.abs(pool.vy) + Math.abs(pool.vw) + Math.abs(pool.vh) > 3
      if (!state.moving) {
        Object.assign(pool, state.target, { vx: 0, vy: 0, vw: 0, vh: 0 })
        if (wasMoving) state.ripple = { x: pool.x, y: pool.y, age: 0 }
      }
      if (state.ripple) {
        state.ripple.age += dt
        if (state.ripple.age > 0.62) state.ripple = null
      }
    }
    drawWater()
    if (state.visible && (state.moving || state.ripple)) state.raf = requestAnimationFrame((time) => stepWaterRef.current(time))
    else state.raf = 0
  }, [drawWater, measureTarget])

  React.useLayoutEffect(() => {
    currentRef.current = current
    stepWaterRef.current = stepWater
  }, [current, stepWater])

  const startWater = React.useCallback(() => {
    const state = water.current
    if (!state.gl || !state.visible || state.raf) return
    state.last = performance.now()
    state.raf = requestAnimationFrame((time) => stepWaterRef.current(time))
  }, [])

  const retargetWater = React.useCallback((initial = false) => {
    const state = water.current
    const next = measureTarget(currentRef.current)
    if (!next) return
    state.target = next
    if (!state.ready || initial) {
      Object.assign(state.pool, next)
      state.ready = true
      state.moving = false
      state.ripple = null
      drawWater()
      return
    }
    state.ripple = null
    state.moving = true
    startWater()
  }, [drawWater, measureTarget, startWater])

  React.useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return
    const state = water.current
    state.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    resizeCanvas()
    state.gl = createWaterGL(canvas)
    setHasWebGL(!!state.gl)
    if (state.gl) retargetWater(true)
    const lost = (event: Event) => {
      event.preventDefault()
      state.gl = null
      setHasWebGL(false)
    }
    const restored = () => {
      state.gl = createWaterGL(canvas)
      setHasWebGL(!!state.gl)
      if (state.gl) retargetWater(true)
    }
    canvas.addEventListener("webglcontextlost", lost)
    canvas.addEventListener("webglcontextrestored", restored)
    const observer = new ResizeObserver(() => {
      resizeCanvas()
      retargetWater()
      startWater()
    })
    observer.observe(root)
    const intersection = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting
      if (state.visible) startWater()
      else {
        cancelAnimationFrame(state.raf)
        state.raf = 0
      }
    })
    intersection.observe(root)
    const onVisibility = () => {
      state.visible = document.visibilityState === "visible"
      if (state.visible) startWater()
      else {
        cancelAnimationFrame(state.raf)
        state.raf = 0
      }
    }
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onMotionChange = () => { state.reduce = motionQuery.matches }
    motionQuery.addEventListener("change", onMotionChange)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      cancelAnimationFrame(state.raf)
      canvas.removeEventListener("webglcontextlost", lost)
      canvas.removeEventListener("webglcontextrestored", restored)
      motionQuery.removeEventListener("change", onMotionChange)
      document.removeEventListener("visibilitychange", onVisibility)
      observer.disconnect()
      intersection.disconnect()
      if (state.gl) {
        state.gl.gl.deleteBuffer(state.gl.buffer)
        state.gl.gl.deleteProgram(state.gl.program)
      }
      state.gl = null
    }
  }, [resizeCanvas, retargetWater, startWater])

  React.useLayoutEffect(() => {
    retargetWater(!water.current.ready)
  }, [current, retargetWater])

  const toggle = (index: number) => {
    const next = current === index ? (collapsible ? null : index) : index
    if (next === current) return
    lastSelected.current = index
    if (open === undefined) setInnerOpen(next)
    onOpenChange?.(next)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1
    if (event.key === "ArrowDown") next = (index + 1) % items.length
    if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = items.length - 1
    if (next < 0) return
    event.preventDefault()
    rootRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus()
  }

  return (
    <LayoutGroup id={`faq-${id}`}>
      <div ref={rootRef} className={`relative isolate overflow-hidden rounded-3xl border border-border-subtle bg-white/80 p-2 shadow-card backdrop-blur-xl ${className}`}>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_0%,rgba(245,158,11,0.08),transparent_44%),radial-gradient(ellipse_at_100%_100%,rgba(0,192,232,0.06),transparent_38%)]" />
        <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[1] h-full w-full ${hasWebGL ? "" : "hidden"}`} />
        {items.map((item, index) => {
          const isOpen = current === index
          const questionId = `${id}-${item.id ?? index}-question`
          const answerId = `${id}-${item.id ?? index}-answer`

          return (
            <div key={item.id ?? index} ref={(element) => { rowRefs.current[index] = element }} className="relative px-1">
              {index > 0 && <div aria-hidden="true" className="mx-4 h-px bg-border-subtle/80" />}
              {isOpen && !hasWebGL && (
                <motion.div
                  layoutId="faq-active-surface"
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38, mass: 0.72 }}
                  className="absolute inset-x-1 top-1 bottom-1 rounded-2xl border border-white/90 bg-[linear-gradient(120deg,rgba(245,158,11,0.09),rgba(255,255,255,0.76)_44%,rgba(0,192,232,0.06))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(17,18,21,0.035)]"
                />
              )}
              <Heading className="relative z-10 m-0">
                <button
                  id={questionId}
                  type="button"
                  className="group flex min-h-[60px] w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-sm font-semibold leading-snug text-charcoal-950 outline-none transition-colors duration-150 hover:text-charcoal-700 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-inset sm:px-5 sm:text-[15px]"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  aria-disabled={isOpen && !collapsible ? true : undefined}
                  onClick={() => toggle(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="flex-1">{item.question}</span>
                  <span
                    aria-hidden="true"
                    ref={(element) => { iconRefs.current[index] = element }}
                    className={`relative grid size-8 shrink-0 place-items-center rounded-full border border-brand-orange/15 bg-white/70 text-brand-orange shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-200 ${isOpen ? "rotate-180" : "group-hover:scale-105"}`}
                  >
                    <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                    <span className={`absolute h-[1.5px] w-3 rotate-90 rounded-full bg-current transition-transform duration-150 ${isOpen ? "scale-x-0" : "scale-x-100"}`} />
                  </span>
                </button>
              </Heading>
              <motion.div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={reducedMotion ? { duration: 0 } : { height: { duration: 0.26, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.16 } }}
                className="relative z-10 overflow-hidden"
              >
                <div className="px-4 pb-5 pr-14 text-[13px] leading-relaxed text-charcoal-700 sm:px-5 sm:pb-6 sm:pr-16 sm:text-sm">
                  {item.answer}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

export { LiquidAccordion as Component }
export default LiquidAccordion

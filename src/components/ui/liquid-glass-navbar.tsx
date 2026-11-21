"use client"

/** Nimbus UI Waterline liquid navbar, adapted for BacktoBase. Original by guglielmogiannattasio.it. */
import * as React from "react"
import Link from "next/link"

export type NimbusFx = "plane" | "drop" | "spin" | "glow" | "wave" | "pop" | "none"

export type LiquidNavItem = {
  label: string
  href?: string
  icon?: React.ReactNode
  fx?: NimbusFx
}

export type LiquidNavbarProps = {
  items?: LiquidNavItem[]
  defaultActive?: number
  active?: number
  onChange?: (index: number, item: LiquidNavItem) => void
  tone?: "light" | "dark"
  compact?: boolean
  /** Optional brand/logo rendered inside the pill, before the nav items */
  brand?: React.ReactNode
  sound?: boolean
  className?: string
  style?: React.CSSProperties
}

const icon = (children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export const NimbusIcons = {
  home: icon(<><path d="M3.5 11.2 12 4l8.5 7.2" /><path d="M6 9.6V20h12V9.6" /><path className="nv-door" d="M10 20v-5h4v5Z" /></>),
  globe: icon(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" /></>),
  plane: icon(<path d="M21 12.2 3.6 5.4l2.7 6.8-2.7 6.4L21 12.2Zm-14.7 0H13" />),
  drop: icon(<path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z" />),
  user: icon(<><circle cx="12" cy="8.5" r="3.8" /><path d="M4.8 20c1.2-3.4 4-5 7.2-5s6 1.6 7.2 5" /></>),
}

const DEFAULT_ITEMS: LiquidNavItem[] = [
  { label: "Home", icon: NimbusIcons.home, fx: "glow" },
  { label: "Explore", icon: NimbusIcons.globe, fx: "spin" },
  { label: "Flights", icon: NimbusIcons.plane, fx: "plane" },
  { label: "Weather", icon: NimbusIcons.drop, fx: "drop" },
  { label: "Profile", icon: NimbusIcons.user, fx: "wave" },
]

const PAD = 14

const NIMBUS_CSS = `
.nimbus-nav{--n-tint:rgba(255,255,255,.85);--n-fg:#111215;--n-fg-soft:#5D626D;--n-rim:rgba(232,227,218,.92);position:relative;display:inline-flex;align-items:center;gap:2px;padding:6px;border-radius:999px;isolation:isolate;font-family:inherit;-webkit-font-smoothing:antialiased;user-select:none;-webkit-tap-highlight-color:transparent}
.nimbus-nav[data-tone="dark"]{--n-tint:rgba(18,22,26,.88);--n-fg:#FAF7F2;--n-fg-soft:rgba(250,247,242,.68);--n-rim:rgba(255,255,255,.18)}
.nimbus-glass{position:absolute;inset:0;border-radius:inherit;z-index:-2;overflow:hidden;background:var(--n-tint);-webkit-backdrop-filter:blur(12px) saturate(1.08);backdrop-filter:blur(12px) saturate(1.08);box-shadow:inset 0 1px 1px rgba(255,255,255,.8),inset 0 0 0 1px var(--n-rim),0 4px 20px -2px rgba(0,0,0,.06),0 2px 6px -1px rgba(0,0,0,.04)}
.nimbus-nav[data-refract="on"] .nimbus-glass{-webkit-backdrop-filter:url(#nimbus-refract) blur(2px) saturate(1.2) brightness(1.08);backdrop-filter:url(#nimbus-refract) blur(2px) saturate(1.2) brightness(1.08)}
.nimbus-water{position:absolute;left:-14px;top:-14px;z-index:-1;pointer-events:none}.nimbus-nav[data-gl="off"] .nimbus-water{display:none}
.nimbus-drop{display:none;position:absolute;top:6px;bottom:6px;left:0;border-radius:999px;z-index:-1;pointer-events:none;will-change:transform;background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.92),rgba(255,255,255,0) 55%),linear-gradient(120deg,rgba(245,158,11,.18),rgba(0,192,232,.12));box-shadow:inset 0 1px 1px rgba(255,255,255,.92),inset 0 -2px 6px rgba(234,88,12,.14),inset 0 0 0 1px rgba(234,88,12,.2),0 4px 12px -6px rgba(17,18,21,.16)}
.nimbus-nav[data-gl="off"] .nimbus-drop{display:block}.nimbus-item{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border:0;border-radius:999px;background:none;color:var(--n-fg-soft);font-family:inherit;font-weight:600;font-size:12px;line-height:1;letter-spacing:.01em;text-decoration:none;cursor:pointer;transition:color 120ms cubic-bezier(.2,0,0,1),background-color 120ms cubic-bezier(.2,0,0,1)}
.nimbus-item[aria-current="page"]{color:var(--n-fg);background:rgba(234,88,12,.08)}.nimbus-item:focus-visible{outline:2px solid #EA580C;outline-offset:2px}
.nv-ico{position:relative;display:inline-flex;flex:none}.nv-ico svg{transition:transform 120ms cubic-bezier(.2,0,0,1)}.nimbus-item[aria-current="page"] .nv-ico{color:#EA580C}.nimbus-item[aria-current="page"] .nv-ico svg{transform:translateY(-1px) scale(1.06)}.nv-door{fill:transparent}
.nv-ico[data-fx="pop"] svg{animation:nvPop .5s cubic-bezier(.3,1.6,.5,1) both}@keyframes nvPop{0%{transform:scale(.72)}60%{transform:scale(1.2)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx="plane"] svg{animation:nvPlane 1.15s cubic-bezier(.55,0,.3,1) both}@keyframes nvPlane{0%{transform:none}12%{transform:translate(-3px,2px) rotate(7deg)}42%{transform:translate(64px,-26px) rotate(-24deg) scale(.9);opacity:0}43%{transform:translate(-60px,16px) rotate(-12deg) scale(.9);opacity:0}58%{opacity:1}80%{transform:translate(3px,-1px) rotate(2deg)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx="plane"]::after{content:"";position:absolute;left:55%;top:48%;height:2px;width:46px;border-radius:2px;transform-origin:0 50%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.95));animation:nvTrail 1.15s ease-out both;pointer-events:none}@keyframes nvTrail{0%,8%{opacity:0;transform:rotate(-22deg) scaleX(0)}30%{opacity:.9;transform:rotate(-22deg) scaleX(1)}55%,100%{opacity:0;transform:rotate(-22deg) translateX(30px) scaleX(.2)}}
.nv-ico[data-fx="drop"] svg{animation:nvDrop .95s cubic-bezier(.4,0,.3,1) both;transform-origin:50% 100%}@keyframes nvDrop{0%{transform:translateY(-1px)}26%{transform:translateY(-13px) scale(.88,1.12)}46%{transform:translateY(3px) scale(1.3,.68)}62%{transform:translateY(-3px) scale(.92,1.08)}80%{transform:translateY(0) scale(1.04,.97)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx="drop"]::before,.nv-ico[data-fx="drop"]::after{content:"";position:absolute;bottom:0;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:currentColor;opacity:0;pointer-events:none}.nv-ico[data-fx="drop"]::before{animation:nvSplashL .95s ease-out both}.nv-ico[data-fx="drop"]::after{animation:nvSplashR .95s ease-out both}@keyframes nvSplashL{0%,44%{opacity:0;transform:none}50%{opacity:.9;transform:translate(-5px,-6px)}75%,100%{opacity:0;transform:translate(-11px,1px) scale(.4)}}@keyframes nvSplashR{0%,44%{opacity:0;transform:none}50%{opacity:.9;transform:translate(5px,-7px)}75%,100%{opacity:0;transform:translate(12px,1px) scale(.4)}}
.nv-ico[data-fx="spin"] svg{animation:nvSpin 1s cubic-bezier(.2,.75,.25,1) both}@keyframes nvSpin{0%{transform:perspective(80px) rotateY(0)}100%{transform:perspective(80px) rotateY(360deg) translateY(-1px) scale(1.08)}}
.nv-ico[data-fx="glow"] svg{animation:nvHop .8s cubic-bezier(.3,1.4,.5,1) both;transform-origin:50% 100%}@keyframes nvHop{0%{transform:none}30%{transform:translateY(-5px) scale(1.04,.96)}55%{transform:translateY(0) scale(1.12,.88)}75%{transform:translateY(-2px) scale(.98,1.04)}100%{transform:translateY(-1px) scale(1.08)}}.nv-ico[data-fx="glow"] .nv-door{animation:nvDoor 1.3s ease both}@keyframes nvDoor{0%{fill:transparent}30%{fill:#FFF3A8}100%{fill:rgba(126,232,255,.6)}}
.nv-ico[data-fx="wave"] svg{animation:nvWave .9s ease-in-out both;transform-origin:50% 92%}@keyframes nvWave{0%{transform:none}20%{transform:rotate(-15deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(4deg)}100%{transform:translateY(-1px) scale(1.08)}}
.nimbus-nav[data-compact="true"] .nimbus-item{padding:0 13px}.nimbus-nav[data-compact="true"] .nimbus-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:520px){.nimbus-nav:not([data-compact="false"]) .nimbus-item{padding:0 13px}.nimbus-nav:not([data-compact="false"]) .nimbus-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}
.nimbus-brand{position:relative;z-index:1;display:inline-flex;align-items:center;height:42px;padding:0 16px 0 12px;margin-right:8px;border-radius:999px;text-decoration:none;transition:transform 120ms cubic-bezier(.2,0,0,1)}.nimbus-brand:hover{transform:scale(1.03)}.nimbus-brand:active{transform:scale(.97)}.nimbus-brand:focus-visible{outline:2px solid #EA580C;outline-offset:2px}.nimbus-brand::after{content:"";position:absolute;right:-5px;top:11px;bottom:11px;width:1px;background:var(--n-rim)}
@media (min-width:768px) and (max-width:1023px){.nimbus-nav[data-brand="true"] .nimbus-item{padding:0 13px}.nimbus-nav[data-brand="true"] .nimbus-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}
@media (prefers-reduced-motion:reduce){.nv-ico svg,.nv-ico::before,.nv-ico::after,.nv-door{animation:none!important;transition:none}.nimbus-brand{transition:none}}
`

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`
const FRAG = `precision highp float;uniform vec2 uRes;uniform float uDpr;uniform float uTime;uniform vec4 uPill;uniform vec4 uBlob[6];uniform float uSy[6];uniform vec4 uRip[6];uniform vec3 uMouse;uniform float uDark;uniform float uAmb;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}float sdCap(vec2 p,vec4 B,float sy){p-=B.xy;p.y/=sy;p.x=max(abs(p.x)-B.z,0.);return(length(p)-B.w)*min(1.,sy);}float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}float dropD(vec2 p){float d=1e4;for(int i=0;i<6;i++){if(uBlob[i].w>.5)d=smin(d,sdCap(p,uBlob[i],uSy[i]),13.);}return d;}float pillD(vec2 p){vec2 h=uPill.zw*.5;return sdRB(p-uPill.xy-h,h,h.y);}float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1000.);w+=uAmb*(sin(p.x*.05+uTime*.45)*.14+sin(p.x*.13-uTime*.35+p.y*.2)*.07);return w;}float H(vec2 p){float dp=pillD(p);return lens(dp,uPill.w*.36)*2.4+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,7.,-dp);}float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;float dp=pillD(p);float dd=dropD(p);float h0=H(p);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));vec3 V=vec3(0.,0.,1.);float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.3;float fres=clamp((1.-n.z)*4.,0.,1.);vec3 irid=mix(vec3(.96,.55,.20),vec3(.05,.68,.80),clamp(fres*1.5,0.,1.));float pm=1.-smoothstep(-1.,1.,dp);float dm=(1.-smoothstep(-1.,1.,dd))*(1.-smoothstep(-2.,1.,dp));float sh=(1.-smoothstep(-9.,9.,dropD(p-vec2(0.,5.))))*(1.-dm)*pm*(.11+.07*uDark);vec3 c=vec3(.22,.15,.07)*sh;float a=sh;float pa=clamp(pm*(fres*.5+spec*.9+spec2),0.,1.);c=mix(vec3(1.),irid,.5*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);float th=lens(dd,11.);float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);vec3 tint=mix(vec3(.99,.95,.87),vec3(.55,.82,1.),uDark);float rim=dm*(1.-smoothstep(0.,8.,-dd));float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);float body=.5+.5*clamp(-n.y*3.,-1.,1.);float da=dm*(.26+.14*body)*(1.-.35*uDark);vec3 dc=mix(tint,vec3(1.),body*.6);float la=rim*.22;vec3 lc=mix(vec3(.91,.34,.05),vec3(0.,.64,.77),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);la=clamp(cres*.7+smoothstep(.6,1.,cs)*.28*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);la=clamp(dm*(spec*1.2+spec2*.5),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);la=dm*smoothstep(-2.,0.,dd)*.4;dc=mix(vec3(1.),irid,.35)*la+dc*(1.-la);da=la+da*(1.-la);c=dc+c*(1.-da);a=da+a*(1.-da);gl_FragColor=vec4(c,a);}`

type Body = { x: number; v: number }
type Sat = { x: number; y: number; vx: number; vy: number; r: number; k: number }
type Rip = { x: number; y: number; age: number; amp: number }

function makeState() {
  return { a: { x: 0, v: 0 } as Body, b: { x: 0, v: 0 } as Body, sy: { s: 1, v: 0 }, lead: 0 as 0 | 1, sats: [] as Sat[], rips: [] as Rip[], t: { x: 0, cy: 0, q: 0, r: 21 }, q: 0, mouse: { x: 0, y: 0, s: 0, on: false }, moving: false, split: false, ready: false, w: 0, h: 0, visible: true, reduce: false, raf: 0, last: 0, time: 0, glc: null as null | { gl: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null> } }
}

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false })
  if (!gl) return null
  const shader = (type: number, source: string) => {
    const result = gl.createShader(type)
    if (!result) return null
    gl.shaderSource(result, source)
    gl.compileShader(result)
    return gl.getShaderParameter(result, gl.COMPILE_STATUS) ? result : null
  }
  const vs = shader(gl.VERTEX_SHADER, VERT)
  const fs = shader(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  if (!buffer) return null
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, "a")
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const uniforms: Record<string, WebGLUniformLocation | null> = {}
  for (const name of ["uRes", "uDpr", "uTime", "uPill", "uBlob", "uSy", "uRip", "uMouse", "uDark", "uAmb"]) uniforms[name] = gl.getUniformLocation(program, name)
  return { gl, u: uniforms }
}

function supportsRefraction() {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false
  return /Chrome\/|Chromium\/|Edg\//.test(navigator.userAgent) && !/Firefox\//.test(navigator.userAgent) && CSS.supports("backdrop-filter", "url(#a)")
}

export function LiquidNavbar({ items = DEFAULT_ITEMS, defaultActive = 0, active, onChange, tone = "light", compact, brand, sound = false, className, style }: LiquidNavbarProps) {
  const [inner, setInner] = React.useState(defaultActive)
  const current = active ?? inner
  const navRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const dropRef = React.useRef<HTMLSpanElement>(null)
  const itemRefs = React.useRef<(HTMLElement | null)[]>([])
  const iconRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const audio = React.useRef<AudioContext | null>(null)
  const st = React.useRef(makeState())
  const [gl, setGl] = React.useState<"on" | "off">("on")
  const [refract, setRefract] = React.useState(false)
  const [fx, setFx] = React.useState({ i: -1, n: 0 })

  const draw = React.useCallback(() => {
    const s = st.current, T = s.t, sep = Math.abs(s.a.x - s.b.x)
    const thin = Math.min(sep / (2 * (s.q + T.r) || 1), 1), r = T.r * (1 - 0.3 * thin)
    if (s.glc) {
      const { gl: g, u } = s.glc, dpr = Math.min(window.devicePixelRatio || 1, 2)
      g.viewport(0, 0, g.drawingBufferWidth, g.drawingBufferHeight)
      g.uniform2f(u.uRes, s.w + PAD * 2, s.h + PAD * 2); g.uniform1f(u.uDpr, dpr); g.uniform1f(u.uTime, s.time); g.uniform4f(u.uPill, PAD, PAD, s.w, s.h)
      const blobs = new Float32Array(24), sy = new Float32Array(6).fill(1), head = s.lead === 0 ? s.a : s.b, tail = s.lead === 0 ? s.b : s.a
      blobs.set([head.x, T.cy, s.q * (1 - 0.25 * thin), T.r * (1 - 0.12 * thin), tail.x, T.cy, s.q * (1 - 0.8 * thin), T.r * (1 - 0.5 * thin)])
      sy[0] = sy[1] = s.sy.s; s.sats.slice(0, 4).forEach((d, i) => blobs.set([d.x, d.y, 0, d.r], 8 + i * 4)); g.uniform4fv(u.uBlob, blobs); g.uniform1fv(u.uSy, sy)
      const rips = new Float32Array(24); s.rips.slice(-6).forEach((p, i) => rips.set([p.x, p.y, p.age, p.amp], i * 4)); g.uniform4fv(u.uRip, rips)
      g.uniform3f(u.uMouse, s.mouse.x, s.mouse.y, s.mouse.s); g.uniform1f(u.uDark, tone === "dark" ? 1 : 0); g.uniform1f(u.uAmb, s.reduce ? 0 : 0.22); g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT); g.drawArrays(g.TRIANGLES, 0, 3)
    } else if (dropRef.current) {
      dropRef.current.style.width = `${sep + 2 * (s.q + r)}px`
      dropRef.current.style.transform = `translateX(${Math.min(s.a.x, s.b.x) - s.q - r - PAD}px) scaleY(${s.sy.s})`
    }
  }, [tone])

  const step = React.useCallback((dt: number) => {
    const s = st.current, T = s.t
    s.time += dt; s.q += (T.q - s.q) * Math.min(1, dt * 36)
    const bodies = [s.a, s.b]; let still = true
    if (s.reduce) { s.a.x = s.b.x = T.x; s.a.v = s.b.v = 0; s.sy.s = 1; s.sats = [] }
    else {
      bodies.forEach((B, i) => {
        const lead = i === s.lead, k = lead ? 1500 : 1000, c = lead ? 70 : 58
        B.v += (k * (T.x - B.x) - c * B.v) * dt; B.x += B.v * dt
        const lo = PAD + 6 + s.q + T.r - 3, hi = PAD + s.w - 6 - s.q - T.r + 3
        if (B.x < lo || B.x > hi) { s.sy.v -= Math.min(Math.abs(B.v), 900) * 0.0007; B.x = Math.max(lo, Math.min(hi, B.x)); B.v *= -0.25 }
        if (Math.abs(T.x - B.x) > 0.3 || Math.abs(B.v) > 3) still = false
      })
      const L = bodies[s.lead], syT = 1 - 0.1 * Math.min(Math.abs(L.v) / 2200, 1)
      s.sy.v += (430 * (syT - s.sy.s) - 40 * s.sy.v) * dt; s.sy.s += s.sy.v * dt
      if (Math.abs(s.sy.s - 1) > 0.002 || Math.abs(s.sy.v) > 0.02) still = false
      const sep = Math.abs(s.a.x - s.b.x), r = T.r * (1 - 0.3 * Math.min(sep / (2 * (T.q + T.r) || 1), 1))
      if (!s.split && s.moving && sep - 2 * T.q - 2 * r > -6) {
        s.split = true; const lo = bodies[1 - s.lead], hi = bodies[s.lead]
        ;[0.3, 0.5, 0.72].forEach((t, j) => s.sats.push({ x: lo.x + (hi.x - lo.x) * t + (Math.random() - 0.5) * 6, y: T.cy + (Math.random() - 0.5) * 10, vx: (lo.v + hi.v) * 0.45, vy: (Math.random() - 0.5) * 60, r: 5 + Math.random() * 3 - j * 0.5, k: 70 + Math.random() * 90 }))
      }
      s.sats = s.sats.filter((d) => { d.vx += (d.k * (T.x - d.x) - 9 * d.vx) * dt; d.vy += (90 * (T.cy - d.y) - 7 * d.vy) * dt; d.x += d.vx * dt; d.y += d.vy * dt; d.x = Math.max(PAD + 8 + d.r, Math.min(PAD + s.w - 8 - d.r, d.x)); d.y = Math.max(T.cy - T.r + d.r, Math.min(T.cy + T.r - d.r, d.y)); if (Math.abs(T.x - d.x) < T.q + T.r * 0.5) d.r -= dt * 26; return d.r > 0.6 })
      if (s.sats.length) still = false
    }
    if (s.moving && still) { s.moving = false; s.rips.push({ x: T.x, y: T.cy, age: 0, amp: 0.45 }) }
    s.rips.forEach((p) => { p.age += dt }); s.rips = s.rips.filter((p) => p.age < 1.6)
    s.mouse.s += ((s.mouse.on ? 1 : 0) - s.mouse.s) * Math.min(1, dt * 30)
  }, [])

  const loop = React.useCallback(() => {
    const s = st.current
    if (s.raf) return
    s.last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - s.last) / 1000, 1 / 30); s.last = now; step(dt); draw()
      const busy = s.moving || s.rips.length > 0 || s.sats.length > 0 || s.mouse.s > 0.01
      if (s.visible && busy) s.raf = requestAnimationFrame(tick)
      else s.raf = 0
    }
    s.raf = requestAnimationFrame(tick)
  }, [draw, step])

  const measure = React.useCallback(() => {
    const nav = navRef.current, el = itemRefs.current[current]
    if (!nav || !el) return
    const s = st.current, T = s.t
    s.w = nav.offsetWidth; s.h = nav.offsetHeight; T.r = el.offsetHeight / 2; T.q = Math.max(0, el.offsetWidth / 2 - T.r); T.cy = PAD + el.offsetTop + el.offsetHeight / 2
    const nx = PAD + el.offsetLeft + el.offsetWidth / 2
    if (!s.ready) { s.a.x = s.b.x = nx; s.q = T.q; s.ready = true }
    else if (Math.abs(nx - T.x) > 0.5) { s.lead = Math.abs(nx - s.a.x) <= Math.abs(nx - s.b.x) ? 0 : 1; s.moving = true; s.split = true }
    T.x = nx
    const canvas = canvasRef.current
    if (canvas) { const dpr = Math.min(window.devicePixelRatio || 1, 2), width = s.w + PAD * 2, height = s.h + PAD * 2; if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); canvas.style.width = `${width}px`; canvas.style.height = `${height}px` } }
    loop()
  }, [current, loop])

  React.useEffect(() => {
    const refractionCheck = requestAnimationFrame(() => setRefract(supportsRefraction()))
    const s = st.current; s.reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    const canvas = canvasRef.current; s.glc = canvas ? initGL(canvas) : null
    if (!s.glc) setGl("off")
    const lost = (event: Event) => { event.preventDefault(); s.glc = null; setGl("off") }
    canvas?.addEventListener("webglcontextlost", lost)
    const observer = new IntersectionObserver(([entry]) => { s.visible = entry.isIntersecting; if (s.visible) loop() })
    if (navRef.current) observer.observe(navRef.current)
    const visibility = () => { s.visible = document.visibilityState === "visible"; if (s.visible) loop() }
    document.addEventListener("visibilitychange", visibility)
    return () => { cancelAnimationFrame(refractionCheck); canvas?.removeEventListener("webglcontextlost", lost); observer.disconnect(); document.removeEventListener("visibilitychange", visibility); cancelAnimationFrame(s.raf); s.raf = 0 }
  }, [loop])

  React.useLayoutEffect(() => { measure() }, [measure, items.length, compact])
  React.useEffect(() => {
    let lastWidth = -1
    const observer = new ResizeObserver(() => { const width = navRef.current?.offsetWidth ?? 0; if (width !== lastWidth) { lastWidth = width; st.current.ready = false; measure() } })
    if (navRef.current) observer.observe(navRef.current)
    return () => observer.disconnect()
  }, [measure])
  React.useEffect(() => { loop() }, [tone, loop])

  const local = (clientX: number, clientY: number) => { const rect = navRef.current!.getBoundingClientRect(); return { x: clientX - rect.left + PAD, y: clientY - rect.top + PAD } }
  const ripple = (x: number, y: number, amp: number) => { const s = st.current; if (s.reduce) return; s.rips.push({ x, y, age: 0, amp }); loop() }
  const iconCenter = (i: number) => { const el = iconRefs.current[i]; if (!el) return null; const rect = el.getBoundingClientRect(); return local(rect.left + rect.width / 2, rect.top + rect.height / 2) }
  const plip = () => {
    if (!sound) return
    try {
      const AudioContextClass = window.AudioContext
      const context = audio.current ?? (audio.current = new AudioContextClass()), time = context.currentTime
      const oscillator = context.createOscillator(), gain = context.createGain()
      oscillator.type = "sine"; oscillator.frequency.setValueAtTime(460, time); oscillator.frequency.exponentialRampToValueAtTime(1500, time + 0.07)
      gain.gain.setValueAtTime(0.0001, time); gain.gain.exponentialRampToValueAtTime(0.16, time + 0.008); gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16)
      oscillator.connect(gain).connect(context.destination); oscillator.start(time); oscillator.stop(time + 0.18)
    } catch { /* Audio is optional; browsers may block synthesized sound. */ }
  }
  const select = (i: number) => {
    const kind = items[i]?.fx ?? (items[i]?.icon ? "pop" : "none")
    setFx((f) => ({ i, n: f.n + 1 })); plip()
    const center = iconCenter(i)
    if (center && kind === "drop") window.setTimeout(() => ripple(center.x, st.current.t.cy, 1.4), 260)
    if (center && kind === "plane") ripple(center.x, center.y, 0.6)
    if (i !== current) { if (active === undefined) setInner(i); onChange?.(i, items[i]) }
  }
  const onKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key !== "ArrowRight" && event.key !== "ArrowLeft") || !items.length) return
    event.preventDefault()
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length
    select(next); itemRefs.current[next]?.focus()
  }
  const onMove = (event: React.PointerEvent) => { if (event.pointerType !== "mouse") return; const point = local(event.clientX, event.clientY); st.current.mouse.x = point.x; st.current.mouse.y = point.y; st.current.mouse.on = true; loop() }

  return (
    <nav ref={navRef} className={["nimbus-nav", className].filter(Boolean).join(" ")} data-tone={tone} data-gl={gl} data-compact={compact === undefined ? undefined : String(compact)} data-refract={refract ? "on" : "off"} data-brand={brand ? "true" : undefined} aria-label="Main navigation" onKeyDown={onKeyDown} onPointerMove={onMove} onPointerLeave={() => { st.current.mouse.on = false; loop() }} onPointerDown={(event) => { const point = local(event.clientX, event.clientY); ripple(point.x, point.y, 0.8) }} style={style}>
      <style dangerouslySetInnerHTML={{ __html: NIMBUS_CSS }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><filter id="nimbus-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="7" result="noise" /><feGaussianBlur in="noise" stdDeviation="2" result="soft" /><feDisplacementMap in="SourceGraphic" in2="soft" scale="60" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
      <span className="nimbus-glass" aria-hidden="true" /><canvas className="nimbus-water" ref={canvasRef} aria-hidden="true" /><span className="nimbus-drop" ref={dropRef} aria-hidden="true" />
      {brand}
      {items.map((item, i) => {
        const kind = item.fx ?? "pop", playing = fx.i === i && kind !== "none"
        const content = <>{item.icon && <span className="nv-ico" key={playing ? fx.n : 0} data-fx={playing ? kind : undefined} ref={(el) => { iconRefs.current[i] = el }}>{item.icon}</span>}<span className="nimbus-label">{item.label}</span></>
        const common = { ref: (el: HTMLElement | null) => { itemRefs.current[i] = el }, className: "nimbus-item", "aria-current": i === current ? ("page" as const) : undefined, onClick: () => select(i), "aria-label": item.label }
        return item.href ? <Link key={item.label + i} {...common} href={item.href}>{content}</Link> : <button key={item.label + i} {...common} type="button">{content}</button>
      })}
    </nav>
  )
}

export { LiquidNavbar as Component }
export default LiquidNavbar

import assert from "node:assert/strict";
import test from "node:test";
import { makeDroplets } from "../src/components/ui/liquid-glass-accordion.tsx";

test("long FAQ jumps create three droplets between the current and target pools", () => {
  assert.deepEqual(makeDroplets({ x: 40, y: 20 }, { x: 80, y: 220 }), [
    { x: 40, y: 80, vx: 0, vy: 0, r: 6 },
    { x: 40, y: 120, vx: 0, vy: 0, r: 5 },
    { x: 40, y: 160, vx: 0, vy: 0, r: 4 },
  ]);
  assert.deepEqual(makeDroplets({ x: 40, y: 20 }, { x: 80, y: 120 }), []);
});

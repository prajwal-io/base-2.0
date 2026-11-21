import assert from "node:assert/strict";
import test from "node:test";
import {
  SCENE_HEIGHT,
  SCENE_WIDTH,
  DEFAULT_CREW,
  DEFAULT_DOODLES,
  clamp,
  clampBubblePercent,
  createFloaters,
  hash,
  layoutWord,
  lookAt,
  seatPoint,
  stepFloater,
  timeline,
} from "../src/components/ui/doodle-crew-footer.tsx";

test("layoutWord fits 10-letter BACKTOBASE cleanly inside scene bounds with headroom for human crew", () => {
  const layout = layoutWord("BACKTOBASE", { tracking: -0.026 });
  assert.equal(layout.glyphs.length, 10);
  assert.ok(layout.startX >= 80, `expected left margin >= 80, got ${layout.startX}`);
  const last = layout.glyphs[layout.glyphs.length - 1];
  assert.ok(
    last.x + last.width <= SCENE_WIDTH - 80,
    `expected right edge <= ${SCENE_WIDTH - 80}, got ${last.x + last.width}`,
  );
  assert.ok(layout.capTopY > 150, `expected headroom > 150 for seated human figures, got ${layout.capTopY}`);
});

test("seatPoint positions all 5 human BacktoBase crew members inside bounds without overlapping", () => {
  const layout = layoutWord("BACKTOBASE", { tracking: -0.026 });
  const points = DEFAULT_CREW.map((member) => ({
    name: member.name,
    seat: member.seat,
    ...seatPoint(layout.glyphs[member.letter], member.seat, member.offset ?? 0, SCENE_WIDTH),
  }));

  for (const pt of points) {
    assert.ok(pt.x >= 64 && pt.x <= SCENE_WIDTH - 64, `${pt.name} x=${pt.x} out of bounds`);
    assert.ok(pt.y > 0 && pt.y < SCENE_HEIGHT, `${pt.name} y=${pt.y} out of bounds`);
  }

  // Every pair of crew members on the same seat must remain well separated horizontally
  const topCrew = points.filter((p) => p.seat === "top");
  for (let i = 0; i < topCrew.length; i += 1) {
    for (let j = i + 1; j < topCrew.length; j += 1) {
      assert.ok(
        Math.abs(topCrew[i].x - topCrew[j].x) > 200,
        `top crew ${topCrew[i].name} and ${topCrew[j].name} too close`,
      );
    }
  }

  const frontCrew = points.filter((p) => p.seat === "front");
  assert.ok(Math.abs(frontCrew[0].x - frontCrew[1].x) > 350, "front crew members overlap");
});

test("clampBubblePercent keeps speech bubbles safely inside viewport on left and right edges", () => {
  assert.equal(clampBubblePercent(0), 16);
  assert.equal(clampBubblePercent(SCENE_WIDTH), 84);
  assert.equal(clampBubblePercent(SCENE_WIDTH / 2), 50);
});

test("pure helpers hash, clamp, lookAt, stepFloater, and timeline remain deterministic and bounded", () => {
  assert.equal(hash(42), hash(42));
  assert.ok(hash(42) >= 0 && hash(42) < 1);
  assert.equal(clamp(15, 0, 10), 10);

  const eye = lookAt(100, 100, 400, 100, 2.0);
  assert.ok(Math.abs(eye.dx - 2.0) < 0.01 && Math.abs(eye.dy) < 0.01);

  const floaters = createFloaters(DEFAULT_DOODLES, 9);
  assert.equal(floaters.length, 9);
  const stepped = stepFloater(
    floaters[0],
    0.016,
    { width: SCENE_WIDTH, height: SCENE_HEIGHT },
    { x: floaters[0].x + 20, y: floaters[0].y },
  );
  assert.ok(Number.isFinite(stepped.x) && Number.isFinite(stepped.y));

  const tl = timeline(10, 5, 3);
  assert.ok(tl.letter(0) < tl.letter(9));
  assert.ok(tl.crew(0) >= tl.letter(9));
  assert.ok(tl.word(0) > tl.crew(4));
});

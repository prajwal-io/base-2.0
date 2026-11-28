import assert from "node:assert/strict";
import test from "node:test";
import { getReviewCategories, TESTIMONIAL_EDITIONS } from "../src/data/phase2-content.ts";

test("review filters reflect roles and edition references stated in published stories", () => {
  assert.deepEqual(getReviewCategories("Staff Software Engineer at Blue Yonder"), ["Community members", "Industry professionals"]);
  assert.deepEqual(getReviewCategories("Founder", "I have been a speaker at BacktoBase three times."), ["Community members", "Speaker voices"]);
  assert.deepEqual(TESTIMONIAL_EDITIONS["lohith-sai"], ["04"]);
  assert.deepEqual(TESTIMONIAL_EDITIONS.vennela, ["06"]);
});

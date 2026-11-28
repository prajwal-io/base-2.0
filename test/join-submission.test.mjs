import assert from "node:assert/strict";
import test from "node:test";
import { createJoinSubmission } from "../src/lib/join-submission.ts";

function makeForm(overrides = {}) {
  const form = new FormData();
  form.set("name", "Jamie Lee");
  form.set("email", "jamie@example.com");
  form.set("role", "Mentor");
  form.append("interests", "mentoring");
  for (const [key, value] of Object.entries(overrides)) form.set(key, value);
  return form;
}

test("valid applications prepare email drafts without claiming delivery", async () => {
  const submit = createJoinSubmission();
  const result = await submit({ status: "idle" }, makeForm());

  assert.equal(result.status, "draft");
  assert.match(result.draftText, /Mentor/);
  assert.match(result.draftText, /Mentor or share experience/);
  assert.equal(new URL(result.gmailUrl).searchParams.get("body"), null);
  assert.doesNotMatch(result.gmailUrl, /Jamie|jamie/i);
  assert.equal(new URLSearchParams(result.mailtoUrl.split("?")[1]).get("body"), null);
  assert.match(result.mailtoUrl, /^mailto:/);
});

test("invalid data, honeypot entries, and rate-limited requests do not prepare a draft", async () => {
  const submit = createJoinSubmission(async () => false);
  assert.equal((await submit({ status: "idle" }, makeForm({ email: "bad" }), "203.0.113.8")).status, "error");
  assert.equal((await submit({ status: "idle" }, makeForm({ website: "bot" }), "203.0.113.8")).status, "error");
  assert.equal((await submit({ status: "idle" }, makeForm(), "203.0.113.8")).status, "error");
});

test("configured rate limiting fails closed when the request has no address or the limiter is unavailable", async () => {
  const submit = createJoinSubmission(async () => { throw new Error("limiter unavailable"); });
  assert.equal((await submit({ status: "idle" }, makeForm())).status, "error");
  assert.equal((await submit({ status: "idle" }, makeForm(), "203.0.113.8")).status, "error");
});

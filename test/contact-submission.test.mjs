import assert from "node:assert/strict";
import test from "node:test";
import { createContactSubmission } from "../src/lib/contact-submission.ts";

function makeForm(overrides = {}) {
  const form = new FormData();
  form.set("name", "  Jamie Lee  ");
  form.set("email", " jamie@example.com ");
  form.set("message", "  I would like to learn more.  ");
  for (const [key, value] of Object.entries(overrides)) form.set(key, value);
  return form;
}

function makeAction(overrides = {}) {
  const calls = { rateLimit: [], send: [], failures: [] };
  const action = createContactSubmission({
    getClientIp: async () => "203.0.113.8",
    isDeliveryConfigured: () => true,
    checkRateLimit: async (ip) => { calls.rateLimit.push(ip); return true; },
    sendEmail: async (contact) => { calls.send.push(contact); return true; },
    recordFailure: (...failure) => { calls.failures.push(failure); },
    ...overrides,
  });
  return { action, calls };
}

test("invalid fields and the honeypot stop before rate limiting or email delivery", async () => {
  const { action, calls } = makeAction();

  const invalid = await action({ status: "idle" }, makeForm({ email: "invalid" }));
  assert.equal(invalid.status, "error");

  const bot = await action({ status: "idle" }, makeForm({ website: "https://spam.example" }));
  assert.equal(bot.status, "error");
  assert.deepEqual(calls.rateLimit, []);
  assert.deepEqual(calls.send, []);
});

test("without SMTP delivery, a valid submission returns a Gmail draft", async () => {
  const { action, calls } = makeAction({ isDeliveryConfigured: () => false });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "draft");
  assert.equal(new URL(result.draftUrl).searchParams.get("to"), "backtobase2025@gmail.com");
  assert.equal(new URL(result.draftUrl).searchParams.get("body"), null);
  assert.match(result.draftText, /Jamie Lee/);
  assert.match(result.draftText, /jamie@example\.com/);
  assert.doesNotMatch(result.draftUrl, /Jamie|jamie|learn%20more/i);
  assert.match(result.mobileDraftUrl, /^mailto:backtobase2025@gmail\.com\?/);
  assert.equal(new URLSearchParams(result.mobileDraftUrl.split("?")[1]).get("body"), null);
  assert.deepEqual(calls.rateLimit, []);
  assert.deepEqual(calls.send, []);
});

test("a rate-limited submission is not sent and includes a Gmail fallback", async () => {
  const { action, calls } = makeAction({ checkRateLimit: async (ip) => { calls.rateLimit.push(ip); return false; } });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "error");
  assert.match(result.message, /Too many messages/);
  assert.ok("draftUrl" in result);
  assert.ok("mobileDraftUrl" in result);
  assert.deepEqual(calls.send, []);
  assert.deepEqual(calls.failures, []);
});

test("if the shared limiter fails closed to email and offers the draft", async () => {
  const { action, calls } = makeAction({ checkRateLimit: async () => { throw new Error("Redis unavailable"); } });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "error");
  assert.match(result.message, /temporarily unavailable/);
  assert.ok("draftUrl" in result);
  assert.ok("mobileDraftUrl" in result);
  assert.deepEqual(calls.send, []);
  assert.equal(calls.failures[0][0], "rate_limit");
  assert.match(calls.failures[0][1].message, /Redis unavailable/);
});

test("without a trusted client IP, direct email is blocked and the draft remains available", async () => {
  const { action, calls } = makeAction({ getClientIp: async () => null });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "error");
  assert.match(result.message, /Direct delivery is temporarily unavailable/);
  assert.ok("draftUrl" in result);
  assert.ok("mobileDraftUrl" in result);
  assert.deepEqual(calls.rateLimit, []);
  assert.deepEqual(calls.send, []);
});

test("an allowed submission sends the trimmed message and reports success", async () => {
  const { action, calls } = makeAction();
  const result = await action({ status: "idle" }, makeForm());

  assert.deepEqual(result, { status: "sent" });
  assert.deepEqual(calls.rateLimit, ["203.0.113.8"]);
  assert.deepEqual(calls.send, [{
    name: "Jamie Lee",
    email: "jamie@example.com",
    message: "I would like to learn more.",
  }]);
});

test("contact categories are validated and included in the prepared message", async () => {
  const { action, calls } = makeAction({ isDeliveryConfigured: () => false });
  const result = await action({ status: "idle" }, makeForm({ category: "corporate" }));

  assert.equal(result.status, "draft");
  assert.match(new URL(result.draftUrl).searchParams.get("su"), /Corporate partnership/);
  assert.match(result.draftText, /Enquiry type: Corporate partnership/);
  assert.equal(new URL(result.draftUrl).searchParams.get("body"), null);
  assert.deepEqual(calls.send, []);
  const invalid = await action({ status: "idle" }, makeForm({ category: "arbitrary" }));
  assert.equal(invalid.status, "error");
});

test("a rejected email returns an actionable error and draft", async () => {
  const { action } = makeAction({ sendEmail: async () => false });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "error");
  assert.match(result.message, /could not be sent/);
  assert.ok("draftUrl" in result);
  assert.ok("mobileDraftUrl" in result);
});

test("an email transport failure returns an actionable error and draft", async () => {
  const { action, calls } = makeAction({ sendEmail: async () => { throw new Error("SMTP unavailable"); } });
  const result = await action({ status: "idle" }, makeForm());

  assert.equal(result.status, "error");
  assert.match(result.message, /could not be sent/);
  assert.ok("draftUrl" in result);
  assert.ok("mobileDraftUrl" in result);
  assert.deepEqual(calls.failures, [["email_delivery", new Error("SMTP unavailable")]]);
});

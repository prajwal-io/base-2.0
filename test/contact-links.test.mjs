import assert from "node:assert/strict";
import test from "node:test";
import { createGmailComposeUrl, createMailtoComposeUrl } from "../src/data/contact.ts";

test("compose links open with a subject and keep message text out of their URLs", () => {
  const url = createMailtoComposeUrl("Hello there");
  const [recipient, query] = url.slice("mailto:".length).split("?");
  const params = new URLSearchParams(query);

  assert.equal(recipient, "backtobase2025@gmail.com");
  assert.equal(params.get("subject"), "Hello there");
  assert.equal(params.get("body"), null);
  assert.equal(new URL(createGmailComposeUrl("Hello there")).searchParams.get("body"), null);
});

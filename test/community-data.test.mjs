import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { EDITIONS, TEAM_MEMBERS } from "../src/data/communityData.ts";
import { createJoinEmailHref } from "../src/data/joinEmail.ts";

test("all nine editions have a local photo", () => {
  assert.deepEqual(EDITIONS.map((edition) => edition.editionNumber), [
    "01", "02", "03", "04", "05", "06", "07", "08", "09",
  ]);

  for (const edition of EDITIONS) {
    assert.ok(existsSync(join("public", edition.image.slice(1))), edition.image);
  }
});

test("the roster matches the verified team list without duplicates", () => {
  assert.deepEqual(TEAM_MEMBERS, [
    "Sai Venkata Midhilesh Teki",
    "Janardhana Chary Vinukonda",
    "Ujwala Golla",
    "Goutham Sai",
    "Spandhana Chowdhary",
    "Prajwal Kanuparthi",
    "MVS Manvit",
    "Sairam Thatikonda",
    "Thanuja Chintham",
    "Aditi Rathan",
    "Venkata Datta Chaitanya",
    "Hasini Anchoori",
    "Vennela Ankam",
    "Jagan Pallapu",
    "Sonia G",
    "Sahasrika Gowrishetty",
    "Nikhila Ravipati",
  ]);
  assert.equal(new Set(TEAM_MEMBERS).size, TEAM_MEMBERS.length);
});

test("event hosts and additional contributors remain recorded", () => {
  const latestEdition = EDITIONS.find((edition) => edition.editionNumber === "09");
  assert.ok(latestEdition?.hosts?.includes("Dileep Sajja (Growth Strategist)"));
  assert.ok(latestEdition?.supporters?.includes("Health Navig Private Limited"));
});

test("join details are encoded into an email draft for BacktoBase", () => {
  const href = createJoinEmailHref({
    name: "Asha & Co",
    email: "asha@example.com",
    role: "student",
    institution: "College",
    interest: "attending",
    message: "Learn & build",
  });
  const [recipient, query] = href.slice("mailto:".length).split("?");
  const params = new URLSearchParams(query);

  assert.equal(recipient, "backtobase2025@gmail.com");
  assert.equal(params.get("subject"), "BacktoBase application from Asha & Co");
  assert.equal(params.get("body"), [
    "Name: Asha & Co",
    "Email: asha@example.com",
    "Role: student",
    "College / Company: College",
    "Interest: attending",
    "Message: Learn & build",
  ].join("\n"));
});

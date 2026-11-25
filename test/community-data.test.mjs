import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  EDITIONS,
  EDITION_COUNT,
  normalizeVenue,
  TEAM_MEMBERS,
  TESTIMONIALS,
  VENUE_COUNT,
} from "../src/data/communityData.ts";

test("all nine edition records are present", () => {
  assert.deepEqual(EDITIONS.map((edition) => edition.editionNumber), [
    "01", "02", "03", "04", "05", "06", "07", "08", "09",
  ]);
});

test("event totals and venue groups are derived from the catalogue", () => {
  assert.equal(EDITION_COUNT, EDITIONS.length);
  assert.equal(VENUE_COUNT, 7);
  assert.equal(normalizeVenue("EPAM Systems (15th Floor)"), "EPAM Systems");
  assert.equal(normalizeVenue("EPAM Systems"), "EPAM Systems");
});

test("every event content record has the fields required by the archive", () => {
  for (const edition of EDITIONS) {
    assert.match(edition.editionNumber, /^\d{2}$/);
    assert.ok(edition.title.trim());
    assert.ok(edition.date.trim());
    assert.ok(edition.venue.trim());
    assert.ok(["Completed", "Upcoming"].includes(edition.status));
    assert.ok(Array.isArray(edition.speakers));
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

test("testimonial slugs are unique and each story portrait exists", () => {
  const slugs = new Set();

  for (const testimonial of TESTIMONIALS) {
    assert.ok(!slugs.has(testimonial.slug), "duplicate testimonial slug: " + testimonial.slug);
    slugs.add(testimonial.slug);
    assert.ok(existsSync("public" + testimonial.avatar), "missing portrait: " + testimonial.avatar);
  }
});

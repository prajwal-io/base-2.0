import assert from "node:assert/strict";
import test from "node:test";
import { BACKTOBASE_VIDEOS } from "../src/data/videos.ts";

test("video archive contains only the ten approved, unique YouTube videos", () => {
	assert.deepEqual(BACKTOBASE_VIDEOS.map(({ id }) => id), [
		"_jbUt6T5eF8", "Zm4ktj1e8uE", "AgFILhadWeI", "t43Nfbblu20", "UvLzX8XCinM",
		"bCVZ2DFjI14", "801vo1p_OK0", "cDaitIzp7UQ", "JjyS3d6sttQ", "S9ZumYT1BoA",
	]);
	assert.equal(new Set(BACKTOBASE_VIDEOS.map(({ id }) => id)).size, BACKTOBASE_VIDEOS.length);
	assert.ok(BACKTOBASE_VIDEOS.every(({ id, edition, title }) => /^[\w-]{11}$/.test(id) && /^\d{2}$/.test(edition) && title.includes(edition)));
});

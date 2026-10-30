import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBudget, formatDate } from "../src/interop_ffi.mjs";

test("formats budget and date without local timezone drift", () => {
  assert.equal(formatBudget(48000), "€48,000");
  assert.match(formatDate("2026-09-24"), /^24 Sep\w* 2026$/);
});

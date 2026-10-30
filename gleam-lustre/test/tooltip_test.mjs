import assert from "node:assert/strict";
import { test } from "node:test";
import { tooltipPosition } from "../src/tooltip_ffi.mjs";

test("tooltips stay inside the viewport and move above controls near the bottom", () => {
  const viewport = { width: 320, height: 600 };
  const tip = { width: 200, height: 40 };
  assert.deepEqual(
    tooltipPosition({ left: 0, top: 0, bottom: 30, width: 30 }, tip, viewport),
    { left: 8, top: 38 },
  );
  assert.deepEqual(
    tooltipPosition(
      { left: 290, top: 570, bottom: 600, width: 30 },
      tip,
      viewport,
    ),
    { left: 112, top: 522 },
  );
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  init,
  view,
  Model,
} from "../build/dev/javascript/meridian/meridian.mjs";
import { to_string } from "../build/dev/javascript/lustre/lustre/element.mjs";

test("rendered icons reference bundled symbols and stay decorative", async () => {
  const sprite = await readFile(
    new URL("../assets/icons.svg", import.meta.url),
    "utf8",
  );
  const ids = [...sprite.matchAll(/<symbol id="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal(ids.length, new Set(ids).size);
  const [initial] = init(["system", false]);
  for (const model of [
    initial,
    new Model("dark", true, true, initial.projects),
  ]) {
    const html = to_string(view(model));
    const uses = [...html.matchAll(/href="\.\/icons\.svg#([^"]+)"/g)];
    assert.ok(uses.length > 20);
    for (const [, name] of uses)
      assert.ok(ids.includes(name), `Missing icon: ${name}`);
    for (const [svg] of html.matchAll(/<svg[^>]*class="icon"[^>]*>/g)) {
      assert.match(svg, /aria-hidden="true"/);
      assert.match(svg, /focusable="false"/);
    }
  }
});

test("self-hosted variable font and licence are present", async () => {
  const font = await readFile(
    new URL("../assets/fonts/manrope-latin-variable.woff2", import.meta.url),
  );
  assert.equal(font.toString("ascii", 0, 4), "wOF2");
  const licence = await readFile(
    new URL("../assets/fonts/OFL.txt", import.meta.url),
    "utf8",
  );
  assert.match(licence, /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("the theme control is a button describing the next option in the cycle", () => {
  for (const [mode, next] of [
    ["light", "dark"],
    ["dark", "system"],
    ["system", "light"],
  ]) {
    const [model] = init([mode, false]);
    const html = to_string(view(model));
    assert.match(
      html,
      new RegExp(
        `<button[^>]+aria-label="Theme: ${mode[0].toUpperCase() + mode.slice(1)}\\. Switch to ${next} theme"`,
      ),
    );
    assert.doesNotMatch(html, /<select[^>]+aria-label="Choose theme"/);
  }
});

test("the open mobile drawer is labelled and makes background controls inert", () => {
  const [initial] = init(["system", false]);
  const closed = to_string(view(initial));
  assert.doesNotMatch(closed, /aria-modal="true"/);
  const opened = to_string(
    view(new Model("system", false, true, initial.projects)),
  );
  const drawer = opened.match(/<aside[^>]*>/)[0];
  for (const attribute of [
    'role="dialog"',
    'aria-label="Navigation"',
    'aria-modal="true"',
  ]) {
    assert.ok(drawer.includes(attribute));
  }
  assert.match(opened, /<button[^>]*aria-label="Close navigation"/);
  for (const element of ["header", "main", "footer"]) {
    assert.match(opened, new RegExp(`<${element}[^>]*inert`));
  }
});

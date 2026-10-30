import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatBudget,
  formatDate,
  readTheme,
  saveTheme,
  systemDark,
  watchSystemTheme,
  setupNavigation,
  focusMenu,
  focusNavigation,
} from "../src/interop_ffi.mjs";

test("formats budget and date without local timezone drift", () => {
  assert.equal(formatBudget(48000), "€48,000");
  assert.match(formatDate("2026-09-24"), /^24 Sep\w* 2026$/);
});

test("mobile navigation traps focus, restores it without scrolling and closes on desktop", () => {
  const originalDocument = globalThis.document;
  const originalMedia = globalThis.matchMedia;
  const root = new EventTarget();
  const media = Object.assign(new EventTarget(), { matches: true });
  let open = true;
  let visible = true;
  let closed = 0;
  let options;
  const control = () => ({
    focus(value) {
      document.activeElement = this;
      options = value;
    },
  });
  const controls = [control(), control(), control()];
  const button = Object.assign(control(), {
    getClientRects: () => (visible ? [{}] : []),
  });
  root.classList = { contains: () => open };
  root.querySelectorAll = () => controls;
  try {
    globalThis.document = {
      activeElement: null,
      querySelector: (selector) =>
        ({
          ".dashboard": root,
          ".menu-button": button,
          ".sidebar .brand": controls[0],
          ".drawer-close": controls[1],
        })[selector],
    };
    globalThis.matchMedia = () => media;
    setupNavigation(() => closed++);
    focusNavigation();
    assert.equal(document.activeElement, controls[1]);
    focusMenu();
    assert.equal(document.activeElement, button);
    assert.deepEqual(options, { preventScroll: true });
    visible = false;
    focusMenu();
    assert.equal(document.activeElement, controls[0]);
    const tab = (shiftKey = false) =>
      root.dispatchEvent(
        Object.assign(new Event("keydown", { cancelable: true }), {
          key: "Tab",
          shiftKey,
        }),
      );
    controls[2].focus();
    tab();
    assert.equal(document.activeElement, controls[0]);
    tab(true);
    assert.equal(document.activeElement, controls[2]);
    open = false;
    tab();
    assert.equal(document.activeElement, controls[2]);
    media.matches = false;
    media.dispatchEvent(Object.assign(new Event("change"), { matches: false }));
    assert.equal(closed, 1);
  } finally {
    if (originalDocument) globalThis.document = originalDocument;
    else delete globalThis.document;
    if (originalMedia) globalThis.matchMedia = originalMedia;
    else delete globalThis.matchMedia;
  }
});

test("theme persistence is optional when storage is unavailable", () => {
  const storage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const media = globalThis.matchMedia;
  try {
    globalThis.matchMedia = () => ({ matches: true });
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("Storage blocked");
      },
    });
    assert.equal(readTheme(), "system");
    assert.equal(systemDark(), true);
    assert.doesNotThrow(() => saveTheme("light"));
  } finally {
    if (storage) Object.defineProperty(globalThis, "localStorage", storage);
    else delete globalThis.localStorage;
    if (media) globalThis.matchMedia = media;
    else delete globalThis.matchMedia;
  }
});

test("stored theme takes precedence over system preference", () => {
  const storage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const values = new Map();
  try {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: (key) => values.get(key),
        setItem: (key, value) => values.set(key, value),
      },
    });
    assert.equal(readTheme(), "system");
    values.set("meridian-gleam-theme", "invalid");
    assert.equal(readTheme(), "system");
    for (const theme of ["dark", "light", "system"]) {
      saveTheme(theme);
      assert.equal(values.get("meridian-gleam-theme"), theme);
      assert.equal(readTheme(), theme);
    }
  } finally {
    if (storage) Object.defineProperty(globalThis, "localStorage", storage);
    else delete globalThis.localStorage;
  }
});

test("system theme subscription reports the current OS palette and live changes", () => {
  const original = globalThis.matchMedia;
  const media = new EventTarget();
  media.matches = true;
  const seen = [];
  try {
    globalThis.matchMedia = (query) => {
      assert.equal(query, "(prefers-color-scheme: dark)");
      return media;
    };
    watchSystemTheme((dark) => seen.push(dark));
    media.dispatchEvent(Object.assign(new Event("change"), { matches: false }));
    assert.deepEqual(seen, [true, false]);
    delete globalThis.matchMedia;
    assert.equal(systemDark(), false);
    assert.doesNotThrow(() =>
      watchSystemTheme(() => assert.fail("No media API")),
    );
  } finally {
    if (original) globalThis.matchMedia = original;
    else delete globalThis.matchMedia;
  }
});

const currency = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const date = new Intl.DateTimeFormat("en-IE", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatBudget = (value) => currency.format(value);
export const formatDate = (value) =>
  date.format(new Date(`${value}T00:00:00Z`));

export function readTheme() {
  try {
    const saved = localStorage.getItem("meridian-gleam-theme");
    if (saved === "dark" || saved === "light" || saved === "system")
      return saved;
  } catch {}
  return "system";
}

export function systemDark() {
  return (
    globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
  );
}

export function saveTheme(preference) {
  try {
    localStorage.setItem("meridian-gleam-theme", preference);
  } catch {}
}

export function watchSystemTheme(onChange) {
  const media = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
  if (!media) return;
  // The root app owns this listener for the lifetime of the page.
  media.addEventListener("change", (event) => onChange(event.matches));
  onChange(media.matches);
}

export function focusMenu() {
  const button = document.querySelector(".menu-button");
  const target = button?.getClientRects().length
    ? button
    : document.querySelector(".sidebar .brand");
  target?.focus({ preventScroll: true });
}

export function focusNavigation() {
  document.querySelector(".drawer-close")?.focus({ preventScroll: true });
}

export function setupNavigation(onDesktop) {
  const root = document.querySelector(".dashboard");
  const mobile = matchMedia("(max-width: 800px)");
  // The root app owns these listeners for the lifetime of the page.
  mobile.addEventListener("change", (event) => {
    if (!event.matches) onDesktop();
  });
  root.addEventListener("keydown", (event) => {
    if (
      event.key !== "Tab" ||
      !mobile.matches ||
      !root.classList.contains("menu-open")
    )
      return;
    const controls = root.querySelectorAll(".sidebar a[href], .sidebar button");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

export function downloadCsv(content) {
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "meridian-projects.csv";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

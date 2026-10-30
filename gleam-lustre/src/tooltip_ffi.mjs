export function tooltipPosition(target, tip, viewport) {
  const gap = 8;
  return {
    left: Math.max(
      gap,
      Math.min(
        target.left + (target.width - tip.width) / 2,
        viewport.width - tip.width - gap,
      ),
    ),
    top: Math.max(
      gap,
      target.bottom + tip.height + gap * 2 <= viewport.height
        ? target.bottom + gap
        : target.top - tip.height - gap,
    ),
  };
}

export function setupTooltips() {
  const root = document.querySelector(".dashboard");
  const tip = document.createElement("div");
  tip.id = "dashboard-tooltip";
  tip.className = "tooltip-popover";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  if (tip.showPopover) tip.setAttribute("popover", "manual");
  root.append(tip);
  let trigger;
  let pendingTarget;
  let timer;

  function hide() {
    clearTimeout(timer);
    if (tip.hidePopover && tip.matches(":popover-open")) tip.hidePopover();
    tip.hidden = true;
    if (trigger) {
      const ids = (trigger.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== tip.id);
      if (ids.length) trigger.setAttribute("aria-describedby", ids.join(" "));
      else trigger.removeAttribute("aria-describedby");
    }
    trigger = undefined;
    pendingTarget = undefined;
  }

  function position() {
    if (!trigger || tip.hidden) return;
    tip.style.left = "0px";
    tip.style.top = "0px";
    const bounds = tooltipPosition(
      trigger.getBoundingClientRect(),
      tip.getBoundingClientRect(),
      { width: innerWidth, height: innerHeight },
    );
    tip.style.left = `${bounds.left}px`;
    tip.style.top = `${bounds.top}px`;
  }

  function hasFocus() {
    return (trigger ?? pendingTarget)?.contains(document.activeElement);
  }

  function show(target, delay) {
    if (target === tip) {
      clearTimeout(timer);
      return;
    }
    const next = target.closest?.("[data-tooltip]");
    if (!next) return;
    if (next === trigger) {
      clearTimeout(timer);
      return;
    }
    hide();
    pendingTarget = next;
    timer = setTimeout(() => {
      if (!next.isConnected) return;
      trigger = next;
      pendingTarget = undefined;
      tip.textContent = next.dataset.tooltip;
      tip.hidden = false;
      tip.showPopover?.();
      trigger.setAttribute(
        "aria-describedby",
        [trigger.getAttribute("aria-describedby"), tip.id]
          .filter(Boolean)
          .join(" "),
      );
      position();
    }, delay);
  }

  // The root app owns these delegated listeners for the lifetime of the page.
  root.addEventListener("pointerover", (event) => show(event.target, 300));
  root.addEventListener("focusin", (event) => show(event.target, 0));
  root.addEventListener("pointerout", (event) => {
    if (
      hasFocus() ||
      trigger?.contains(event.relatedTarget) ||
      event.relatedTarget === tip
    )
      return;
    clearTimeout(timer);
    timer = setTimeout(hide, 100);
  });
  tip.addEventListener("pointerenter", () => clearTimeout(timer));
  tip.addEventListener("pointerleave", () => {
    if (!hasFocus()) hide();
  });
  root.addEventListener("focusout", hide);
  root.addEventListener("click", hide);
  root.addEventListener("transitionend", position);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hide();
  });
  // Keep keyboard hints visible while focus scrolls the control into view.
  const updatePosition = () => (hasFocus() ? position() : hide());
  document.addEventListener("scroll", updatePosition, true);
  window.addEventListener("resize", updatePosition);
}

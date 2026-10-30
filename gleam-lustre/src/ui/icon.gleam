import lustre/attribute as a
import lustre/element.{type Element}
import lustre/element/svg

pub fn view(name: String) -> Element(msg) {
  svg.svg(
    [
      a.class("icon"),
      a.attribute("viewBox", "0 0 24 24"),
      a.attribute("width", "20"),
      a.attribute("height", "20"),
      a.attribute("fill", "none"),
      a.attribute("stroke", "currentColor"),
      a.attribute("stroke-width", "1.8"),
      a.attribute("stroke-linecap", "round"),
      a.attribute("stroke-linejoin", "round"),
      a.aria_hidden(True),
      a.attribute("focusable", "false"),
    ],
    [svg.use_([a.href("./icons.svg#" <> name)])],
  )
}

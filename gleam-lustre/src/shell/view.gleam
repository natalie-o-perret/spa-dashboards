import gleam/list
import lustre/attribute as a
import lustre/element.{type Element}
import lustre/element/html as h
import lustre/event as e
import meridian_ui/button
import meridian_ui/shell
import meridian_ui/tooltip
import ui/icon

pub fn view(
  id: String,
  dark: Bool,
  preference: String,
  menu_open: Bool,
  toggle_theme: msg,
  toggle_menu: msg,
  close_menu: msg,
  dismiss_menu: msg,
  content: List(Element(msg)),
) -> Element(msg) {
  shell.view(
    id,
    dark,
    menu_open,
    dismiss_menu,
    [a.class("dashboard")],
    shell.Content(
      topbar: [
        h.div([a.class("topbar-start")], [
          shell.menu_button(
            id,
            menu_open,
            toggle_menu,
            icon.view("menu"),
            icon.view("x"),
          ),
          h.a(
            [
              a.href("../"),
              a.class("comparison-link"),
              tooltip.hint("Compare all four dashboards"),
            ],
            [icon.view("arrow-left"), h.text("All dashboards")],
          ),
          h.span(
            [
              a.class("framework-badge"),
              tooltip.hint("Built with Gleam and Lustre"),
            ],
            [
              icon.view("sparkles"),
              h.text("Gleam + Lustre"),
            ],
          ),
        ]),
        h.div([a.class("topbar-actions")], [
          h.span([a.class("data-note")], [h.text("Illustrative data")]),
          h.a(
            [
              a.href(
                "https://github.com/natalie-o-perret/spa-dashboards/tree/main/gleam-lustre",
              ),
              a.target("_blank"),
              a.rel("noreferrer"),
              a.aria_label("View Gleam Lustre source on GitHub"),
              tooltip.hint("View source on GitHub"),
              a.class("icon-button source-link"),
            ],
            [icon.view("github")],
          ),
          theme_toggle(preference, toggle_theme),
          h.span(
            [a.class("avatar"), tooltip.hint("Demo workspace: Maya Chen")],
            [h.text("MC")],
          ),
        ]),
      ],
      sidebar: [
        h.div([a.class("sidebar-heading")], [
          h.a([a.href("#overview"), a.class("brand"), e.on_click(close_menu)], [
            h.img([
              a.src("./meridian.svg"),
              a.alt(""),
              a.width(38),
              a.height(38),
            ]),
            h.div([], [
              h.strong([], [h.text("meridian")]),
              h.span([], [h.text("A clearer view of the work")]),
            ]),
          ]),
          shell.close_button(dismiss_menu, icon.view("x")),
        ]),
        h.p([a.class("eyebrow workspace-label")], [h.text("Workspace")]),
        h.nav(
          [a.aria_label("Primary navigation")],
          list.map(
            [
              #("layout-dashboard", "Overview", "#overview"),
              #("chart-no-axes-combined", "Analytics", "#analytics"),
              #("folder-kanban", "Projects", "#projects"),
              #("users-round", "Team", "#team"),
            ],
            fn(item) {
              h.a(
                [
                  a.href(item.2),
                  e.on_click(close_menu),
                  tooltip.hint("Go to " <> item.1),
                ],
                [
                  h.span([a.class("nav-icon")], [icon.view(item.0)]),
                  h.span([a.class("nav-label")], [h.text(item.1)]),
                  h.span([a.class("nav-arrow")], [icon.view("arrow-up-right")]),
                ],
              )
            },
          ),
        ),
        h.div([a.class("cycle-note")], [
          h.span([a.class("eyebrow")], [h.text("Cycle 18")]),
          h.p([], [h.text("Make room for good work.")]),
          h.span([a.class("muted")], [
            h.text("A shared view for a focused team."),
          ]),
        ]),
      ],
      main: content,
      footer: [
        h.text("Meridian / Portfolio operations"),
        h.span([], [h.text("Built with Gleam + Lustre")]),
      ],
    ),
  )
}

fn theme_toggle(preference: String, toggle_theme: msg) -> Element(msg) {
  let #(glyph, label, next) = case preference {
    "light" -> #("sun", "Light", "dark")
    "dark" -> #("moon", "Dark", "system")
    _ -> #("monitor", "System", "light")
  }
  let hint = "Theme: " <> label <> ". Switch to " <> next <> " theme"
  button.icon(
    [
      a.class("theme-toggle"),
      a.aria_label(hint),
      tooltip.hint(hint),
      e.on_click(toggle_theme),
    ],
    [icon.view(glyph)],
  )
}

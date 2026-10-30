import gleam/dynamic/decode
import gleam/list
import lustre/attribute as a
import lustre/element.{type Element}
import lustre/element/html as h
import lustre/event as e
import ui/icon

pub fn view(
  dark: Bool,
  preference: String,
  menu_open: Bool,
  toggle_theme: msg,
  toggle_menu: msg,
  close_menu: msg,
  dismiss_menu: msg,
  content: List(Element(msg)),
) -> Element(msg) {
  let theme = case dark {
    True -> "dark"
    False -> "light"
  }
  let inert = case menu_open {
    True -> [a.attribute("inert", "")]
    False -> []
  }
  h.div(
    [
      a.data("theme", theme),
      e.on(
        "keydown",
        decode.at(["key"], decode.string)
          |> decode.then(fn(key) {
            case key {
              "Escape" -> decode.success(dismiss_menu)
              _ -> decode.failure(dismiss_menu, "Escape")
            }
          }),
      ),
      a.class(case menu_open {
        True -> "dashboard menu-open"
        False -> "dashboard"
      }),
    ],
    [
      h.a([a.href("#main"), a.class("skip-link"), ..inert], [
        h.text("Skip to content"),
      ]),
      h.header([a.class("topbar"), ..inert], [
        h.div([a.class("topbar-start")], [
          h.button(
            [
              a.class("icon-button menu-button"),
              a.aria_label("Toggle navigation"),
              a.data("tooltip", case menu_open {
                True -> "Close navigation"
                False -> "Open navigation"
              }),
              a.aria_expanded(menu_open),
              a.aria_controls("primary-navigation"),
              e.on_click(toggle_menu),
            ],
            [
              h.span([a.class("menu-glyph")], [icon.view("menu")]),
              h.span([a.class("close-glyph")], [icon.view("x")]),
            ],
          ),
          h.a(
            [
              a.href("../"),
              a.class("comparison-link"),
              a.data("tooltip", "Compare all four dashboards"),
            ],
            [
              icon.view("arrow-left"),
              h.text("All dashboards"),
            ],
          ),
          h.span(
            [
              a.class("framework-badge"),
              a.data("tooltip", "Built with Gleam and Lustre"),
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
              a.data("tooltip", "View source on GitHub"),
              a.class("icon-button source-link"),
            ],
            [icon.view("github")],
          ),
          theme_toggle(preference, toggle_theme),
          h.span(
            [
              a.class("avatar"),
              a.data("tooltip", "Demo workspace: Maya Chen"),
            ],
            [
              h.text("MC"),
            ],
          ),
        ]),
      ]),
      h.div(
        [
          a.class("drawer-backdrop"),
          a.aria_hidden(True),
          e.on_click(dismiss_menu),
        ],
        [],
      ),
      h.aside(
        [
          a.class("sidebar"),
          ..case menu_open {
            True -> [
              a.role("dialog"),
              a.aria_label("Navigation"),
              a.attribute("aria-modal", "true"),
            ]
            False -> []
          }
        ],
        [
          h.div([a.class("sidebar-content")], [
            h.div([a.class("sidebar-heading")], [
              h.a(
                [a.href("#overview"), a.class("brand"), e.on_click(close_menu)],
                [
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
                ],
              ),
              h.button(
                [
                  a.class("icon-button drawer-close"),
                  a.aria_label("Close navigation"),
                  a.data("tooltip", "Close navigation"),
                  e.on_click(dismiss_menu),
                ],
                [icon.view("x")],
              ),
            ]),
            h.p([a.class("eyebrow workspace-label")], [h.text("Workspace")]),
            h.nav(
              [a.id("primary-navigation"), a.aria_label("Primary navigation")],
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
                      a.data("tooltip", "Go to " <> item.1),
                    ],
                    [
                      h.span([a.class("nav-icon")], [icon.view(item.0)]),
                      h.span([a.class("nav-label")], [h.text(item.1)]),
                      h.span([a.class("nav-arrow")], [
                        icon.view("arrow-up-right"),
                      ]),
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
          ]),
        ],
      ),
      h.main([a.id("main"), a.tabindex(-1), ..inert], content),
      h.footer([a.class("site-footer"), ..inert], [
        h.text("Meridian / Portfolio operations"),
        h.span([], [h.text("Built with Gleam + Lustre")]),
      ]),
    ],
  )
}

fn theme_toggle(preference: String, toggle_theme: msg) -> Element(msg) {
  let #(glyph, label, next) = case preference {
    "light" -> #("sun", "Light", "dark")
    "dark" -> #("moon", "Dark", "system")
    _ -> #("monitor", "System", "light")
  }
  let hint = "Theme: " <> label <> ". Switch to " <> next <> " theme"
  h.button(
    [
      a.class("icon-button theme-toggle"),
      a.aria_label(hint),
      a.data("tooltip", hint),
      e.on_click(toggle_theme),
    ],
    [icon.view(glyph)],
  )
}

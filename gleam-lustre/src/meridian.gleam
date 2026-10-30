import features/portfolio/view as portfolio
import features/projects/table
import features/projects/view as projects
import interop
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import meridian_ui
import meridian_ui/shell as ui_shell
import meridian_ui/theme
import shell/view as shell

pub const dashboard_id = "meridian-dashboard"

pub const theme_key = "meridian-gleam-theme"

pub type Model {
  Model(
    theme: String,
    system_dark: Bool,
    menu_open: Bool,
    projects: table.Model,
  )
}

pub type Msg {
  CycleTheme
  SystemThemeChanged(Bool)
  ToggleMenu
  CloseMenu
  DismissMenu
  Projects(projects.Msg)
}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) =
    lustre.start(app, "#app", #(theme.read(theme_key), theme.system_dark()))
}

pub fn init(flags: #(String, Bool)) -> #(Model, Effect(Msg)) {
  #(
    Model(flags.0, flags.1, False, table.init()),
    effect.before_paint(fn(dispatch, _) {
      let _dispose =
        meridian_ui.mount(
          dashboard_id,
          fn(dark) { dispatch(SystemThemeChanged(dark)) },
          fn() { dispatch(CloseMenu) },
        )
      Nil
    }),
  )
}

pub fn is_dark(model: Model) -> Bool {
  theme.is_dark(model.theme, model.system_dark)
}

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    CycleTheme -> {
      let preference = theme.next(model.theme)
      #(
        Model(..model, theme: preference),
        effect.from(fn(_) { theme.save(theme_key, preference) }),
      )
    }
    SystemThemeChanged(dark) -> #(
      Model(..model, system_dark: dark),
      effect.none(),
    )
    ToggleMenu -> {
      let open = !model.menu_open
      #(
        Model(..model, menu_open: open),
        effect.after_paint(fn(_, _) {
          case open {
            True -> ui_shell.focus_navigation(dashboard_id)
            False -> ui_shell.focus_menu(dashboard_id)
          }
        }),
      )
    }
    CloseMenu | DismissMenu ->
      case model.menu_open {
        True -> #(
          Model(..model, menu_open: False),
          effect.after_paint(fn(_, _) { ui_shell.focus_menu(dashboard_id) }),
        )
        False -> #(model, effect.none())
      }
    Projects(projects.Update(message)) -> #(
      Model(..model, projects: table.update(model.projects, message)),
      effect.none(),
    )
    Projects(projects.Export) -> #(
      model,
      effect.from(fn(_) {
        interop.download_csv(table.csv(table.rows(model.projects)))
      }),
    )
  }
}

pub fn view(model: Model) -> Element(Msg) {
  shell.view(
    dashboard_id,
    is_dark(model),
    model.theme,
    model.menu_open,
    CycleTheme,
    ToggleMenu,
    CloseMenu,
    DismissMenu,
    [
      portfolio.view(),
      projects.view(model.projects) |> element.map(Projects),
    ],
  )
}

import features/portfolio/view as portfolio
import features/projects/table
import features/projects/view as projects
import interop
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import shell/view as shell

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
    lustre.start(app, "#app", #(interop.read_theme(), interop.system_dark()))
}

pub fn init(flags: #(String, Bool)) -> #(Model, Effect(Msg)) {
  #(
    Model(flags.0, flags.1, False, table.init()),
    effect.before_paint(fn(dispatch, _) {
      interop.setup_tooltips()
      interop.setup_navigation(fn() { dispatch(CloseMenu) })
      interop.watch_system_theme(fn(dark) { dispatch(SystemThemeChanged(dark)) })
    }),
  )
}

pub fn is_dark(model: Model) -> Bool {
  model.theme == "dark" || model.theme == "system" && model.system_dark
}

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    CycleTheme -> {
      let theme = case model.theme {
        "light" -> "dark"
        "dark" -> "system"
        _ -> "light"
      }
      #(
        Model(..model, theme: theme),
        effect.from(fn(_) { interop.save_theme(theme) }),
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
            True -> interop.focus_navigation()
            False -> interop.focus_menu()
          }
        }),
      )
    }
    CloseMenu | DismissMenu ->
      case model.menu_open {
        True -> #(
          Model(..model, menu_open: False),
          effect.after_paint(fn(_, _) { interop.focus_menu() }),
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

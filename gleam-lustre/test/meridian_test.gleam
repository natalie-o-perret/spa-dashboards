import features/projects/table
import features/projects/view as projects
import gleam/list
import gleeunit
import gleeunit/should
import meridian

pub fn main() {
  gleeunit.main()
}

pub fn application_state_test() {
  let #(model, _) = meridian.init(#("system", False))
  let #(light, _) = meridian.update(model, meridian.CycleTheme)
  light.theme |> should.equal("light")
  let #(dark, _) = meridian.update(light, meridian.CycleTheme)
  dark.theme |> should.equal("dark")
  meridian.is_dark(dark) |> should.be_true
  let #(open, _) = meridian.update(dark, meridian.ToggleMenu)
  open.menu_open |> should.be_true
  let #(closed, _) = meridian.update(open, meridian.CloseMenu)
  closed.menu_open |> should.be_false
  let #(filtered, _) =
    meridian.update(
      closed,
      meridian.Projects(projects.Update(table.Search("Aurora"))),
    )
  table.rows(filtered.projects) |> list.length |> should.equal(1)
}

pub fn dismissing_the_menu_preserves_the_dashboard_test() {
  let #(initial, _) = meridian.init(#("dark", True))
  let #(unchanged, _) = meridian.update(initial, meridian.DismissMenu)
  unchanged |> should.equal(initial)
  let #(open, _) = meridian.update(initial, meridian.ToggleMenu)
  let #(closed, _) = meridian.update(open, meridian.DismissMenu)
  closed |> should.equal(initial)
}

pub fn system_theme_follows_the_os_without_overwriting_the_preference_test() {
  let #(initial, _) = meridian.init(#("system", False))
  meridian.is_dark(initial) |> should.be_false
  let #(dark, _) = meridian.update(initial, meridian.SystemThemeChanged(True))
  meridian.is_dark(dark) |> should.be_true
  dark.theme |> should.equal("system")
  let #(light, _) = meridian.update(dark, meridian.SystemThemeChanged(False))
  meridian.is_dark(light) |> should.be_false
  let #(override, _) = meridian.update(dark, meridian.CycleTheme)
  meridian.is_dark(override) |> should.be_false
  let #(explicit, _) = meridian.update(override, meridian.CycleTheme)
  let #(follow, _) = meridian.update(explicit, meridian.CycleTheme)
  follow.theme |> should.equal("system")
  meridian.is_dark(follow) |> should.be_true
  let #(unchanged, _) =
    meridian.update(explicit, meridian.SystemThemeChanged(False))
  meridian.is_dark(unchanged) |> should.be_true
}

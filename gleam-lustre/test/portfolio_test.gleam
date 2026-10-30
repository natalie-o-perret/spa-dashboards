import features/portfolio/view
import gleam/list
import gleeunit/should

pub fn chart_values_fit_viewbox_test() {
  list.all(view.trend, fn(point) {
    let y = view.chart_y(point.1)
    y >= 0 && y <= 180
  })
  |> should.be_true
}

pub fn capacity_totals_test() {
  view.capacities
  |> list.fold(0, fn(total, team) { total + team.2 })
  |> should.equal(27)
  list.all(view.capacities, fn(team) { team.1 >= 0 && team.1 <= 100 })
  |> should.be_true
}

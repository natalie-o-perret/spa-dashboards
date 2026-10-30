import features/projects/data
import features/projects/table
import features/projects/view
import gleam/list
import gleam/option.{Some}
import gleam/string
import gleeunit/should
import lustre/dev/query

pub fn fixture_test() {
  data.projects |> list.length |> should.equal(18)
  data.projects
  |> list.map(fn(p) { p.id })
  |> list.unique
  |> list.length
  |> should.equal(18)
  list.all(data.projects, fn(p) {
    p.id > 0
    && p.progress >= 0
    && p.progress <= 100
    && p.budget >= 0
    && string.trim(p.name) != ""
    && string.trim(p.owner) != ""
  })
  |> should.be_true
}

pub fn search_and_status_test() {
  let filtered = table.init() |> table.update(table.Search("  aT RISK  "))
  table.rows(filtered) |> list.length |> should.equal(4)
  table.rows(table.update(filtered, table.Filter("Blocked")))
  |> should.equal([])
  let owner = table.init() |> table.update(table.Search("MAYA"))
  table.rows(owner) |> list.map(fn(p) { p.id }) |> should.equal([1])
  let status = table.init() |> table.update(table.Filter("Complete"))
  status.status |> should.equal(Some(data.Complete))
  table.rows(status) |> list.length |> should.equal(3)
}

pub fn search_formatted_fields_test() {
  let date = table.init() |> table.update(table.Search("2026-09-24"))
  table.rows(date) |> list.map(fn(p) { p.id }) |> should.equal([1])
  let budget = table.init() |> table.update(table.Search("€48,000"))
  table.rows(budget) |> list.map(fn(p) { p.id }) |> should.equal([1])
  let progress = table.init() |> table.update(table.Search("82%"))
  table.rows(progress) |> list.map(fn(p) { p.id }) |> should.equal([1])
}

pub fn three_state_sort_test() {
  let initial = table.init()
  let asc = table.update(initial, table.SortBy(table.Name))
  asc.sort |> should.equal(table.Ascending(table.Name))
  let desc = table.update(asc, table.SortBy(table.Name))
  table.rows(desc) |> list.first |> should.equal(list.last(data.projects))
  let reset = table.update(desc, table.SortBy(table.Name))
  reset.sort |> should.equal(table.Unsorted)
  table.rows(reset) |> should.equal(data.projects)
}

pub fn numeric_and_date_sort_test() {
  let budget = table.init() |> table.update(table.SortBy(table.Budget))
  let assert [first, ..] = table.rows(budget)
  first.budget |> should.equal(24_000)
  let due = table.init() |> table.update(table.SortBy(table.Due))
  let assert [earliest, ..] = table.rows(due)
  earliest.due |> should.equal("2026-09-14")
  let latest =
    table.update(due, table.SortBy(table.Due)) |> table.rows |> list.last
  latest |> should.equal(Ok(earliest))
}

pub fn equal_sort_values_keep_fixture_order_test() {
  let model =
    table.init()
    |> table.update(table.SortBy(table.Progress))
    |> table.update(table.SortBy(table.Progress))
  table.rows(model)
  |> list.take(3)
  |> list.map(fn(p) { p.id })
  |> should.equal([5, 10, 16])
}

pub fn pagination_test() {
  let model = table.init()
  table.page_rows(model) |> list.length |> should.equal(5)
  let next = table.update(model, table.Page(1))
  table.page_rows(next)
  |> list.map(fn(p) { p.id })
  |> should.equal([6, 7, 8, 9, 10])
  let last = table.update(next, table.Page(999))
  last.page |> should.equal(3)
  table.page_rows(last) |> list.length |> should.equal(3)
  table.update(last, table.Page(-1)).page |> should.equal(0)
}

pub fn filters_and_sizes_reset_the_page_test() {
  let paged = table.init() |> table.update(table.Page(3))
  let filtered = table.update(paged, table.Search("Aurora"))
  filtered.page |> should.equal(0)
  table.page_rows(filtered) |> list.length |> should.equal(1)
  table.update(paged, table.Filter("Blocked")).page |> should.equal(0)
  let resized = table.update(paged, table.PageSize("10"))
  resized.page |> should.equal(0)
  table.page_rows(resized) |> list.length |> should.equal(10)
  table.update(resized, table.PageSize("0")) |> should.equal(resized)
  table.update(paged, table.PageSize("all"))
  |> table.page_rows
  |> list.length
  |> should.equal(18)
}

pub fn selection_is_page_scoped_and_survives_filters_test() {
  let selected = table.init() |> table.update(table.TogglePage)
  selected.selected |> should.equal([1, 2, 3, 4, 5])
  table.all_on_page_selected(selected) |> should.be_true
  let next =
    selected |> table.update(table.Page(1)) |> table.update(table.TogglePage)
  next.selected |> list.length |> should.equal(10)
  let cleared_page = table.update(next, table.TogglePage)
  cleared_page.selected |> should.equal(selected.selected)
  let filtered = table.update(cleared_page, table.Filter("Complete"))
  filtered.selected |> should.equal(selected.selected)
  table.update(filtered, table.Toggle(5)).selected |> should.equal([1, 2, 3, 4])
}

pub fn empty_results_test() {
  let empty = table.init() |> table.update(table.Search("nothing matches"))
  table.rows(empty) |> should.equal([])
  table.last_page(empty) |> should.equal(0)
  table.all_on_page_selected(empty) |> should.be_false
  table.update(empty, table.TogglePage).selected |> should.equal([])
  table.update(empty, table.ClearFilters)
  |> table.rows
  |> list.length
  |> should.equal(18)
}

pub fn density_buttons_have_valid_pressed_states_test() {
  let comfortable = view.view(table.init())
  let assert Ok(_) =
    query.find(
      comfortable,
      query.element(
        query.tag("button")
        |> query.and(query.text("Comfortable"))
        |> query.and(query.aria("pressed", "true")),
      ),
    )
  let compact =
    table.init()
    |> table.update(table.Density(True))
    |> view.view
  let assert Ok(_) =
    query.find(
      compact,
      query.element(
        query.tag("button")
        |> query.and(query.text("Compact"))
        |> query.and(query.aria("pressed", "true")),
      ),
    )
  Nil
}

pub fn budget_header_matches_numeric_cell_alignment_test() {
  let headers =
    query.find_all(
      view.view(table.init()),
      query.element(query.tag("th") |> query.and(query.class("numeric"))),
    )
  let assert [budget] = headers
  let assert Ok(_) =
    query.find(
      budget,
      query.element(
        query.tag("button") |> query.and(query.aria("label", "Sort by Budget")),
      ),
    )
  Nil
}

pub fn csv_contains_all_filtered_sorted_rows_test() {
  let model =
    table.init()
    |> table.update(table.Filter("On track"))
    |> table.update(table.SortBy(table.Name))
    |> table.update(table.SortBy(table.Name))
  let rows = table.rows(model)
  let output = table.csv(rows)
  output
  |> string.split("\r\n")
  |> list.length
  |> should.equal(list.length(rows) + 1)
  string.contains(output, "Relay API catalogue") |> should.be_true
  string.contains(output, "Beacon research hub") |> should.be_false
  string.starts_with(output, "\"Project\",\"Owner\"") |> should.be_true
}

pub fn csv_escapes_cells_test() {
  let assert [first, ..] = data.projects
  let escaped =
    data.Project(..first, name: "A, \"quoted\"\nproject", owner: "=1+1")
  let output = table.csv([escaped])
  string.contains(output, "\"A, \"\"quoted\"\"\nproject\"") |> should.be_true
  string.contains(output, "\"'=1+1\"") |> should.be_true
}

import features/projects/data.{type Project}
import features/projects/table
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import lustre/attribute as a
import lustre/element.{type Element}
import lustre/element/html as h
import lustre/element/keyed
import lustre/event as e
import ui/icon

pub type Msg {
  Update(table.Msg)
  Export
}

pub fn view(model: table.Model) -> Element(Msg) {
  let rows = table.rows(model)
  let page = table.page_rows(model)
  h.section(
    [
      a.id("projects"),
      a.class("panel projects"),
      a.aria_labelledby("projects-title"),
    ],
    [
      h.div([a.class("panel-heading")], [
        h.div([], [
          h.p([a.class("eyebrow")], [h.text("The work in motion")]),
          h.h2([a.id("projects-title")], [h.text("Projects")]),
        ]),
        h.button(
          [
            a.class("button export-button"),
            a.data("tooltip", "Export all matching projects as CSV"),
            e.on_click(Export),
            a.disabled(list.is_empty(rows)),
          ],
          [icon.view("download"), h.text("Export CSV")],
        ),
      ]),
      controls(model),
      h.div(
        [
          a.class("table-scroll"),
          a.tabindex(0),
          a.role("region"),
          a.aria_label("Scrollable projects table"),
        ],
        [
          h.table(
            [
              a.aria_label("Projects"),
              a.class(case model.compact {
                True -> "compact"
                False -> "comfortable"
              }),
            ],
            [
              h.thead([], [
                h.tr([], [
                  h.th([a.scope("col")], [select_page(model, page)]),
                  ..list.map(table.columns, fn(column) {
                    heading(column.0, column.1, model.sort)
                  })
                ]),
              ]),
              keyed.element("tbody", [], case page {
                [] -> [
                  #(
                    "empty",
                    h.tr([], [
                      h.td([a.colspan(8), a.class("empty")], [
                        h.text("No projects match your filters."),
                      ]),
                    ]),
                  ),
                ]
                _ ->
                  list.index_map(page, fn(project, index) {
                    #(
                      int.to_string(project.id),
                      row(project, model.selected, index),
                    )
                  })
              }),
            ],
          ),
        ],
      ),
      pagination(model, list.length(rows)),
    ],
  )
}

fn controls(model: table.Model) -> Element(Msg) {
  h.div([a.class("table-controls")], [
    h.label([a.class("search-field")], [
      h.span([a.class("sr-only")], [h.text("Search projects")]),
      icon.view("search"),
      h.input([
        a.type_("search"),
        a.placeholder("Search projects, people, priorities..."),
        a.value(model.query),
        a.data("tooltip", "Search any displayed project field"),
        e.on_input(fn(q) { Update(table.Search(q)) }),
      ]),
    ]),
    h.label([], [
      h.span([a.class("sr-only")], [h.text("Filter by status")]),
      h.select(
        [
          a.aria_label("Filter by status"),
          a.data("tooltip", "Show projects with a matching status"),
          e.on_input(fn(s) { Update(table.Filter(s)) }),
        ],
        [
          h.option(
            [a.value("All statuses"), a.selected(model.status == None)],
            "All statuses",
          ),
          ..list.map(data.statuses, fn(status) {
            let label = data.status_label(status)
            h.option(
              [a.value(label), a.selected(model.status == Some(status))],
              label,
            )
          })
        ],
      ),
    ]),
    h.button(
      [
        a.class("text-button"),
        a.data("tooltip", "Reset search and status filters"),
        e.on_click(Update(table.ClearFilters)),
        a.disabled(model.query == "" && model.status == None),
      ],
      [icon.view("x"), h.text("Clear filters")],
    ),
    h.div([a.class("density"), a.role("group"), a.aria_label("Table density")], [
      h.button(
        [
          a.aria_pressed(case model.compact {
            True -> "false"
            False -> "true"
          }),
          e.on_click(Update(table.Density(False))),
          a.data("tooltip", "Show roomier project rows"),
        ],
        [icon.view("rows-3"), h.text("Comfortable")],
      ),
      h.button(
        [
          a.aria_pressed(case model.compact {
            True -> "true"
            False -> "false"
          }),
          e.on_click(Update(table.Density(True))),
          a.data("tooltip", "Fit more project rows on screen"),
        ],
        [icon.view("list"), h.text("Compact")],
      ),
    ]),
  ])
}

fn select_page(model: table.Model, page: List(Project)) -> Element(Msg) {
  let some_selected =
    list.any(page, fn(p) { list.contains(model.selected, p.id) })
  let all_selected = table.all_on_page_selected(model)
  checkbox("Toggle selection for projects on this page", [
    a.aria_label("Select all projects on this page"),
    a.checked(all_selected),
    a.property("indeterminate", json.bool(some_selected && !all_selected)),
    a.disabled(list.is_empty(page)),
    e.on_check(fn(_) { Update(table.TogglePage) }),
  ])
}

fn heading(key: table.Key, label: String, sort: table.Sort) -> Element(Msg) {
  let #(attrs, arrow) = case sort {
    table.Ascending(current) if current == key -> #(
      [a.aria_sort("ascending")],
      "arrow-up",
    )
    table.Descending(current) if current == key -> #(
      [a.aria_sort("descending")],
      "arrow-down",
    )
    _ -> #([], "chevrons-up-down")
  }
  h.th(
    [
      a.scope("col"),
      a.class(case key {
        table.Budget -> "numeric"
        _ -> ""
      }),
      ..attrs
    ],
    [
      h.button(
        [
          a.class("sort-button"),
          a.aria_label("Sort by " <> label),
          a.data(
            "tooltip",
            "Sort by " <> label <> ": ascending, descending, original order",
          ),
          e.on_click(Update(table.SortBy(key))),
        ],
        [
          h.text(label),
          icon.view(arrow),
        ],
      ),
    ],
  )
}

fn row(project: Project, selected: List(Int), index: Int) -> Element(Msg) {
  let is_selected = list.contains(selected, project.id)
  let status_class = case project.status {
    data.OnTrack -> "on-track"
    data.AtRisk -> "at-risk"
    data.Blocked -> "blocked"
    data.Complete -> "complete"
  }
  h.tr(
    [
      a.class(case is_selected {
        True -> "selected"
        False -> ""
      }),
      a.style("--row", int.to_string(index)),
    ],
    [
      h.td([], [
        checkbox("Toggle selection for " <> project.name, [
          a.checked(is_selected),
          a.aria_label("Select " <> project.name),
          e.on_check(fn(_) { Update(table.Toggle(project.id)) }),
        ]),
      ]),
      h.td([a.class("project-name")], [
        h.span([a.class("project-mark"), a.aria_hidden(True)], [
          h.text(string.slice(project.name, 0, 1)),
        ]),
        h.text(project.name),
      ]),
      h.td([], [h.text(project.owner)]),
      h.td([], [
        h.span([a.class("status " <> status_class)], [
          h.text(data.status_label(project.status)),
        ]),
      ]),
      h.td(
        [
          a.class(case project.priority {
            data.Critical -> "critical"
            _ -> ""
          }),
        ],
        [h.text(data.priority_label(project.priority))],
      ),
      h.td([], [
        h.div([a.class("project-progress")], [
          h.progress(
            [
              a.max("100"),
              a.value(int.to_string(project.progress)),
              a.aria_label(project.name <> " progress"),
            ],
            [],
          ),
          h.span([], [h.text(table.cell(project, table.Progress))]),
        ]),
      ]),
      h.td([], [
        h.time([a.datetime(project.due)], [
          h.text(table.cell(project, table.Due)),
        ]),
      ]),
      h.td([a.class("numeric")], [h.text(table.cell(project, table.Budget))]),
    ],
  )
}

fn checkbox(hint: String, attrs: List(a.Attribute(msg))) -> Element(msg) {
  h.label(
    [
      a.class("selection-checkbox"),
      a.data("tooltip", hint),
    ],
    [
      h.input([a.type_("checkbox"), a.data("tooltip", hint), ..attrs]),
      h.span([a.class("checkbox-mark"), a.aria_hidden(True)], []),
    ],
  )
}

fn pagination(model: table.Model, count: Int) -> Element(Msg) {
  let start = case count {
    0 -> 0
    _ -> model.page * model.page_size + 1
  }
  let end = int.min(count, { model.page + 1 } * model.page_size)
  h.div([a.class("table-footer")], [
    h.p([a.aria_live("polite"), a.role("status")], [
      h.text(
        int.to_string(count)
        <> " projects shown / "
        <> int.to_string(list.length(model.selected))
        <> " selected",
      ),
    ]),
    h.div([a.class("pagination")], [
      h.label([], [
        h.text("Rows "),
        h.select(
          [
            a.aria_label("Rows per page"),
            a.data("tooltip", "Choose how many projects to show per page"),
            e.on_input(fn(s) { Update(table.PageSize(s)) }),
          ],
          list.map(
            [
              #(5, "5", "5"),
              #(10, "10", "10"),
              #(list.length(data.projects), "all", "All"),
            ],
            fn(size) {
              h.option(
                [
                  a.value(size.1),
                  a.selected(model.page_size == size.0),
                ],
                size.2,
              )
            },
          ),
        ),
      ]),
      h.span([], [
        h.text(
          int.to_string(start)
          <> "-"
          <> int.to_string(end)
          <> " of "
          <> int.to_string(count),
        ),
      ]),
      h.button(
        [
          a.aria_label("Go to previous page"),
          a.data("tooltip", "Go to previous page"),
          a.disabled(model.page == 0),
          e.on_click(Update(table.Page(model.page - 1))),
        ],
        [icon.view("chevron-left")],
      ),
      h.button(
        [
          a.aria_label("Go to next page"),
          a.data("tooltip", "Go to next page"),
          a.disabled(model.page >= table.last_page(model)),
          e.on_click(Update(table.Page(model.page + 1))),
        ],
        [icon.view("chevron-right")],
      ),
    ]),
  ])
}

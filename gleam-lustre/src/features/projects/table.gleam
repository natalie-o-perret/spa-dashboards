import features/projects/data.{type Project, type Status}
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order.{type Order, Eq}
import gleam/string
import interop

pub type Key {
  Name
  Owner
  Status
  Priority
  Progress
  Due
  Budget
}

pub const columns = [
  #(Name, "Project"),
  #(Owner, "Owner"),
  #(Status, "Status"),
  #(Priority, "Priority"),
  #(Progress, "Progress"),
  #(Due, "Due date"),
  #(Budget, "Budget"),
]

pub type Sort {
  Unsorted
  Ascending(Key)
  Descending(Key)
}

pub type Model {
  Model(
    query: String,
    status: Option(Status),
    sort: Sort,
    selected: List(Int),
    page: Int,
    page_size: Int,
    compact: Bool,
  )
}

pub type Msg {
  Search(String)
  Filter(String)
  SortBy(Key)
  Toggle(Int)
  TogglePage
  Page(Int)
  PageSize(String)
  Density(Bool)
  ClearFilters
}

pub fn init() -> Model {
  Model("", None, Unsorted, [], 0, 5, False)
}

pub fn update(model: Model, msg: Msg) -> Model {
  case msg {
    Search(query) -> Model(..model, query: query, page: 0)
    Filter(label) -> {
      let status =
        list.find(data.statuses, fn(s) { data.status_label(s) == label })
        |> option.from_result
      Model(..model, status: status, page: 0)
    }
    SortBy(key) -> {
      let sort = case model.sort {
        Ascending(current) if current == key -> Descending(key)
        Descending(current) if current == key -> Unsorted
        _ -> Ascending(key)
      }
      Model(..model, sort: sort, page: 0)
    }
    Toggle(id) -> Model(..model, selected: toggle(model.selected, id))
    TogglePage -> {
      let ids = page_rows(model) |> list.map(fn(p) { p.id })
      let selected = case all_on_page_selected(model) {
        True -> list.filter(model.selected, fn(id) { !list.contains(ids, id) })
        False -> list.unique(list.append(model.selected, ids))
      }
      Model(..model, selected: selected)
    }
    Page(page) -> Model(..model, page: int.clamp(page, 0, last_page(model)))
    PageSize(value) ->
      case value {
        "5" -> Model(..model, page_size: 5, page: 0)
        "10" -> Model(..model, page_size: 10, page: 0)
        "all" ->
          Model(
            ..model,
            page_size: int.max(1, list.length(data.projects)),
            page: 0,
          )
        _ -> model
      }
    Density(compact) -> Model(..model, compact: compact)
    ClearFilters -> Model(..model, query: "", status: None, page: 0)
  }
}

fn toggle(selected: List(Int), id: Int) -> List(Int) {
  case list.contains(selected, id) {
    True -> list.filter(selected, fn(value) { value != id })
    False -> [id, ..selected]
  }
}

pub fn rows(model: Model) -> List(Project) {
  let query = model.query |> string.trim |> string.lowercase
  let filtered =
    list.filter(data.projects, fn(project) {
      let matches_status = case model.status {
        None -> True
        Some(status) -> project.status == status
      }
      matches_status
      && list.any(fields(project), fn(field) {
        string.contains(string.lowercase(field), query)
      })
    })
  case model.sort {
    Unsorted -> filtered
    Ascending(key) ->
      list.sort(filtered, fn(left, right) { compare(left, right, key, False) })
    Descending(key) ->
      list.sort(filtered, fn(left, right) { compare(left, right, key, True) })
  }
}

fn compare(left: Project, right: Project, key: Key, descending: Bool) -> Order {
  let comparison = case key {
    Progress -> int.compare(left.progress, right.progress)
    Budget -> int.compare(left.budget, right.budget)
    Due -> string.compare(left.due, right.due)
    _ ->
      string.compare(
        string.lowercase(cell(left, key)),
        string.lowercase(cell(right, key)),
      )
  }
  case comparison, descending {
    Eq, _ -> int.compare(left.id, right.id)
    order.Lt, True -> order.Gt
    order.Gt, True -> order.Lt
    _, _ -> comparison
  }
}

pub fn cell(project: Project, key: Key) -> String {
  case key {
    Name -> project.name
    Owner -> project.owner
    Status -> data.status_label(project.status)
    Priority -> data.priority_label(project.priority)
    Progress -> int.to_string(project.progress) <> "%"
    Due -> interop.format_date(project.due)
    Budget -> interop.format_budget(project.budget)
  }
}

fn fields(project: Project) -> List(String) {
  list.map(columns, fn(column) { cell(project, column.0) })
  |> list.append([project.due, int.to_string(project.budget)])
}

pub fn page_rows(model: Model) -> List(Project) {
  rows(model)
  |> list.drop(model.page * model.page_size)
  |> list.take(model.page_size)
}

pub fn last_page(model: Model) -> Int {
  int.max(0, { list.length(rows(model)) - 1 } / model.page_size)
}

pub fn all_on_page_selected(model: Model) -> Bool {
  let page = page_rows(model)
  !list.is_empty(page)
  && list.all(page, fn(p) { list.contains(model.selected, p.id) })
}

pub fn csv(projects: List(Project)) -> String {
  let header = [
    "Project",
    "Owner",
    "Status",
    "Priority",
    "Progress",
    "Due date",
    "Budget",
  ]
  let records =
    list.map(projects, fn(p) {
      [
        p.name,
        p.owner,
        data.status_label(p.status),
        data.priority_label(p.priority),
        int.to_string(p.progress),
        p.due,
        int.to_string(p.budget),
      ]
    })
  [header, ..records]
  |> list.map(fn(record) { list.map(record, quote) |> string.join(",") })
  |> string.join("\r\n")
}

fn quote(value: String) -> String {
  let safe = case
    string.starts_with(value, "=")
    || string.starts_with(value, "+")
    || string.starts_with(value, "-")
    || string.starts_with(value, "@")
  {
    True -> "'" <> value
    False -> value
  }
  "\"" <> string.replace(safe, "\"", "\"\"") <> "\""
}

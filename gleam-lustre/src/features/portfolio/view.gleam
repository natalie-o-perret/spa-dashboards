import gleam/int
import gleam/list
import gleam/string
import lustre/attribute as a
import lustre/element.{type Element}
import lustre/element/html as h
import lustre/element/svg
import ui/icon

pub const trend = [
  #("W31", 62),
  #("W32", 68),
  #("W33", 66),
  #("W34", 73),
  #("W35", 78),
  #("W36", 81),
  #("W37", 86),
  #("W38", 91),
]

pub const capacities = [
  #("Design", 82, 6, "palette"),
  #("Engineering", 76, 12, "code-xml"),
  #("Research", 64, 4, "flask-conical"),
  #("Content", 58, 5, "type"),
]

pub fn view() -> Element(msg) {
  h.div([], [
    h.header([a.id("overview"), a.class("overview-heading")], [
      h.div([], [
        h.p([a.class("eyebrow")], [h.text("Cycle 18 / Weekly review")]),
        h.h1([], [h.text("Portfolio overview")]),
        h.p([a.class("muted")], [
          h.text(
            "Track delivery, capacity, and risk across every active project.",
          ),
        ]),
      ]),
      h.span([a.class("summary-pill")], [
        icon.view("circle-check"),
        h.text("15 active / 3 need attention"),
      ]),
    ]),
    h.section([a.class("metrics"), a.aria_label("Portfolio metrics")], [
      metric("Active projects", "15", "3 due this month", "folder-kanban"),
      metric("On-time delivery", "91%", "Up 4 points", "chart-no-axes-combined"),
      metric("Budget used", "68%", "€482k of €710k", "wallet"),
      metric("Team capacity", "76%", "27 contributors", "users-round"),
    ]),
    h.div([a.id("analytics"), a.class("analytics")], [delivery(), capacity()]),
  ])
}

fn metric(
  label: String,
  value: String,
  detail: String,
  glyph: String,
) -> Element(msg) {
  h.article([a.class("panel metric")], [
    h.div([a.class("metric-label")], [
      h.h2([], [h.text(label)]),
      h.span([a.class("metric-icon")], [icon.view(glyph)]),
    ]),
    h.p([a.class("metric-value")], [h.text(value)]),
    h.p([a.class("muted")], [h.text(detail)]),
  ])
}

fn delivery() -> Element(msg) {
  let points =
    list.index_map(trend, fn(point, index) {
      int.to_string(40 + index * 80) <> "," <> int.to_string(chart_y(point.1))
    })
    |> string.join(" ")
  h.section([a.class("panel delivery"), a.aria_labelledby("delivery-heading")], [
    h.div([a.class("panel-heading")], [
      h.div([], [
        h.p([a.class("eyebrow")], [h.text("A little better, every week")]),
        h.h2([a.id("delivery-heading")], [h.text("Delivery trend")]),
      ]),
      h.span([a.class("trend-total")], [
        h.text("91% "),
        h.small([], [icon.view("arrow-up-right"), h.text("+4 pts")]),
      ]),
    ]),
    svg.svg(
      [
        a.attribute("viewBox", "0 0 640 230"),
        a.role("img"),
        a.aria_labelledby("chart-title"),
        a.aria_describedby("chart-description"),
        a.class("trend-chart"),
      ],
      [
        svg.title([a.id("chart-title")], [h.text("Weekly on-time delivery")]),
        svg.desc([a.id("chart-description")], [
          h.text(
            "W31: 62%, W32: 68%, W33: 66%, W34: 73%, W35: 78%, W36: 81%, W37: 86%, W38: 91%.",
          ),
        ]),
        ..list.append(
          list.map([50, 65, 80, 95], fn(value) {
            let y = int.to_string(chart_y(value))
            svg.g([], [
              svg.line([
                a.attribute("x1", "40"),
                a.attribute("x2", "600"),
                a.attribute("y1", y),
                a.attribute("y2", y),
                a.class("grid-line"),
              ]),
              svg.text(
                [
                  a.attribute("x", "0"),
                  a.attribute("y", y),
                  a.class("chart-label"),
                ],
                int.to_string(value),
              ),
            ])
          }),
          [
            svg.polygon([
              a.attribute("points", "40,180 " <> points <> " 600,180"),
              a.class("chart-area"),
            ]),
            svg.polyline([
              a.attribute("points", points),
              a.attribute("pathLength", "1"),
              a.class("chart-line"),
            ]),
            ..list.index_map(trend, fn(point, index) {
              let x = int.to_string(40 + index * 80)
              svg.g(
                [
                  a.class("chart-point"),
                  a.style("--point", int.to_string(index)),
                ],
                [
                  svg.circle([
                    a.attribute("cx", x),
                    a.attribute("cy", int.to_string(chart_y(point.1))),
                    a.attribute("r", "4"),
                    a.class("chart-dot"),
                  ]),
                  svg.text(
                    [
                      a.attribute("x", x),
                      a.attribute("y", "215"),
                      a.attribute("text-anchor", "middle"),
                      a.class("chart-label"),
                    ],
                    point.0,
                  ),
                ],
              )
            })
          ],
        )
      ],
    ),
    h.p([a.class("chart-note muted")], [
      h.text("On-time delivery / last 8 weeks"),
    ]),
  ])
}

pub fn chart_y(value: Int) -> Int {
  180 - { value - 50 } * 3
}

fn capacity() -> Element(msg) {
  h.section(
    [
      a.id("team"),
      a.class("panel capacity"),
      a.aria_labelledby("capacity-title"),
    ],
    [
      h.p([a.class("eyebrow")], [h.text("Current allocation")]),
      h.h2([a.id("capacity-title")], [h.text("Team capacity")]),
      h.div(
        [a.class("capacity-list")],
        list.map(capacities, fn(team) {
          h.div([a.class("capacity-row")], [
            h.div([a.class("capacity-label")], [
              h.strong([], [
                h.span([a.class("team-icon")], [icon.view(team.3)]),
                h.text(team.0),
              ]),
              h.span([a.class("muted")], [
                h.text(
                  int.to_string(team.1)
                  <> "% / "
                  <> int.to_string(team.2)
                  <> " people",
                ),
              ]),
            ]),
            h.progress(
              [
                a.max("100"),
                a.value(int.to_string(team.1)),
                a.aria_label(team.0 <> " capacity"),
              ],
              [],
            ),
          ])
        }),
      ),
    ],
  )
}

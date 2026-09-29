# DataTable

A table of records the reader scans: ids, names, numbers and a status column.

- Frame: `card`, 1px `line`, `radius-card`, with `overflow-x: auto` so wide tables scroll inside the frame, never the page.
- Header cells in `overline` (uppercase, `ink-3`) over a `line-strong` rule; rows divided by `line-soft`; cells 10px by 14px.
- Numbers right-aligned with `tabular-nums`; ids, versions and costs in `meta` mono `ink-2`; secondary words in `ink-3`.
- A status cell pairs the glyph with a bold label in the status colour, plus an optional mono detail. Never colour whole rows.
- Provide: columns, rows, and which columns are numeric.

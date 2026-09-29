# ChartCard

A figure for one chart: a `card` frame holding a legend and an SVG plot, followed by a caption and a "Show as table" toggle.

- Frame: `card`, 1px `line`, `radius-card`, `space-4` padding. Legend above the plot in `meta` with a 16×2 line key (a 10px square key for bars).
- Series colours in fixed order: `chart-1` blue, `chart-2` copper, `chart-3` rose, `chart-4` moss, `chart-5` violet; past five, fold into `chart-other` or use small multiples. Scatter plots use the first three only.
- Marks: 2px lines with round joins, 8px end dots ringed 2px in `card`, bars at most 24px thick with 4px rounded ends. Gridlines `line-soft`, ticks in `tick` `ink-3`, end labels in `meta` `ink-2`. Text never takes a series colour.
- Interaction: a vertical crosshair snaps to the nearest x and a tooltip lists every series at that point, value first; the plot is focusable and arrow keys move the crosshair. Build tooltips with `textContent`.
- Provide: the data, a title in the section heading, an `aria-label` stating the takeaway, a caption, and the same numbers in the table view.

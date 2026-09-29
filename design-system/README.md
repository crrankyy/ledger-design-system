Ledger is a design system for reports published as web pages: weekly updates, reviews, audits, investigations, and any write-up that pairs findings with figures. The look is a record kept on warm paper. Serif carries what people read, sans carries the interface, and mono carries what was measured or recorded. It ships a light and a dark theme, and every report follows the viewer's theme.

## Content

- Lead with the finding. The headline states what happened ("Match rate held at 71% while volume doubled"), not the topic ("Weekly metrics").
- Write plainly, in sentence case, in short active sentences. Name things the way readers know them.
- Every problem names its cause and the next step: "The provider returned 429 at turns 4 and 11. Lower concurrency from 8 to 4, then replay both runs."
- Ids, dates, versions, costs and counts are data: set them in `meta` (mono), never in the prose faces.
- Label invented or sample figures in the notice band, first sentence bold: "**Sample data.** Every figure here is invented."
- Show only numbers you have. Never fill a gap with an estimate that reads as a measurement.
- No emoji. Meaning comes from glyphs and their labels.

## Colour

- Page ground is `paper`; the header strip is `surface`; anything the reader treats as an object (stat tiles, chart cards, tables, records, tooltips) is `card`. The notice band is `band`.
- Text is `ink`, then `ink-2` for secondary text and `ink-3` for muted text. All three hold 4.5:1 or more on `paper`, `surface`, `card` and `band` in both themes.
- Hairlines step down: `line-strong` for table header rules and tooltip borders, `line` for card and region borders, `line-soft` for row dividers and gridlines. Borders, not shadows.
- `accent` is the only brand colour: links, the focus ring, the note callout and chart series 1. `accent-hover` on hover.
- Status colours are reserved and always ship with their glyph and a written label: `good` (check), `warn` (triangle), `critical` (octagon), and the note callout in `accent` (dot). Each has a `-tint` fill and a `-text` title colour for callouts. Never use a status colour as a chart series or as decoration.
- The primary button is `ink` with `surface` text.

## Type

Load the three families from Google Fonts:
`https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap`

- Source Serif 4 (`serif`) is for reading: `display` for the headline, `heading` for section heads, `lede` for the dek, `prose` for running text, `quote` for quoted words, `wordmark` for the name in the header strip.
- IBM Plex Sans (`sans`) is the interface: `body` at 13px, `label`, `overline` in uppercase with 0.09em tracking, `stat` for tile values, `callout-title` and `callout-body`, `button`.
- IBM Plex Mono (`mono`) is for recorded data: `meta` for ids, dates and deltas, `eyebrow` in uppercase above the headline, `tick` for axis labels, `record` for record blocks with `white-space: pre-line`.
- Keep prose near 65 characters a line. Use `tabular-nums` only where digits line up in columns; stat values keep proportional figures.

## Layout

- A report is: header strip, optional notice band, then the page grid. On wide screens a `rail-w` rail (report details and contents) sits beside a main column capped at `content-max`, inside `page-max`. Under 900px the rail stacks above the main column.
- The main column runs: eyebrow, headline, dek, stat tiles, then sections, then the method footer. Sections are `space-12` apart.
- Page gutter is `space-6` on wide screens and `space-4` on phones. Nothing scrolls sideways except a table or chart inside its own container.
- A sticky element uses `top: env(safe-area-inset-top, 0px)` plus its offset, never `0`.

## Shape

- Record blocks are square (`radius-record`): they read as printed entries.
- Chips use `radius-chip`; callouts, tooltips, buttons and inputs `radius-control`; tiles, chart cards and table frames `radius-card`; pills `radius-pill`.
- `shadow-float` is only for something floating over content. Everything else is separated by hairlines.

## Charts

- Series take `chart-1` to `chart-5` in that fixed order: blue, copper, rose, moss, violet. Never cycle; a sixth series folds into Other in `chart-other`, or the chart splits into small multiples.
- The first three series are safe for scatter plots; line and bar charts can use all five.
- Lines 2px with round joins; end dots 8px with a 2px `card` ring; bars 24px at most with 4px rounded ends. Gridlines 1px solid `line-soft`.
- Text never takes a series colour: legends, ticks and end labels stay in `ink-2` and `ink-3`, with a short coloured key beside them.
- Two or more series always get a legend and direct end labels. Every chart has a hover or keyboard readout and a "Show as table" view.

## Themes

- Light is the first theme; Dark mirrors it. Grounds become the ink family lifted slightly toward paper, text becomes paper, and each hue keeps its light hue and saturation with its lightness raised for the dark ground.
- Build every page from the tokens, never literal colours, so the viewer's theme choice switches the whole report.

## Accessibility

- Focus is a solid 2px `accent` outline with a 2px offset.
- Every text token holds 4.5:1 on the grounds named above in both themes, and callout titles hold it on their tint. `control-border` holds 3:1 on `paper` and `card` for inputs and toggles; `line-strong` is decorative only.
- Status is never colour alone: glyph shape plus a written label, every time.
- Give charts an `aria-label` that states the takeaway, and a table view with the same numbers.

## Don't

- No gradients, drop-shadowed cards, left-border accent cards or emoji section markers.
- No stock photos or decorative illustrations; use a chart, a table or a record block.
- Don't put a status colour in a chart legend, and don't colour whole table rows by status.

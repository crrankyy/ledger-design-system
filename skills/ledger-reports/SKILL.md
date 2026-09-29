---
name: ledger-reports
description: Format any report published as a Claude artifact page (weekly update, review, audit, analysis, status write-up) in the Ledger design system, with light and dark themes that follow the viewer.
---

# Ledger reports

Use this skill whenever a report, write-up, review, audit, investigation, analysis or status update is published as an HTML page with the Artifact tool. It gives every report the same look: a record on warm paper, serif to read, sans for the interface, mono for recorded data, and a light and a dark theme that follow the viewer's setting.

It does not apply to Claude Docs documents, Slides decks or Design canvases (those types bring their own format), or to files the person asked for in a named format (.docx, .pdf, .md).

## Source of truth

Ledger is a design system artifact: https://claude.ai/artifact/B9j2J2SkrfZgvteBgEPtyv

The CSS below is a snapshot of it taken at `2026-09-29T09:16:12Z`. Before building, read `project/design-system.json` from that artifact (Artifact tool, `read` with `path`). If its `lastChange.at` is later than the snapshot time, also read `project/tokens.json` and `project/components/bundle.css` and rebuild the style block from them: each colour token becomes `--<name>` with its `light` value on `:root` and its `dark` value in both dark blocks; spacing, radius and font families become `--<name>` and `--font-<key>` on `:root`; bundle.css goes in below the tokens, without its `@import` line. If the artifact can't be read, use the snapshot and say so in one line.

## Workflow

1. Gather the content first: the data, the findings, the sources. Decide the headline finding and the sections before writing markup.
2. Write the page from the skeleton below into one `.html` file: `<title>`, the Google Fonts link, one `<style>` holding the token block then the component CSS, the body markup, and the chart script only if the report has charts.
3. Check it against the rules in "Before publishing".
4. Publish with the Artifact tool (first publish passes an `icon` such as `report` or `chart`). Keep the `<title>` a short name for the report, and put the one-sentence summary in `description`.

## Content rules

- The headline states the finding ("Deploys doubled while the failure rate fell"), never just the topic.
- The dek (one to three sentences under the headline) says what happened and what matters most.
- Write plainly, in sentence case, in short active sentences. No emoji.
- Every problem names its cause and the next step, with the number: "2 payments deploys rolled back. Raise the pool limit from 20 to 40, then redeploy."
- Ids, dates, versions, costs and counts are data: put them in mono (`lg-mono`, `lg-meta`, `dd` in the rail), not in the serif prose.
- Use only numbers you have. If any figure is invented, estimated or sample data, say so in the notice band with the first sentence bold.
- Stat tiles only when the figures are the point; three to five of them. Deltas name the comparison ("vs last week") and use ▲/▼, never colour.
- End with a "How we count" footer: definitions, sources, and a mono meta line (report id, data range, generated time).

## Page anatomy

Everything sits inside `<div class="lg-root">`, in this order. Leave out any part the report does not need, except the header, the headline block and the footer.

```html
<div class="lg-root">
<header class="lg-header">
  <div class="lg-brand"><span class="lg-wordmark">Team or series name</span><span class="lg-header-sub">Weekly report</span></div>
  <span class="lg-header-meta">wk39 · 2026-09-29</span>
</header>
<p class="lg-notice"><strong>Sample data.</strong> One sentence on what the reader must know first.</p>

<div class="lg-page">
  <aside class="lg-rail" aria-label="Report details">
    <div>
      <p class="lg-overline">Report</p>
      <dl>
        <div><dt>Period</dt><dd>21–27 Sep 2026</dd></div>
        <div><dt>Source</dt><dd>deploy log, CI events</dd></div>
        <div><dt>Generated</dt><dd>29 Sep 2026 09:40 IST</dd></div>
      </dl>
    </div>
    <nav aria-label="Contents">
      <p class="lg-overline">Contents</p>
      <ol><li><a href="#section-id">Section heading</a></li></ol>
    </nav>
  </aside>

  <main class="lg-main">
    <header>
      <p class="lg-eyebrow">Weekly report · 21–27 Sep 2026</p>
      <h1 class="lg-h1">Headline that states the finding</h1>
      <p class="lg-dek">What happened and what matters most.</p>
    </header>

    <section class="lg-stats" aria-label="Key figures">
      <div class="lg-stat"><span class="lg-stat-label">Deploys</span><span class="lg-stat-value">148</span><span class="lg-stat-delta">▲ 74 vs last week</span></div>
    </section>

    <section id="section-id">
      <h2 class="lg-h2">Section heading</h2>
      <p class="lg-sub">One line saying what the section shows.</p>
      <div class="lg-prose"><p>Running text in serif, about 65 characters a line.</p></div>
    </section>

    <footer class="lg-method" id="method">
      <h2 class="lg-h2">How we count</h2>
      <p>Definitions and sources.</p>
      <p class="lg-meta">report id · data range · generated 2026-09-29T04:10Z</p>
    </footer>
  </main>
</div>
</div>
```

### Callouts

For findings that need action or attention. Most severe first, stacked in `lg-callouts`. The title states the fact with its number; the body gives the cause and the next step. Tones: `critical` (octagon), `warn` (triangle), `good` (check), `note` (dot, uses the accent).

```html
<div class="lg-callouts">
  <div class="lg-callout lg-callout--critical"><span class="lg-glyph lg-glyph--critical" aria-hidden="true"></span><h3>2 payments deploys rolled back</h3><p>Cause, then the next step.</p></div>
  <div class="lg-callout lg-callout--warn"><span class="lg-glyph lg-glyph--warn" aria-hidden="true"></span><h3>Build cache hit rate fell to 61%</h3><p>Cause, then the next step.</p></div>
  <div class="lg-callout lg-callout--good"><span class="lg-glyph lg-glyph--good" aria-hidden="true"></span><h3>Flaky tests are down to 4</h3><p>What changed.</p></div>
  <div class="lg-callout lg-callout--note"><span class="lg-glyph lg-glyph--note" aria-hidden="true"></span><h3>Figures now exclude staging</h3><p>What the reader should know.</p></div>
</div>
```

### Tables

Wide tables scroll inside `lg-table-wrap`, never the page. Numbers right-aligned with `lg-num`; ids and versions in `lg-mono`; secondary words in `lg-muted`. A status cell always pairs the glyph with a written label; never colour whole rows.

```html
<div class="lg-table-wrap">
  <table class="lg-table">
    <thead><tr><th>Deploy</th><th>Service</th><th class="lg-num">Duration</th><th>Outcome</th></tr></thead>
    <tbody>
      <tr><td class="lg-mono">d-4431</td><td>payments <span class="lg-muted">eu-west</span></td><td class="lg-num">6 m</td>
        <td><span class="lg-status lg-status--critical"><span class="lg-glyph lg-glyph--critical" aria-hidden="true"></span>Rolled back <small>health check</small></span></td></tr>
    </tbody>
  </table>
</div>
```

### Record block

Verbatim text from a system (log lines, a query, a response). Quote exactly; your reading of it goes in the prose above.

```html
<pre class="lg-record"><span class="lg-record-head"><span>payments · health check</span><span>2026-09-24 14:02:11Z</span></span>GET /healthz → 503 Service Unavailable
pool: 20/20 connections in use, 38 waiting</pre>
```

### Charts

Put an empty `<figure class="lg-figure" id="…"></figure>` where the chart goes and call a helper from the chart script at the end of the page. The helpers draw the card, the legend (for two or more series), direct end labels, a hover and keyboard readout, a caption and a "Show as table" view, all from the tokens.

```js
lgLine(document.getElementById("chart-volume"), {
  labels: ["17 Aug", "24 Aug", "31 Aug", "7 Sep", "14 Sep", "21 Sep"],
  series: [
    { name: "api", color: "--chart-1", values: [20, 22, 21, 24, 30, 58] },
    { name: "web", color: "--chart-2", values: [18, 17, 20, 19, 26, 50] }
  ],
  format: function (v) { return v + "%"; },   // optional; also formats axis ticks
  yMin: 0,                                     // optional; yMax defaults to a round number above the data
  ariaLabel: "The takeaway in one sentence, with the end values.",
  caption: "Weeks start on Monday. Hover, or focus the chart and use the arrow keys, for weekly values."
});
lgBars(document.getElementById("chart-stages"), {
  name: "Median hours",
  items: [{ label: "Review", value: 4.1 }, { label: "CI", value: 2.3 }],   // largest first
  format: function (v) { return v.toFixed(1) + " h"; },
  ariaLabel: "The takeaway in one sentence.",
  caption: "What the bars measure."
});
```

Chart rules:

- Series colours in fixed order: `--chart-1` blue, `--chart-2` copper, `--chart-3` rose, `--chart-4` moss, `--chart-5` violet. Never cycle. A sixth series folds into "Other" in `--chart-other`, or the chart splits into small multiples. Scatter plots use the first three only.
- Never use a status colour (`good`, `warn`, `critical`) as a series, and never put a status in a chart legend.
- One y-axis only. Two measures of different scale get two charts.
- For another chart form (stacked bars, scatter, heatmap), load the `dataviz` skill and use the Ledger `--chart-*` tokens as its palette.

## Before publishing

- Every colour comes from a token. No hex values outside the token block, so both themes work.
- Look at the page once in light and dark if the session offers a preview or screenshot, at desktop and phone width (about 400px). Nothing scrolls sideways except tables and charts inside their own containers.
- Charts have a legend when there are two or more series, end labels, a table view and an `aria-label` that states the takeaway.
- Every status appears as glyph plus written label.
- The notice band discloses any sample, estimated or partial data.
- If the report will be shared, tell the person that others can only open it once they share it from the page's Share menu.

## Page skeleton

The Artifact tool wraps the file in its own document shell, so the file starts with `<title>` and has no `<!doctype>`, `<html>`, `<head>` or `<body>` tags.

```html
<title>Platform Weekly Report</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap">
<style>
/* 1. the style block below, 2. the component CSS below */
</style>
<div class="lg-root"> … page anatomy … </div>
<script>
/* the chart script below, only if the report has charts, then the lgLine / lgBars calls */
</script>
```

## Style block (snapshot)

Paste this whole block into the page's `<style>`, then the component CSS after it.

```css
:root {
  --paper:#f4f2ec; --surface:#fbfaf7; --card:#ffffff; --band:#e9e5da; --line-soft:#e6e2d8;
  --line:#ddd9cf; --line-strong:#cfc9bb; --control-border:#8c8678; --ink:#1e1d1a; --ink-2:#3a3832;
  --ink-3:#5e5a52; --accent:#23508f; --accent-hover:#163a6b; --accent-tint:#ebf3ff;
  --accent-text:#163a6b; --good:#1f6b5d; --good-tint:#e5f7f2; --good-text:#013f35; --warn:#7a4f00;
  --warn-tint:#fbf1de; --warn-text:#3d2a00; --critical:#a3221b; --critical-tint:#fbefec;
  --critical-text:#7e1a14; --chart-1:#23508f; --chart-2:#8a4f0e; --chart-3:#af609f; --chart-4:#5d7627;
  --chart-5:#6e3591; --chart-other:#8c8678;
  --shadow-float:0 2px 10px rgba(30, 29, 26, 0.18);
  --font-serif:"Source Serif 4", Georgia, serif; --font-sans:"IBM Plex Sans", system-ui, sans-serif; --font-mono:"IBM Plex Mono", ui-monospace, monospace;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-6:24px; --space-8:32px; --space-12:48px; --rail-w:200px; --content-max:760px; --page-max:1120px; --radius-record:0px; --radius-chip:4px; --radius-control:6px; --radius-card:8px; --radius-pill:999px;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper:#1e1d1a; --surface:#242320; --card:#292824; --band:#33322f; --line-soft:#33322f;
    --line:#3a3832; --line-strong:#5e5a52; --control-border:#848077; --ink:#f4f2ec; --ink-2:#d8d3c7;
    --ink-3:#ada9a0; --accent:#76a6ec; --accent-hover:#c9d3e3; --accent-tint:#202c3d;
    --accent-text:#c9d3e3; --good:#6db5a5; --good-tint:#16312b; --good-text:#b8e6db; --warn:#ca9b5b;
    --warn-tint:#362c19; --warn-text:#efdcb9; --critical:#f97465; --critical-tint:#392621;
    --critical-text:#fdc9c1; --chart-1:#5887cb; --chart-2:#b4763d; --chart-3:#b566a5; --chart-4:#779144;
    --chart-5:#a269c9; --chart-other:#8c8678;
    --shadow-float:0 2px 12px rgba(0, 0, 0, 0.5); color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --paper:#1e1d1a; --surface:#242320; --card:#292824; --band:#33322f; --line-soft:#33322f;
  --line:#3a3832; --line-strong:#5e5a52; --control-border:#848077; --ink:#f4f2ec; --ink-2:#d8d3c7;
  --ink-3:#ada9a0; --accent:#76a6ec; --accent-hover:#c9d3e3; --accent-tint:#202c3d;
  --accent-text:#c9d3e3; --good:#6db5a5; --good-tint:#16312b; --good-text:#b8e6db; --warn:#ca9b5b;
  --warn-tint:#362c19; --warn-text:#efdcb9; --critical:#f97465; --critical-tint:#392621;
  --critical-text:#fdc9c1; --chart-1:#5887cb; --chart-2:#b4763d; --chart-3:#b566a5; --chart-4:#779144;
  --chart-5:#a269c9; --chart-other:#8c8678;
  --shadow-float:0 2px 12px rgba(0, 0, 0, 0.5); color-scheme: dark;
}
body { background: var(--paper); color: var(--ink); }
```

## Component CSS (snapshot)

```css
/* Ledger report components. Colours, fonts, radii and spacing come from tokens.css.
 * Every class is prefixed lg- so it never collides with the generated type-style classes. */

.lg-root { background: var(--paper); color: var(--ink); font-family: var(--font-sans); font-size: 13px; line-height: 1.5; }
.lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; }
.lg-root a { color: var(--accent); text-underline-offset: 2px; }
.lg-root a:hover { color: var(--accent-hover); }
.lg-root :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.lg-mono { font-family: var(--font-mono); }

/* Header strip */
.lg-header { background: var(--surface); border-bottom: 1px solid var(--line); padding: 14px var(--space-6); display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; justify-content: space-between; }
.lg-brand { display: flex; align-items: center; gap: 14px; min-width: 0; }
.lg-wordmark { font-family: var(--font-serif); font-size: 21px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
.lg-header-sub { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); padding-left: 14px; border-left: 1px solid var(--line); }
.lg-header-meta { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }

/* Notice band */
.lg-notice { margin: 0; background: var(--band); border-bottom: 1px solid var(--line-strong); padding: 10px var(--space-6); color: var(--ink-2); }
.lg-notice strong { color: var(--ink); font-weight: 600; }

/* Page grid: rail + main column */
.lg-page { max-width: var(--page-max); margin: 0 auto; padding: var(--space-8) var(--space-6) 64px; display: grid; grid-template-columns: var(--rail-w) minmax(0, var(--content-max)); gap: var(--space-12); }
.lg-rail { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 24px); align-self: start; display: grid; gap: 28px; }
.lg-overline { font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-3); margin: 0 0 8px; }
.lg-rail dl { margin: 0; display: grid; gap: 10px; }
.lg-rail dt { color: var(--ink-3); font-size: 12.5px; }
.lg-rail dd { margin: 2px 0 0; font-family: var(--font-mono); font-size: 12px; color: var(--ink-2); }
.lg-rail ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; font-size: 13px; }
.lg-main { min-width: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-12); }
.lg-main > * { min-width: 0; }

/* Headline block and sections */
.lg-eyebrow { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); margin: 0 0 10px; }
.lg-h1 { font-family: var(--font-serif); font-weight: 600; font-size: clamp(28px, 4.2vw, 38px); line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 14px; text-wrap: balance; }
.lg-dek { font-family: var(--font-serif); font-size: 16.5px; line-height: 1.55; color: var(--ink-2); margin: 0; max-width: 65ch; }
.lg-prose { display: grid; gap: 14px; }
.lg-prose p { font-family: var(--font-serif); font-size: 16.5px; line-height: 1.55; margin: 0; max-width: 65ch; }
.lg-quote { font-family: var(--font-serif); font-style: italic; font-size: 16.5px; line-height: 1.55; margin: 0; }
.lg-h2 { font-family: var(--font-serif); font-weight: 600; font-size: 22px; line-height: 1.25; margin: 0 0 6px; text-wrap: balance; }
.lg-sub { color: var(--ink-3); margin: 0 0 16px; font-size: 13px; }

/* Stat tiles */
.lg-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-3); }
.lg-stat { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius-card); padding: 14px var(--space-4); display: grid; gap: 4px; align-content: start; }
.lg-stat-label { font-size: 12.5px; font-weight: 600; color: var(--ink-3); }
.lg-stat-value { font-size: 28px; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; color: var(--ink); }
.lg-stat-delta { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }

/* Chart card */
.lg-figure { margin: 0; }
.lg-chart { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius-card); padding: var(--space-4) var(--space-4) var(--space-3); position: relative; }
.lg-legend { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 0 0 8px; padding: 0; list-style: none; font-family: var(--font-mono); font-size: 12px; color: var(--ink-2); }
.lg-legend li { display: flex; align-items: center; gap: 8px; }
.lg-key { width: 16px; height: 2px; border-radius: 1px; display: inline-block; flex-shrink: 0; }
.lg-key--bar { width: 10px; height: 10px; border-radius: 2px; }
.lg-plot { position: relative; }
.lg-plot svg { display: block; width: 100%; height: auto; overflow: visible; }
.lg-grid { stroke: var(--line-soft); stroke-width: 1; }
.lg-tick { font-family: var(--font-mono); font-size: 11px; fill: var(--ink-3); }
.lg-endlabel { font-family: var(--font-mono); font-size: 12px; fill: var(--ink-2); }
.lg-barlabel { font-family: var(--font-sans); font-size: 12.5px; fill: var(--ink-2); }
.lg-tip { position: absolute; top: 0; left: 0; pointer-events: none; background: var(--card); border: 1px solid var(--line-strong); border-radius: var(--radius-control); padding: 8px 10px; min-width: 150px; display: grid; gap: 4px; }
.lg-tip-date { font-family: var(--font-mono); font-size: 11px; color: var(--ink-3); }
.lg-tip-row { display: grid; grid-template-columns: 14px auto 1fr; align-items: center; gap: 8px; }
.lg-tip-row b { font-weight: 600; font-size: 13px; color: var(--ink); font-variant-numeric: tabular-nums; }
.lg-tip-row span:last-child { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }
.lg-caption { color: var(--ink-3); font-size: 12.5px; margin-top: 10px; }
.lg-tableview { margin-top: 10px; }
.lg-tableview summary { cursor: pointer; color: var(--accent); font-size: 13px; width: fit-content; }
.lg-tableview .lg-table-wrap { margin-top: 10px; }

/* Status glyphs: shape carries the meaning with the label, never colour alone */
.lg-glyph { display: inline-block; flex-shrink: 0; width: 12px; height: 12px; }
.lg-glyph--note { border-radius: 50%; width: 11px; height: 11px; background: var(--accent); }
.lg-glyph--good { background: var(--good); clip-path: polygon(0 55%, 14% 41%, 38% 64%, 86% 12%, 100% 26%, 38% 92%); }
.lg-glyph--warn { width: 13px; background: var(--warn); clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.lg-glyph--critical { background: var(--critical); clip-path: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%); }

/* Callouts */
.lg-callouts { display: grid; gap: var(--space-3); }
.lg-callout { border: 1px solid; border-radius: var(--radius-control); padding: 12px 14px; display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 4px 10px; }
.lg-callout .lg-glyph { margin-top: 4px; }
.lg-callout h3 { margin: 0; font-size: 14px; font-weight: 600; line-height: 1.4; }
.lg-callout p { margin: 0; grid-column: 2; font-size: 14px; line-height: 1.55; color: var(--ink-2); }
.lg-callout--note { background: var(--accent-tint); border-color: var(--accent); }
.lg-callout--note h3 { color: var(--accent-text); }
.lg-callout--good { background: var(--good-tint); border-color: var(--good); }
.lg-callout--good h3 { color: var(--good-text); }
.lg-callout--warn { background: var(--warn-tint); border-color: var(--warn); }
.lg-callout--warn h3 { color: var(--warn-text); }
.lg-callout--critical { background: var(--critical-tint); border-color: var(--critical); }
.lg-callout--critical h3 { color: var(--critical-text); }

/* Tables */
.lg-table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--radius-card); background: var(--card); }
.lg-table { border-collapse: collapse; width: 100%; font-size: 13px; }
.lg-table th { text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-3); padding: 10px 14px; border-bottom: 1px solid var(--line-strong); white-space: nowrap; }
.lg-table td { padding: 10px 14px; border-bottom: 1px solid var(--line-soft); vertical-align: top; color: var(--ink); }
.lg-table tr:last-child td { border-bottom: 0; }
.lg-table .lg-num { text-align: right; font-variant-numeric: tabular-nums; }
.lg-table td.lg-mono { font-size: 12px; color: var(--ink-2); white-space: nowrap; }
.lg-muted { color: var(--ink-3); }
.lg-status { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; font-weight: 600; }
.lg-status--note { color: var(--accent); }
.lg-status--good { color: var(--good); }
.lg-status--warn { color: var(--warn); }
.lg-status--critical { color: var(--critical); }
.lg-status small { font-weight: 400; color: var(--ink-3); font-family: var(--font-mono); font-size: 12px; }

/* Record block */
.lg-record { background: var(--card); border: 1px solid var(--line-strong); border-radius: var(--radius-record); font-family: var(--font-mono); font-size: 13px; line-height: 1.65; padding: 10px 14px; white-space: pre-line; margin: 0; color: var(--ink); }
.lg-record-head { display: flex; justify-content: space-between; gap: 12px; font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; color: var(--ink-2); border-bottom: 1px solid var(--line-soft); padding-bottom: 6px; margin-bottom: 6px; white-space: normal; }
.lg-record-head span + span { font-family: var(--font-mono); font-weight: 400; font-size: 12px; color: var(--ink-3); }

/* Method footer */
.lg-method { border-top: 1px solid var(--line); padding-top: 20px; display: grid; gap: 10px; color: var(--ink-2); font-size: 13px; }
.lg-method p { margin: 0; max-width: 65ch; }
.lg-method .lg-meta { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }

@media (max-width: 900px) {
  .lg-page { grid-template-columns: minmax(0, 1fr); gap: var(--space-8); padding: var(--space-6) var(--space-4) 48px; }
  .lg-rail { position: static; order: 2; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); border-top: 1px solid var(--line); padding-top: var(--space-6); }
  .lg-header, .lg-notice { padding-left: var(--space-4); padding-right: var(--space-4); }
}
@media (max-width: 560px) {
  .lg-header-sub { display: none; }
}
```

## Chart script (snapshot)

```js
/* Ledger charts: lgLine (multi-series line) and lgBars (horizontal bars). Colours come from --chart-N tokens. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function niceMax(v) {
    var p = Math.pow(10, Math.floor(Math.log10(v || 1))), m = v / p;
    var steps = [1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10];
    for (var i = 0; i < steps.length; i++) if (m <= steps[i] + 1e-9) return steps[i] * p;
    return 10 * p;
  }
  function legend(root, series, bar) {
    if (series.length < 2) return;
    var ul = document.createElement("ul"); ul.className = "lg-legend";
    series.forEach(function (s) {
      var li = document.createElement("li");
      var k = document.createElement("span"); k.className = "lg-key" + (bar ? " lg-key--bar" : ""); k.style.background = "var(" + s.color + ")";
      var t = document.createElement("span"); t.textContent = s.name;
      li.appendChild(k); li.appendChild(t); ul.appendChild(li);
    });
    root.appendChild(ul);
  }
  function tableView(fig, head, rows) {
    var d = document.createElement("details"); d.className = "lg-tableview";
    var s = document.createElement("summary"); s.textContent = "Show as table"; d.appendChild(s);
    var w = document.createElement("div"); w.className = "lg-table-wrap";
    var t = document.createElement("table"); t.className = "lg-table";
    var tr = document.createElement("tr");
    head.forEach(function (h, i) { var th = document.createElement("th"); th.textContent = h; if (i) th.className = "lg-num"; tr.appendChild(th); });
    t.createTHead().appendChild(tr);
    var tb = t.createTBody();
    rows.forEach(function (r) {
      var row = document.createElement("tr");
      r.forEach(function (c, i) { var td = document.createElement("td"); td.textContent = c; td.className = i ? "lg-num" : "lg-mono"; row.appendChild(td); });
      tb.appendChild(row);
    });
    w.appendChild(t); d.appendChild(w); fig.appendChild(d);
  }
  function tipRow(tip, color, value, name, bar) {
    var row = document.createElement("div"); row.className = "lg-tip-row";
    var k = document.createElement("span"); k.className = "lg-key" + (bar ? " lg-key--bar" : ""); k.style.background = "var(" + color + ")"; if (!bar) k.style.width = "14px";
    var b = document.createElement("b"); b.textContent = value;
    var n = document.createElement("span"); n.textContent = name;
    row.appendChild(k); row.appendChild(b); row.appendChild(n); tip.appendChild(row);
  }
  function placeTip(plot, tip, xPx, scale) {
    tip.hidden = false;
    var left = xPx * scale + 14;
    if (left + tip.offsetWidth > plot.clientWidth) left = xPx * scale - tip.offsetWidth - 14;
    tip.style.transform = "translate(" + Math.max(0, left) + "px, 8px)";
  }

  /* opts: {labels:[x labels], series:[{name, color:"--chart-1", values:[]}], format:v=>string, yMin, yMax, ariaLabel, caption} */
  window.lgLine = function (fig, opts) {
    var fmt = opts.format || String;
    var card = document.createElement("div"); card.className = "lg-chart"; fig.appendChild(card);
    legend(card, opts.series, false);
    var plot = document.createElement("div"); plot.className = "lg-plot"; card.appendChild(plot);
    if (opts.caption) { var cap = document.createElement("figcaption"); cap.className = "lg-caption"; cap.textContent = opts.caption; fig.appendChild(cap); }
    tableView(fig, ["Period"].concat(opts.series.map(function (s) { return s.name; })),
      opts.labels.map(function (l, i) { return [l].concat(opts.series.map(function (s) { return fmt(s.values[i]); })); }));
    var all = [].concat.apply([], opts.series.map(function (s) { return s.values; }));
    var y0 = opts.yMin != null ? opts.yMin : 0, y1 = opts.yMax != null ? opts.yMax : niceMax(Math.max.apply(null, all));
    var n = opts.labels.length, idx = n - 1, svg, cross, dots, tip, g;
    var longest = Math.max.apply(null, opts.series.map(function (s) { return (s.name + " " + fmt(s.values[n - 1])).length; }));
    function draw() {
      var W = Math.max(280, plot.clientWidth), H = W < 480 ? 220 : 260;
      var m = { t: 10, r: Math.min(140, longest * 7.4 + 16), b: 26, l: 44 };
      var x = function (i) { return m.l + i * (W - m.l - m.r) / (n - 1); };
      var y = function (v) { return m.t + (y1 - v) / (y1 - y0) * (H - m.t - m.b); };
      g = { W: W, x: x, y: y };
      plot.textContent = "";
      svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, tabindex: "0", role: "img", "aria-label": opts.ariaLabel || "" }, plot);
      for (var k = 0; k <= 4; k++) {
        var v = y0 + (y1 - y0) * k / 4;
        el("line", { x1: m.l, x2: W - m.r + 8, y1: y(v), y2: y(v), class: "lg-grid" }, svg);
        el("text", { x: m.l - 8, y: y(v) + 4, "text-anchor": "end", class: "lg-tick" }, svg).textContent = fmt(v);
      }
      var step = W < 420 ? 2 : 1;
      opts.labels.forEach(function (l, i) {
        if ((n - 1 - i) % step) return;
        el("text", { x: x(i), y: H - 6, "text-anchor": "middle", class: "lg-tick" }, svg).textContent = l;
      });
      cross = el("line", { y1: m.t, y2: H - m.b, stroke: "var(--ink-3)", "stroke-width": 1, visibility: "hidden" }, svg);
      var ends = opts.series.map(function (s) { return { s: s, y: y(s.values[n - 1]) }; }).sort(function (a, b) { return a.y - b.y; });
      for (var e = 1; e < ends.length; e++) {
        var prev = ends[e - 1].ly != null ? ends[e - 1].ly : ends[e - 1].y;
        if (ends[e].y - prev < 15) ends[e].ly = prev + 15;
      }
      opts.series.forEach(function (s) {
        el("path", { d: s.values.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" "),
          fill: "none", stroke: "var(" + s.color + ")", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
        el("circle", { cx: x(n - 1), cy: y(s.values[n - 1]), r: 4, fill: "var(" + s.color + ")", stroke: "var(--card)", "stroke-width": 2 }, svg);
      });
      ends.forEach(function (e) {
        var ly = e.ly != null ? e.ly : e.y;
        if (e.ly != null) el("line", { x1: x(n - 1) + 5, y1: e.y, x2: x(n - 1) + 9, y2: ly, stroke: "var(--ink-3)", "stroke-width": 1 }, svg);
        el("text", { x: x(n - 1) + 12, y: ly + 4, class: "lg-endlabel" }, svg).textContent = e.s.name + " " + fmt(e.s.values[n - 1]);
      });
      dots = opts.series.map(function (s) { return el("circle", { r: 4, fill: "var(" + s.color + ")", stroke: "var(--card)", "stroke-width": 2, visibility: "hidden" }, svg); });
      var hit = el("rect", { x: m.l - 12, y: 0, width: W - m.l - m.r + 24, height: H, fill: "transparent" }, svg);
      hit.addEventListener("pointermove", function (ev) {
        var r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) * (W / r.width);
        show(Math.max(0, Math.min(n - 1, Math.round((px - m.l) / ((W - m.l - m.r) / (n - 1))))));
      });
      hit.addEventListener("pointerleave", hide);
      svg.addEventListener("focus", function () { show(idx); });
      svg.addEventListener("blur", hide);
      svg.addEventListener("keydown", function (ev) {
        if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
        ev.preventDefault(); show(Math.max(0, Math.min(n - 1, idx + (ev.key === "ArrowRight" ? 1 : -1))));
      });
      tip = document.createElement("div"); tip.className = "lg-tip"; tip.hidden = true; plot.appendChild(tip);
    }
    function show(i) {
      idx = i;
      cross.setAttribute("x1", g.x(i)); cross.setAttribute("x2", g.x(i)); cross.setAttribute("visibility", "visible");
      opts.series.forEach(function (s, k) { dots[k].setAttribute("cx", g.x(i)); dots[k].setAttribute("cy", g.y(s.values[i])); dots[k].setAttribute("visibility", "visible"); });
      tip.textContent = "";
      var d = document.createElement("div"); d.className = "lg-tip-date"; d.textContent = opts.labels[i]; tip.appendChild(d);
      opts.series.slice().sort(function (a, b) { return b.values[i] - a.values[i]; }).forEach(function (s) { tipRow(tip, s.color, fmt(s.values[i]), s.name); });
      placeTip(plot, tip, g.x(i), plot.clientWidth / g.W);
    }
    function hide() { if (!cross) return; cross.setAttribute("visibility", "hidden"); dots.forEach(function (c) { c.setAttribute("visibility", "hidden"); }); tip.hidden = true; }
    draw();
    var lastW = plot.clientWidth;
    if (window.ResizeObserver) new ResizeObserver(function () { if (Math.abs(plot.clientWidth - lastW) > 2) { lastW = plot.clientWidth; draw(); } }).observe(plot);
  };

  /* opts: {items:[{label, value}], name, color:"--chart-1", format, ariaLabel, caption} — one series, largest first */
  window.lgBars = function (fig, opts) {
    var fmt = opts.format || String, color = opts.color || "--chart-1";
    var card = document.createElement("div"); card.className = "lg-chart"; fig.appendChild(card);
    var plot = document.createElement("div"); plot.className = "lg-plot"; card.appendChild(plot);
    if (opts.caption) { var cap = document.createElement("figcaption"); cap.className = "lg-caption"; cap.textContent = opts.caption; fig.appendChild(cap); }
    tableView(fig, ["Item", opts.name || "Value"], opts.items.map(function (it) { return [it.label, fmt(it.value)]; }));
    var max = niceMax(Math.max.apply(null, opts.items.map(function (i) { return i.value; })));
    var labelW = Math.min(170, Math.max.apply(null, opts.items.map(function (i) { return i.label.length; })) * 7.4 + 12);
    var tip;
    function draw() {
      var W = Math.max(280, plot.clientWidth), row = 34, bar = 18, valW = 64;
      var H = opts.items.length * row + 8;
      var x = function (v) { return labelW + v / max * (W - labelW - valW); };
      plot.textContent = "";
      var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img", "aria-label": opts.ariaLabel || "" }, plot);
      el("line", { x1: labelW, x2: labelW, y1: 0, y2: H - 4, class: "lg-grid" }, svg);
      opts.items.forEach(function (it, i) {
        var cy = i * row + row / 2, x1 = x(it.value), w = Math.max(0, x1 - labelW), r = Math.min(4, w);
        el("text", { x: labelW - 10, y: cy + 4, "text-anchor": "end", class: "lg-barlabel" }, svg).textContent = it.label;
        var p = el("path", { d: "M" + labelW + " " + (cy - bar / 2) + " H" + (x1 - r) + " Q" + x1 + " " + (cy - bar / 2) + " " + x1 + " " + (cy - bar / 2 + r) +
          " V" + (cy + bar / 2 - r) + " Q" + x1 + " " + (cy + bar / 2) + " " + (x1 - r) + " " + (cy + bar / 2) + " H" + labelW + " Z", fill: "var(" + color + ")" }, svg);
        el("text", { x: x1 + 8, y: cy + 4, class: "lg-endlabel" }, svg).textContent = fmt(it.value);
        var hit = el("rect", { x: 0, y: cy - row / 2, width: W, height: row, fill: "transparent", tabindex: "0", "aria-label": it.label + " " + fmt(it.value) }, svg);
        function on() {
          p.setAttribute("opacity", "0.82"); tip.textContent = "";
          tipRow(tip, color, fmt(it.value), it.label, true);
          tip.hidden = false; var tx = x1 + valW + 4; if (tx + tip.offsetWidth > W) tx = Math.max(0, x1 - tip.offsetWidth - 8);
          tip.style.transform = "translate(" + tx * (plot.clientWidth / W) + "px," + Math.max(0, cy - 16) * (plot.clientWidth / W) + "px)";
        }
        function off() { p.removeAttribute("opacity"); tip.hidden = true; }
        hit.addEventListener("pointerenter", on); hit.addEventListener("pointerleave", off);
        hit.addEventListener("focus", on); hit.addEventListener("blur", off);
      });
      tip = document.createElement("div"); tip.className = "lg-tip"; tip.hidden = true; plot.appendChild(tip);
    }
    draw();
    var lastW = plot.clientWidth;
    if (window.ResizeObserver) new ResizeObserver(function () { if (Math.abs(plot.clientWidth - lastW) > 2) { lastW = plot.clientWidth; draw(); } }).observe(plot);
  };
})();
```

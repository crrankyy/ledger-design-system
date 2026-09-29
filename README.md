# Ledger design system

Ledger is a design system for reports published as web pages: weekly updates, reviews, audits and analyses. The look is a record kept on warm paper. Serif carries what people read, sans carries the interface, mono carries measured and recorded data. It ships a light and a dark theme, and pages follow the viewer's theme setting.

The live, browsable version is the Ledger design system artifact on claude.ai: https://claude.ai/artifact/B9j2J2SkrfZgvteBgEPtyv

## What's in this repo

| Path | What it is |
| --- | --- |
| `design-system/README.md` | The brand book: content, colour, type, layout, charts, themes and accessibility rules. Start here. |
| `design-system/tokens.json` | Every token (30 colours in light and dark, type styles, spacing, radii, shadow) in the Claude Design System format. |
| `design-system/components/` | One folder per component with guidelines (`README.md`) and a live preview (`preview.html`), plus `bundle.css` and the cover. |
| `design-system/design-system.json` | The index the claude.ai design system page reads. |
| `dist/ledger.css` | Ready to use: the token block (light and dark) plus all component styles in one file. |
| `dist/ledger-charts.js` | `lgLine` and `lgBars`, the chart helpers: legend, end labels, hover and keyboard readout, table view. |
| `examples/weekly-report.html` | A complete sample report that uses both. Open it in a browser. |
| `skills/ledger-reports/SKILL.md` | The Claude skill that formats report artifacts in Ledger. |

## Using it in a page

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap">
<link rel="stylesheet" href="dist/ledger.css">
<div class="lg-root"> … </div>
<script src="dist/ledger-charts.js"></script>
```

Claude artifacts can't load stylesheets from other hosts, so a report published as an artifact inlines `dist/ledger.css` and `dist/ledger-charts.js` instead. The skill does this.

## Keeping it in sync

The claude.ai artifact and this repo are separate copies. When you change one, copy the change to the other: edit files under `design-system/`, rebuild `dist/ledger.css` from `tokens.json` and `components/bundle.css`, and update the snapshot in `skills/ledger-reports/SKILL.md`.

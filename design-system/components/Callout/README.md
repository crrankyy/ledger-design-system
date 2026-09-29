# Callout

A boxed finding that needs action or attention, in one of four tones: note, good, warn, critical.

- Tint fill with a 1px border in the status colour, `radius-control`: `accent-tint`/`accent`, `good-tint`/`good`, `warn-tint`/`warn`, `critical-tint`/`critical`.
- A glyph (dot, check, triangle, octagon) sits before a `callout-title` in the matching `-text` colour; the body is `callout-body` in `ink-2`.
- The title states the fact with its number ("3 runs ended on the 20-turn cap"); the body gives the cause and the next step.
- Stack several with `space-3` between them, most severe first. Never use a callout for decoration or for a plain aside.
- Provide: tone, title, body.

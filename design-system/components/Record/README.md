# Record

A square block for text quoted verbatim from a system: a log excerpt, a query, a response body, a configuration diff.

- `card` fill, 1px `line-strong` border, square `radius-record`; body in `record` mono 13/1.65 with `white-space: pre-line`.
- An optional head row names the source in `label` weight on the left and one mono detail (time, size, cost) on the right, over a `line-soft` rule.
- Quote exactly; trim with an ellipsis line rather than editing. Put your reading of it in the prose above, not inside the block.
- Provide: source name, optional detail, the verbatim text.

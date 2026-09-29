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

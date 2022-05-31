var ce = {
    plain: "color: black; font-weight: normal",
    blue: "color: blue; font-weight: bold",
    brown: "color: brown; font-weight: bold",
    green: "color: green; font-weight: bold",
  },
  { plain: zt } = ce,
  be = (n, e = zt, t = zt) => ({
    log: (s, r = "") => console.log(`[${Date.now()}]%c[${n}] %c${s}`, e, t, r),
    warn: (s) => console.warn(`[${n}] ${s}`),
  });
var Ht = be("WebsocketConnection", ce.brown),
  $t = {},
  et = Symbol("setWebsocket"),
  tt = Symbol("connectionCallback");
async function st(n, e) {
  return rt(n, (t) => {
    let { type: s } = t;
    s === "HB"
      ? console.log("swallowing HB in WebsocketConnection")
      : s === "Welcome"
      ? Ht.log(`Session established clientId: ${t.clientId}`)
      : e(t);
  });
}
async function nt(n) {
  rt(n.url, n[tt], n);
}
async function rt(n, e, t) {
  let s = $t[n] || ($t[n] = { attemptsRemaining: 5, status: "disconnected" });
  try {
    e({ type: "connection-status", status: "connecting" });
    let r = typeof t != "undefined",
      o = await Wn(n);
    console.log(
      `%c\u26A1 %c${n}`,
      "font-size: 24px;color: green;font-weight: bold;",
      "color:green; font-size: 14px;"
    ),
      r ? t[et](o) : (t = new Yt(o, n, e));
    let i = r ? "reconnected" : "connected";
    return e({ type: "connection-status", status: i }), (t.status = i), t;
  } catch {
    let o = --s.attemptsRemaining > 0;
    if (
      (e({
        type: "connection-status",
        status: "disconnected",
        reason: "failed to connect",
        retry: o,
      }),
      o)
    )
      return jn(n, e, t, 1e4);
  }
}
var jn = (n, e, t, s) =>
    new Promise((r) => {
      setTimeout(() => {
        r(rt(n, e, t));
      }, s);
    }),
  Wn = (n) =>
    new Promise((e, t) => {
      let s = new WebSocket("ws://" + n);
      (s.onopen = () => e(s)), (s.onerror = (r) => t(r));
    }),
  Yt = class {
    constructor(e, t, s) {
      (this.url = t),
        (this[tt] = s),
        this[et](e),
        (this.status = "ready"),
        (this.requiresAuthentication = !0),
        (this.requiresLogin = !0);
    }
    reconnect() {
      nt(this);
    }
    [et](e) {
      let t = this[tt];
      (e.onmessage = (i) => {
        let l = JSON.parse(i.data);
        t(l);
      }),
        (e.onerror = () => {
          console.log(
            `%c\u26A1 %c${this.url}`,
            "font-size: 24px;color: red;font-weight: bold;",
            "color:red; font-size: 14px;"
          ),
            t({
              type: "connection-status",
              status: "disconnected",
              reason: "error",
            }),
            this.status !== "closed" && (nt(this), (this.send = o));
        }),
        (e.onclose = () => {
          console.log(
            `%c\u26A1 %c${this.url}`,
            "font-size: 24px;color: orange;font-weight: bold;",
            "color:orange; font-size: 14px;"
          ),
            t({
              type: "connection-status",
              status: "disconnected",
              reason: "close",
            }),
            this.status !== "closed" && (nt(this), (this.send = o));
        });
      let s = (i) => {
          e.send(JSON.stringify(i));
        },
        r = (i) => {
          Ht.log(`Message cannot be sent, socket closed: ${i.type}`);
        },
        o = (i) => {
          console.log(
            `queuing message ${JSON.stringify(i)} until websocket reconnected`
          );
        };
      (this.send = s),
        (this.close = () => {
          console.log("[Connection] close websocket"),
            (this.status = "closed"),
            e.close(),
            (this.send = r);
        });
    }
  };
var D = "and",
  ot = "=",
  qn = "!=",
  it = ">",
  lt = "<",
  ie = "or",
  he = "starts";
var H = "in",
  at = [
    { name: "name", flex: 1 },
    { name: "count", width: 40, type: "number" },
    { name: "totalCount", width: 40, type: "number" },
  ],
  ut = [
    { name: "bin" },
    { name: "count" },
    { name: "bin-lo" },
    { name: "bin-hi" },
  ];
var Xn = { combineWith: D };
function Jt(n, e, { combineWith: t = D } = Xn) {
  if (ct(e)) {
    let { column: s } = e;
    n = ts(n, { name: s });
  } else if (Qn(e)) return ts(n, { name: e.column });
  if (n) {
    if (!e) return n;
  } else return e;
  if (n.op === D && e.op === D)
    return { type: D, filters: sr(n.filters, e.filters) };
  if (n.op === D) {
    let s = er(n.filters, e);
    return s.length > 1 ? { op: D, filters: s } : s[0];
  } else
    return e.op === D
      ? { op: D, filters: e.filters.concat(n) }
      : Ae(n, e, !0)
      ? e
      : ss(n, e)
      ? tr(n, e)
      : { op: D, filters: [n, e] };
}
function ct(n) {
  return n
    ? pt(n) && n.values.length === 0
      ? !0
      : ft(n) && n.filters.some((e) => ct(e))
    : !1;
}
function k(n, e) {
  switch (e.type) {
    case H:
      return Jn(n, e);
    case ot:
      return Qt(n, e);
    case qn:
      return !Qt(n, e);
    case it:
      return $n(n, e);
    case lt:
      return Yn(n, e);
    case he:
      return Hn(n, e);
    case D:
      return Kn(n, e);
    case ie:
      return zn(n, e);
    default:
      return () => !0;
  }
}
function Kn(n, e) {
  let t = e.filters.map((s) => k(n, s));
  return (s) => t.every((r) => r(s));
}
function zn(n, e) {
  let t = e.filters.map((s) => k(n, s));
  return (s) => t.some((r) => r(s));
}
function Hn(n, e, t = !1) {
  let s = e.value.toLowerCase();
  return t
    ? (r) => r[n[e.colName]].toLowerCase().indexOf(s) !== 0
    : (r) => r[n[e.colName]].toLowerCase().indexOf(s) === 0;
}
function $n(n, e) {
  return (t) => t[n[e.colName]] > e.value;
}
function Yn(n, e) {
  return (t) => t[n[e.colName]] < e.value;
}
function Jn(n, e) {
  return (t) => e.values.findIndex((s) => s == t[n[e.colName]]) !== -1;
}
function Qt(n, e) {
  return (t) => t[n[e.colName]] === e.value;
}
function Qn(n) {
  if (n) {
    if (n.type === he && n.value === "") return !0;
  } else return !1;
  return n.type === he && n.value === "";
}
function Ie(n = null, e = null) {
  if (e === null) return !1;
  if (n === null) return !0;
  if (n.colName && n.colName === e.colName) {
    if (n.type === e.type)
      switch (n.type) {
        case H:
          return e.values.length < n.values.length && ns(n.values, e.values);
        case he:
          return (
            e.value.length > n.value.length && e.value.indexOf(n.value) === 0
          );
        default:
      }
  } else {
    if (n.colName && e.colName) return !1;
    if (ft(e) && Zn(n, e)) return !0;
  }
  return !1;
}
var Zt = (n, e) =>
  n.colName === e.colName
    ? 0
    : n.colName && e.colName && n.colName < e.colName
    ? -1
    : 1;
function Zn(n, e) {
  if (n.colName) {
    let t = e.filters.find((s) => s.colName === n.colName);
    return Ae(t, n, !0);
  } else if (n.filters.length === e.filters.length) {
    let t = n.filters.sort(Zt),
      s = e.filters.slice().sort(Zt);
    for (let r = 0; r < t.length; r++)
      if (!Ae(t[r], s[r], !0) && !or(t[r], s[r])) return !1;
    return !0;
  } else if (e.filters.length > n.filters.length)
    return n.filters.every((t) => {
      let s = e.filters.find((r) => r.colName === t.colName);
      return Ae(t, s, !0);
    });
}
function er(n, e) {
  return n.concat(e);
}
function tr(n, e) {
  let { type: t } = n,
    { type: s } = e,
    r = t === s ? t : "";
  return ct(e)
    ? e
    : r === H
    ? {
        ...n,
        values: n.values.concat(e.values.filter((o) => !n.values.includes(o))),
      }
    : r === he
    ? { type: ie, filters: [n, e] }
    : e;
}
function sr(n, e) {
  function t({ type: o }, { type: i }) {
    return o === i || o[0] === i[0];
  }
  let s = (o, i) => o.colName === i.colName && t(o, i),
    r = (o) => e.some((i) => s(o, i)) === !1;
  return n.filter(r).concat(e);
}
function es(n, e) {
  if (n) {
    if (n.colName === e) return [n, null];
    if (n.type !== D) return [null, n];
    {
      let [[t = null], s] = lr(n.filters, (r) => r.colName === e);
      return s.length === 1 ? [t, s[0]] : [t, { type: D, filters: s }];
    }
  } else return [null, null];
}
var ve = (n, e) => {
  let { type: t } = n;
  return t === D || t === ie
    ? { type: t, filters: n.filters.map((s) => ve(s, e)) }
    : { ...n, colName: e };
};
function ht(n, e) {
  if (!n) return null;
  let { type: t, colName: s } = n;
  switch (t) {
    case D:
    case ie:
      return nr(t, n.filters, e);
    default:
      return s === e ? n : null;
  }
}
function nr(n, e, t) {
  let s = [];
  return (
    e.forEach((r) => {
      let o = ht(r, t);
      o !== null && s.push(o);
    }),
    s.length === 1 ? s[0] : { type: n, filters: s }
  );
}
function ft(n) {
  return n.type === "and";
}
function rr(n) {
  return n.type === "or";
}
function pt(n) {
  return n.type === "in";
}
function ts(n, e) {
  let t = e.name;
  if (n) {
    if (n.colName === t) return null;
    if (ft(n) || rr(n)) {
      let { type: s } = n,
        o = n.filters.filter((i) => i.colName !== t);
      switch (o.length) {
        case 0:
          return null;
        case 1:
          return o[0];
        default:
          return { type: s, otherColFilters: o };
      }
    } else return n;
  } else return null;
}
var ss = (n, e) => n.column === e.column;
function Ae(n, e, t = !1) {
  if (n && e) {
    let s = ss(n, e);
    return t
      ? s && n.op === e.op && n.value === e.value && ir(n.values, e.values)
      : s;
  } else return !1;
}
function or(n, e) {
  return pt(n) && pt(e)
    ? e.values.length < n.values.length && ns(n.values, e.values)
    : !1;
}
function ns(n, e) {
  for (let t = 0, s = e.length; t < s; t++)
    if (n.indexOf(e[t]) === -1) return !1;
  return !0;
}
function ir(n, e) {
  if (n === e) return !0;
  if (n.length === e.length) {
    let t = n.slice().sort(),
      s = e.slice().sort();
    return t.join("|") === s.join("|");
  }
  return !1;
}
function lr(n, e, t = null) {
  let s = [],
    r = [],
    o = t === null ? null : [];
  for (let i = 0; i < n.length; i++)
    e(n[i])
      ? s.push(n[i])
      : t !== null && t(n[i])
      ? o.push(n[i])
      : r.push(n[i]);
  return t === null ? [s, r] : [s, o, r];
}
function Ne(n, e) {
  return n < e ? -1 : n > e ? 1 : n >= e ? 0 : NaN;
}
function dt(n) {
  let e = n,
    t = n;
  n.length === 1 && ((e = (i, l) => n(i) - l), (t = ar(n)));
  function s(i, l, a, u) {
    for (a == null && (a = 0), u == null && (u = i.length); a < u; ) {
      let c = (a + u) >>> 1;
      t(i[c], l) < 0 ? (a = c + 1) : (u = c);
    }
    return a;
  }
  function r(i, l, a, u) {
    for (a == null && (a = 0), u == null && (u = i.length); a < u; ) {
      let c = (a + u) >>> 1;
      t(i[c], l) > 0 ? (u = c) : (a = c + 1);
    }
    return a;
  }
  function o(i, l, a, u) {
    a == null && (a = 0), u == null && (u = i.length);
    let c = s(i, l, a, u - 1);
    return c > a && e(i[c - 1], l) > -e(i[c], l) ? c - 1 : c;
  }
  return { left: s, center: o, right: r };
}
function ar(n) {
  return (e, t) => Ne(n(e), t);
}
function rs(n) {
  return n === null ? NaN : +n;
}
var os = dt(Ne),
  ur = os.right,
  To = os.left,
  bo = dt(rs).center,
  is = ur;
function gt(n, e) {
  let t = 0;
  if (e === void 0) for (let s of n) s != null && (s = +s) >= s && ++t;
  else {
    let s = -1;
    for (let r of n) (r = e(r, ++s, n)) != null && (r = +r) >= r && ++t;
  }
  return t;
}
function Me(n, e) {
  let t, s;
  if (e === void 0)
    for (let r of n)
      r != null &&
        (t === void 0
          ? r >= r && (t = s = r)
          : (t > r && (t = r), s < r && (s = r)));
  else {
    let r = -1;
    for (let o of n)
      (o = e(o, ++r, n)) != null &&
        (t === void 0
          ? o >= o && (t = s = o)
          : (t > o && (t = o), s < o && (s = o)));
  }
  return [t, s];
}
function ls(n) {
  return n;
}
var as = Array.prototype,
  us = as.slice,
  Mo = as.map;
function fe(n) {
  return function () {
    return n;
  };
}
var cs = Math.sqrt(50),
  hs = Math.sqrt(10),
  fs = Math.sqrt(2);
function ps(n, e, t) {
  var s,
    r = -1,
    o,
    i,
    l;
  if (((e = +e), (n = +n), (t = +t), n === e && t > 0)) return [n];
  if (
    ((s = e < n) && ((o = n), (n = e), (e = o)),
    (l = pe(n, e, t)) === 0 || !isFinite(l))
  )
    return [];
  if (l > 0) {
    let a = Math.round(n / l),
      u = Math.round(e / l);
    for (
      a * l < n && ++a, u * l > e && --u, i = new Array((o = u - a + 1));
      ++r < o;

    )
      i[r] = (a + r) * l;
  } else {
    l = -l;
    let a = Math.round(n * l),
      u = Math.round(e * l);
    for (
      a / l < n && ++a, u / l > e && --u, i = new Array((o = u - a + 1));
      ++r < o;

    )
      i[r] = (a + r) / l;
  }
  return s && i.reverse(), i;
}
function pe(n, e, t) {
  var s = (e - n) / Math.max(0, t),
    r = Math.floor(Math.log(s) / Math.LN10),
    o = s / Math.pow(10, r);
  return r >= 0
    ? (o >= cs ? 10 : o >= hs ? 5 : o >= fs ? 2 : 1) * Math.pow(10, r)
    : -Math.pow(10, -r) / (o >= cs ? 10 : o >= hs ? 5 : o >= fs ? 2 : 1);
}
function mt(n, e, t) {
  let s;
  for (;;) {
    let r = pe(n, e, t);
    if (r === s || r === 0 || !isFinite(r)) return [n, e];
    r > 0
      ? ((n = Math.floor(n / r) * r), (e = Math.ceil(e / r) * r))
      : r < 0 && ((n = Math.ceil(n * r) / r), (e = Math.floor(e * r) / r)),
      (s = r);
  }
}
function ds(n) {
  return Math.ceil(Math.log(gt(n)) / Math.LN2) + 1;
}
function Pe() {
  var n = ls,
    e = Me,
    t = ds;
  function s(r) {
    Array.isArray(r) || (r = Array.from(r));
    var o,
      i = r.length,
      l,
      a = new Array(i);
    for (o = 0; o < i; ++o) a[o] = n(r[o], o, r);
    var u = e(a),
      c = u[0],
      f = u[1],
      h = t(a, c, f);
    if (!Array.isArray(h)) {
      let g = f,
        w = +h;
      if (
        (e === Me && ([c, f] = mt(c, f, w)),
        (h = ps(c, f, w)),
        h[h.length - 1] >= f)
      )
        if (g >= f && e === Me) {
          let E = pe(c, f, w);
          isFinite(E) &&
            (E > 0
              ? (f = (Math.floor(f / E) + 1) * E)
              : E < 0 && (f = (Math.ceil(f * -E) + 1) / -E));
        } else h.pop();
    }
    for (var p = h.length; h[0] <= c; ) h.shift(), --p;
    for (; h[p - 1] > f; ) h.pop(), --p;
    var d = new Array(p + 1),
      m;
    for (o = 0; o <= p; ++o)
      (m = d[o] = []), (m.x0 = o > 0 ? h[o - 1] : c), (m.x1 = o < p ? h[o] : f);
    for (o = 0; o < i; ++o)
      (l = a[o]), c <= l && l <= f && d[is(h, l, 0, p)].push(r[o]);
    return d;
  }
  return (
    (s.value = function (r) {
      return arguments.length
        ? ((n = typeof r == "function" ? r : fe(r)), s)
        : n;
    }),
    (s.domain = function (r) {
      return arguments.length
        ? ((e = typeof r == "function" ? r : fe([r[0], r[1]])), s)
        : e;
    }),
    (s.thresholds = function (r) {
      return arguments.length
        ? ((t =
            typeof r == "function"
              ? r
              : Array.isArray(r)
              ? fe(us.call(r))
              : fe(r)),
          s)
        : t;
    }),
    s
  );
}
function gs(n) {
  return Array.isArray(n);
}
function cr(n) {
  return !Array.isArray(n);
}
var de = class {
  constructor() {
    this._events = {};
  }
  addListener(e, t) {
    this._events || (this._events = {});
    let s = this._events[e];
    s
      ? gs(s)
        ? s.push(t)
        : cr(s) && (this._events[e] = [s, t])
      : (this._events[e] = t);
  }
  removeListener(e, t) {
    if (!this._events || !this._events[e]) return;
    let s = this._events[e],
      r = -1;
    if (s === t) delete this._events[e];
    else if (Array.isArray(s)) {
      for (let o = length; o-- > 0; )
        if (s[o] === t) {
          r = o;
          break;
        }
      if (r < 0) return;
      s.length === 1
        ? ((s.length = 0), delete this._events[e])
        : s.splice(r, 1);
    }
  }
  removeAllListeners(e) {
    if (this._events)
      e === void 0 ? delete this._events : delete this._events[e];
    else return;
  }
  emit(e, ...t) {
    if (this._events) {
      let s = this._events[e];
      s && wt(s, e, t);
      let r = this._events["*"];
      r && wt(r, e, t);
    }
  }
  once(e, t) {
    let s = (r, o) => {
      this.removeListener(r, s), t(r, o);
    };
    this.on(e, s);
  }
  on(e, t) {
    return this.addListener(e, t);
  }
};
function wt(n, e, t) {
  if (gs(n)) n.slice().forEach((s) => wt(s, e, t));
  else
    switch (t.length) {
      case 0:
        n(e);
        break;
      case 1:
        n(e, t[0]);
        break;
      case 2:
        n(e, t[0], t[1]);
        break;
      default:
        n.call(null, e, ...t);
    }
}
var hr = { applyUpdates: !1, applyInserts: !1, interval: 500 };
function ms(n) {
  if (n) {
    let e = { IDX: 0, KEY: 1 };
    for (let t = 0; t < n.length; t++) e[n[t].name] = t + 2;
    return e;
  } else return null;
}
var Z = class extends de {
  constructor(e) {
    super();
    let {
      name: t,
      columns: s = null,
      primaryKey: r,
      dataPath: o,
      data: i,
      updates: l = {},
    } = e;
    (this.name = t),
      (this.primaryKey = r),
      (this.columns = s),
      (this.keys = {}),
      (this.index = {}),
      (this.indices = []),
      (this.rows = []),
      (this.updateConfig = { ...hr, ...l }),
      (this.inputColumnMap = void 0),
      (this.columnMap = ms(s)),
      (this.columnCount = 0),
      (this.status = null),
      i ? this.load(i) : o && this.fetchData(o),
      this.installDataGenerators(e);
  }
  update(e, ...t) {
    let s = [],
      r = this.rows[e];
    for (let o = 0; o < t.length; o += 2) {
      let i = t[o],
        l = t[o + 1];
      s.push(i, r[i], l), (r[i] = l);
    }
    this.emit("rowUpdated", e, s);
  }
  bulkUpdate(e, t) {
    let s = [];
    for (let r of e) {
      let [o] = r,
        i = this.rows[o],
        l = [o];
      for (let a = 1; a < r.length; a += 2) {
        let u = r[a],
          c = r[a + 1];
        l.push(u, i[u], c), (i[u] = c);
      }
      s.push(l);
    }
    this.emit("rowsUpdated", s, t);
  }
  insert(e) {
    let t = this.columns ? this.columns.map((o) => o.name) : null,
      s = this.rows.length,
      r = this.rowFromData(s, e, t);
    this.rows.push(r), this.emit("rowInserted", s, r);
  }
  remove(e) {
    if (this.keys[e]) {
      let t = this.indices[e];
      delete this.keys[e], delete this.indices[e], this.rows.splice(t, 1);
      for (let s in this.indices) this.indices[s] > t && (this.indices[s] -= 1);
      this.emit("rowRemoved", this.name, e);
    }
  }
  clear() {}
  toString() {
    let e = [
      `
` + this.name,
    ];
    return (
      e.splice.apply(
        e,
        [1, 0].concat(
          this.rows.map(function (t) {
            return t.toString();
          })
        )
      ),
      e.join(`
`)
    );
  }
  async fetchData(e) {
    fetch(e, {})
      .then((t) => t.json())
      .then((t) => {
        console.log(`Table.loadData: got ${t.length} rows`), this.load(t);
      })
      .catch((t) => {
        console.error(t);
      });
  }
  load(e) {
    let t = this.columns ? this.columns.map((r) => r.name) : null,
      s = [];
    for (let r = 0; r < e.length; r++) {
      let o = this.rowFromData(r, e[r], t);
      s.push(o);
    }
    (this.rows = s),
      this.columns === null &&
        ((this.columns = pr(this.inputColumnMap)),
        (this.columnMap = ms(this.columns))),
      (this.status = "ready"),
      this.emit("ready"),
      this.updateConfig &&
        this.updateConfig.applyUpdates !== !1 &&
        setTimeout(() => {
          this.applyUpdates();
        }, 1e3),
      this.updateConfig &&
        this.updateConfig.applyInserts !== !1 &&
        setTimeout(() => {
          this.applyInserts();
        }, 1e4);
  }
  rowFromData(e, t, s) {
    let { index: r, primaryKey: o = null, columnMap: i } = this;
    if (Array.isArray(t)) {
      let l = t[i[this.primaryKey] - 2];
      return (r[l] = e), [e, l, ...t];
    } else {
      let l = i || (this.columnMap = { IDX: 0, KEY: 1 }),
        a = s || Object.getOwnPropertyNames(t),
        u = [e],
        c;
      for (let f = 0; f < a.length; f++) {
        let h = a[f],
          p = t[h];
        (c = l[h]) === void 0 && (c = l[h] = 2 + this.columnCount++),
          (u[c] = p),
          (h === o || (o === null && f === 0)) && ((r[p] = e), (u[i.KEY] = p));
      }
      return u;
    }
  }
  applyInserts() {
    let e = this.rows.length,
      t = this.createRow(e);
    t ? this.insert(t) : console.log("createRow did not return a new row"),
      setTimeout(
        () => this.applyInserts(),
        this.updateConfig.insertInterval | 100
      );
  }
  applyUpdates() {
    let { rows: e, columnMap: t } = this,
      s = 100;
    for (let r = 0; r < s; r++) {
      let o = fr(e.length - 1),
        i = this.updateRow(o, e[o], t);
      i && this.update(o, ...i);
    }
    setTimeout(() => this.applyUpdates(), this.updateConfig.interval);
  }
  createRow(e) {
    return console.warn(`createRow ${e} must be implemented as a plugin`), null;
  }
  updateRow() {
    return null;
  }
  async installDataGenerators() {}
};
function fr(n) {
  return Math.floor(Math.random() * Math.floor(n));
}
function pr(n) {
  return Object.getOwnPropertyNames(n)
    .map((t) => ({ name: t, key: n[t] }))
    .sort(dr)
    .map(({ name: t }) => ({ name: t }));
}
function dr(n, e) {
  return n.key - e.key;
}
var gr = "checkbox",
  mr = "single-row",
  wr = "multiple-row",
  Et = { Checkbox: gr, SingleRow: mr, MultipleRow: wr },
  { Checkbox: Er, SingleRow: Rr, MultipleRow: Sr } = Et,
  V = [];
var Le = class {
  constructor(e = Sr) {
    this.modelType = e;
  }
  select({ rows: e, lastTouchIdx: t }, s, r, o) {
    let i, l;
    return (
      this.modelType === Rr
        ? (([e, i, l] = this.handleRegularSelection(e, s)), (t = s))
        : r
        ? ([e, i, l] = this.handleRangeSelection(e, t, s))
        : o || this.modelType === Er
        ? (([e, i, l] = this.handleIncrementalSelection(e, s)), (t = s))
        : (([e, i, l] = this.handleRegularSelection(e, s)), (t = s)),
      { focusedIdx: s, lastTouchIdx: t, rows: e, selected: i, deselected: l }
    );
  }
  handleRegularSelection(e, t) {
    if (e.indexOf(t) === -1) {
      let r = [t];
      return [r, r, e];
    } else return e.length === 1 ? [V, V, e] : [V, V, Es(e, t)];
  }
  handleIncrementalSelection(e, t) {
    let s = e.indexOf(t),
      r = e.length,
      o = [t];
    return s === -1
      ? r === 0
        ? [o, o, V]
        : [_r(e, t), o, V]
      : r === 1
      ? [V, V, e]
      : [Es(e, t), V, o];
  }
  handleRangeSelection(e, t, s) {
    let r = e.indexOf(s),
      o = e.length;
    if (r === -1)
      if (o === 0) {
        let i = ws(0, s);
        return [i, i, V];
      } else if (o === 1) {
        let i = ws(e[0], s);
        return (e = e[0] < s ? i.slice(1) : i.slice(0, -1)), [i, e, V];
      } else {
        let i = yr(e, t, s);
        return [i, i.filter((l) => !e.includes(l)), V];
      }
  }
};
function yr(n, e, t) {
  e > t && ([e, t] = [t, e]);
  let s = Cr(n),
    r = new Rt(e, t),
    o = !1,
    i = [];
  for (let l = 0; l < s.length; l++) {
    let a = s[l];
    if (a.overlaps(r)) {
      if (!o) {
        for (let u = r.start; u <= r.end; u++) i.push(u);
        o = !0;
      }
    } else if (a.start < r.start)
      for (let u = a.start; u <= a.end; u++) i.push(u);
    else {
      for (let u = r.start; u <= r.end; u++) i.push(u);
      o = !0;
      for (let u = a.start; u <= a.end; u++) i.push(u);
    }
  }
  if (!o) for (let l = r.start; l <= r.end; l++) i.push(l);
  return i;
}
function Cr(n) {
  let e = [],
    t;
  for (let s = 0; s < n.length; s++)
    t && t.touches(n[s]) ? t.extend(n[s]) : e.push((t = new Rt(n[s])));
  return e;
}
var Rt = class {
  constructor(e, t = e) {
    (this.start = e), (this.end = t);
  }
  extend(e) {
    e >= this.start && e > this.end && (this.end = e);
  }
  touches(e) {
    return this.end === e - 1;
  }
  overlaps(e) {
    return !(this.end < e.start || this.start > e.end);
  }
  contains(e) {
    return this.start <= e && this.end >= e;
  }
  toString() {
    return `[${this.start}:${this.end}]`;
  }
};
function ws(n, e) {
  n > e && ([n, e] = [e, n]);
  let t = [];
  for (let s = n; s <= e; s++) t.push(s);
  return t;
}
function Es(n, e) {
  let t = [];
  for (let s = 0; s < n.length; s++) e !== n[s] && t.push(n[s]);
  return t;
}
function _r(n, e) {
  let t = [];
  for (let s = 0; s < n.length; s++)
    e !== null && e < n[s] && (t.push(e), (e = null)), t.push(n[s]);
  return e !== null && t.push(e), t;
}
var xr = ["Enter", "Delete"],
  Tr = [
    "Home",
    "End",
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "Tab",
  ],
  br = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ],
  ei = xr
    .concat(Tr)
    .concat(br)
    .reduce((n, e) => ((n[e] = !0), n), {});
function Rs(n) {
  let e = Array(n);
  for (let t = 0; t < n; t++) e[t] = t;
  return e;
}
var F = {
    ROW_DATA: "rowData",
    FILTER_DATA: "filterData",
    FILTER_BINS: "filterBins",
  },
  ee = "asc",
  ge = "dsc";
var Ir = "asc";
function O(n, e, t = 0) {
  return n.map((s) => {
    if (typeof s == "string") return [e[s] + t, "asc"];
    if (Array.isArray(s)) {
      let [r, o] = s;
      return [e[r] + t, o || Ir];
    } else throw Error("columnUtils.mapSortCriteria invalid input");
  });
}
function De(n) {
  let e = [],
    t = y.count - 2;
  for (let s = 0; s < n.length; s += 3)
    (e[s] = n[s] + t), (e[s + 1] = n[s + 1]), (e[s + 2] = n[s + 2]);
  return e;
}
function Ss(n, e) {
  let t = e.length,
    {
      IDX: s,
      RENDER_IDX: r,
      DEPTH: o,
      COUNT: i,
      KEY: l,
      SELECTED: a,
      count: u,
    } = y;
  return (c, f, h = []) =>
    (p, d) => {
      let m = p[s],
        g = [];
      for (let w = 0; w < t; w++) {
        let E = n[e[w].name];
        g[u + w] = p[E];
      }
      return (
        (g[s] = c + d + f),
        (g[r] = 0),
        (g[o] = 0),
        (g[i] = 0),
        (g[l] = p[n.KEY]),
        (g[a] = h.includes(m) ? 1 : 0),
        g
      );
    };
}
function ys(n) {
  return n.filter || vr(n);
}
var vr = (n) => {
  switch (Ar(n)) {
    case "number":
      return "number";
    default:
      return "set";
  }
};
function Ar({ type: n = null }) {
  if (n === null) return "set";
  if (typeof n == "string") return n;
  switch (n.name) {
    case "price":
      return "number";
    default:
      return n.name;
  }
}
var y = {
  IDX: 0,
  RENDER_IDX: 1,
  IS_LEAF: 2,
  IS_EXPANDED: 3,
  DEPTH: 4,
  COUNT: 5,
  KEY: 6,
  SELECTED: 7,
  count: 8,
  PARENT_IDX: "parent_idx",
  IDX_POINTER: "idx_pointer",
  FILTER_COUNT: "filter_count",
  NEXT_FILTER_IDX: "next_filter_idx",
};
function $(
  { from: n, to: e, lo: t = n, hi: s = e },
  r = 0,
  o = Number.MAX_SAFE_INTEGER
) {
  if (r === 0) return { from: t, to: Math.min(s, o) };
  if (t === 0) return { from: t, to: Math.min(s + r, o) };
  {
    let i = s - t,
      l = Math.round(r / 2),
      a = t - l < 0,
      u = o - (s + l) < 0;
    return a && u
      ? { from: 0, to: o }
      : a
      ? { from: 0, to: i + r }
      : u
      ? { from: Math.max(0, o - (i + r)), to: o }
      : { from: t - l, to: s + l };
  }
}
function me({ lo: n, hi: e, bufferSize: t = 0 }) {
  return { lo: 0, hi: e - n, bufferSize: t, reset: !0 };
}
var te = class {
  constructor(e, t) {
    (this.from = e), (this.to = t);
  }
  isWithin(e) {
    return e >= this.from && e < this.to;
  }
  overlap(e, t) {
    return e >= this.to || t < this.from
      ? [0, 0]
      : [Math.max(e, this.from), Math.min(t, this.to)];
  }
  copy() {
    return new te(this.from, this.to);
  }
};
function St(n, e, t) {
  for (let s = 0, r = n.length; s < r; s++) e[n[s][t]] = s;
  return e;
}
function Cs(n) {
  return n.length === 0 || Array.isArray(n[0]) ? n : n.map((e) => [e, null]);
}
function _s(n, e, t, s) {
  Nr(n, e, t, s);
}
function xs(n, e, t, s) {
  let r = O(t, s),
    o = r.length;
  (o === 1 ? Mr : o === 2 ? Pr : o === 3 ? Lr : Dr)(n, e, r);
}
function Nr(n, e, t, s) {
  let r = n.length,
    o = O(t, s),
    [i] = o[1];
  for (let l = 0; l < r; l++) n[l][2] = e[n[l][0]][i];
  n.sort((l, a) =>
    l[1] > a[1] ? 1 : a[1] > l[1] ? -1 : l[2] > a[2] ? 1 : a[2] > l[2] ? -1 : 0
  );
}
function Mr(n, e, [[t, s]]) {
  let r = n.length;
  for (let o = 0; o < r; o++) {
    let i = n[o][0];
    n[o][1] = e[i][t];
  }
  s === ee
    ? n.sort((o, i) => (o[1] > i[1] ? 1 : i[1] > o[1] ? -1 : 0))
    : n.sort((o, i) => (o[1] > i[1] ? -1 : i[1] > o[1] ? 1 : 0));
}
function Pr(n, e, t) {
  let s = e.length,
    [r] = t[0],
    [o] = t[1];
  for (let i = 0; i < s; i++)
    (n[i][0] = i), (n[i][1] = e[i][r]), (n[i][2] = e[i][o]);
  n.sort((i, l) =>
    i[1] > l[1] ? 1 : l[1] > i[1] ? -1 : i[2] > l[2] ? 1 : l[2] > i[2] ? -1 : 0
  );
}
function Lr() {}
function Dr() {}
function Ts(n, e, t = n.length) {
  if (n && e && n.length > 0 && e.length === t) {
    for (let s = 0; s < t; s++) {
      let [r, o = ee] = n[s],
        [i, l = ee] = e[s];
      if (r !== i || o === l) return !1;
    }
    return !0;
  } else return !1;
}
function bs(n, e, [t, s]) {
  if (n === e) return 0;
  {
    let r = s === ge ? e[t] : n[t],
      o = s === ge ? n[t] : e[t];
    if (o === null || r > o) return 1;
    if (r == null || r < o) return -1;
  }
}
function Fr(n, e, [t, s]) {
  if (n === e) return 0;
  {
    let r = s === ge ? e[t] : n[t],
      o = s === ge ? n[t] : e[t];
    if (o === null || r > o) return 1;
    if (r == null || r < o) return -1;
  }
}
function Y(n, e = Fr) {
  return function (t, s) {
    for (let r = 0, o = 0, i = n.length; r < i; r++)
      if ((o = e(t, s, n[r]))) return o;
    return 0;
  };
}
function se(n, e, t, s = "last-available") {
  function r(i) {
    let l = n.length,
      a = (u) => e(n[u], t) === 0;
    if (s === "last-available") for (; i < l && a(i); ) i += 1;
    else if (s === "first-available") for (; i > 0 && a(i - 1); ) i -= 1;
    return i;
  }
  function o(i, l) {
    let a = i + Math.floor((l - i) / 2),
      u = e(n[a], t);
    return i === a ? r(u >= 0 ? i : l) : (u >= 0 ? (l = a) : (i = a), o(i, l));
  }
  return n.length === 0 ? 0 : o(0, n.length);
}
var {
    IDX: we,
    RENDER_IDX: Or,
    IS_LEAF: Is,
    IS_EXPANDED: Ur,
    DEPTH: W,
    COUNT: Fe,
    KEY: vs,
    SELECTED: kr,
    PARENT_IDX: Oe,
    IDX_POINTER: Ee,
    FILTER_COUNT: Ue,
    NEXT_FILTER_IDX: As,
    count: U,
  } = y,
  Vr = { startIdx: 0, rootIdx: null, baseGroupby: [] },
  ke = "|";
function Ns(n, e = null) {
  if (e !== null)
    for (let t = 0; t < e.length; t++) {
      let [s, , r] = e[t];
      if (s === n || r === n) return t;
    }
  return -1;
}
function yt(n, e, t, s, r) {
  let o = Number.MAX_SAFE_INTEGER;
  for (let i = s; i < n.length; i++) {
    let l = n[i],
      a = l[t];
    if (a < r) break;
    if (a === r) {
      let u = l[e];
      typeof u == "number" && u < o && (o = u);
    }
  }
  return o === Number.MAX_SAFE_INTEGER ? void 0 : o;
}
function K(n, e, t) {
  return typeof n[e] == "number" ? n[e] : n[t];
}
var Ct = class {
    constructor(e) {
      this.levels = Array(e)
        .fill(0)
        .reduce(
          (t, s, r) => ((t[r + 1] = { key: null, pos: null, pPos: null }), t),
          {}
        );
    }
    set(e, t, s) {
      if (this.levels) {
        let r = this.levels[Math.abs(e)];
        r &&
          r.key !== s &&
          (r.key !== null && (r.pPos = r.pos), (r.key = s), (r.pos = t));
      }
    }
    hasParentPos(e) {
      return this.levels[e + 1] && this.levels[e + 1].pos !== null;
    }
    parentPos(e) {
      return this.levels[e + 1].pos;
    }
    hasPreviousPos(e) {
      return this.levels[e] && this.levels[e].pPos !== null;
    }
    previousPos(e) {
      return this.levels[e].pPos;
    }
  },
  Ve = class {
    constructor(e) {
      (this.idxAdjustment = 0),
        (this.maxLevel = e + 1),
        (this.levels =
          e > 0
            ? Array(e)
                .fill(0)
                .reduce(
                  (t, s, r) => (
                    (t[r + 2] = { key: null, current: 0, previous: 0 }), t
                  ),
                  {}
                )
            : null);
    }
    increment(e) {
      if (((this.idxAdjustment += e), this.levels))
        for (let t = 2; t < this.maxLevel + 1; t++) this.levels[t].current += e;
    }
    previous(e) {
      return (this.levels && this.levels[e] && this.levels[e].previous) || 0;
    }
    hasPrevious(e) {
      return this.previous(e) > 0;
    }
    get(e) {
      return this.levels === null ? null : this.levels[e];
    }
    set(e, t) {
      if (this.levels) {
        let s = this.levels[e];
        s &&
          s.key !== t &&
          (s.key !== null && ((s.previous += s.current), (s.current = 0)),
          (s.key = t));
      }
    }
  },
  Gr = (n) => !isNaN(parseInt(n, 10)),
  Br = (n, e) => parseInt(n) - parseInt(e);
function jr(n) {
  let e = Object.keys(n);
  return e.every(Gr) ? e.sort(Br) : e.sort();
}
function Ms(n, e, t = 0, s = null, r, o) {
  let i = jr(n),
    l = s !== null,
    a = l ? s.slice(r, o) : null;
  for (let u = 0; u < i.length; u++) {
    let c = n[i[u]];
    if (Array.isArray(c))
      for (let f = 0, h = c.length; f < h; f++) {
        let p = c[f];
        (e[t] = p), (t += 1), l && a.includes(p) && ((s[r] = p), (r += 1));
      }
    else t = Ms(c, e, t);
  }
  return t;
}
function Re(n, e, t, s, r, o = Vr) {
  let {
      startIdx: i = 0,
      length: l = n.length,
      rootIdx: a = null,
      baseGroupby: u = [],
      groups: c = [],
      rowParents: f = null,
      filterLength: h,
      filterSet: p,
      filterFn: d,
    } = o,
    { depth: m = 1, groupIdx: g = -1, filterIdx: w } = o,
    E = xt(t, s, r),
    b = zr(e, n, r, i, l);
  Ms(b, e, i, p, w, h);
  let x = r.length,
    T = x + u.length,
    _ = Array(x).fill(null),
    S = a,
    C = 0;
  for (let R = i, v = i + l; R < v; R++) {
    let I = e[R],
      L = n[I];
    for (let P = 0; P < x; P++) {
      let [X] = r[P],
        A = _[P],
        ue = L[X];
      if (A === null || A[U + X - 2] !== ue) {
        if (A !== null) {
          for (let M = x - 1; M >= P; M--) {
            let N = _[M];
            Tt(N, c, e, n, E, T, C, d),
              p &&
                Math.abs(N[W]) === 1 &&
                N[Ue] > 0 &&
                ((N[As] = w), (w += N[Ue]));
          }
          C = 0;
        }
        for (let M = P; M < x; M++) {
          (g += 1), (S = M === 0 ? a : _[M - 1][we]);
          let N = m + M,
            z = N === T ? R : g + 1,
            Q = (_[M] = Kr(L, N, g, z, S, r, t, s, u));
          c.push(Q);
        }
        break;
      }
    }
    f && (f[I] = g), (C += 1);
  }
  for (let R = x - 1; R >= 0; R--)
    if (_[R] !== null) {
      let v = _[R];
      Tt(v, c, e, n, E, T, C, d),
        p && Math.abs(v[W]) === 1 && v[Ue] > 0 && (v[As] = w);
    }
  return c;
}
function Ge(n, e) {
  return n.length > e.length && e.every((t, s) => t[0] === n[s][0]);
}
function Ps(n, e) {
  return (
    e.length > n.length &&
    n[0][0] === e[0][0] &&
    n.every(([t]) => e.find(([s]) => s === t))
  );
}
function Ls(n, e) {
  let [t] = _t(n, e);
  return t !== null;
}
function Ds(n, e) {
  return e.reduce(
    (t, [s], r) => (n.some((o) => o[0] === s) || t.push(r + 1), t),
    []
  );
}
function _t(n, e) {
  let t = [null],
    s = n && n.length,
    r = e && e.length;
  if (s && r && s === r)
    for (let o = 0; o < s; o++) {
      if (n[o][0] !== e[o][0]) return t;
      n[o][1] !== e[o][1] && ((t[0] = o), (t[1] = s - o));
    }
  return t;
}
function Wr([n], [e]) {
  return n > e ? 1 : e > n ? -1 : 0;
}
var qr = {};
function Be(n, e = null, t = "", s = 0) {
  let r = [];
  return (
    Object.entries(n).forEach(([i, l]) => {
      if (l && (e === null || !e[i])) {
        if (
          (r.push([t + i, s, !0]),
          l !== null && typeof l == "object" && Object.keys(l).length > 0)
        ) {
          let a = Be(l, qr, t + i + "/", s + 1);
          a.length && r.push(...a);
        }
      } else if (l) {
        let a = Be(l, e[i], t + i + "/", s + 1);
        a.length && r.push(...a);
      }
    }),
    e !== null &&
      typeof e == "object" &&
      Object.entries(e).forEach(([i, l]) => {
        l && !n[i] && r.push([t + i, s, !1]);
      }),
    r.sort(Wr)
  );
}
function Fs(n, e) {
  do {
    if (e[W] < 0) return !1;
    e = n[e[Oe]];
  } while (e);
  return !0;
}
function Os(n, e, t = 1) {
  for (let s = 0; s < n.length; s++)
    if (n[s][we] >= e) {
      (n[s][we] += t), Math.abs(n[s][W]) > 1 && (n[s][Ee] += t);
      let r = n[s][Oe];
      r !== null && r >= e && (n[s][Oe] += t);
    }
}
function Us(n, e, t = 1) {
  for (let s = 0; s < n.length; s++)
    Math.abs(n[s][W]) === 1 && n[s][Ee] >= e && (n[s][Ee] += t);
}
function ks(n, e, t) {
  let s = [];
  e: for (let r = 0; r < e.length; r++) {
    let o = Y(e.slice(0, r + 1), bs),
      i = se(n, o, t, "first-available"),
      l = n[i];
    if (l === void 0) break;
    for (let a = 0; a < e.length; a++) {
      let u = e[a][0],
        c = l[u];
      if (a > r) {
        if (c !== null) break e;
      } else if (c !== t[u]) break e;
    }
    s.push(i);
  }
  return s;
}
var Vs = (n, e, t) => {
  let s = e.slice();
  return (
    (s[t.IDX] = 0),
    (s[t.DEPTH] = 0),
    (s[t.COUNT] = 0),
    (s[t.KEY] = Xr(n, e)),
    (s[t.SELECTED] = 0),
    s
  );
};
function Xr(n, e) {
  let t = ([s]) => e[s];
  return n.map(t).join("/");
}
function Kr(n, e, t, s, r, o, i, l, a = []) {
  let u = Array(U + i.length),
    c = e - 1,
    f;
  for (let w = 0; w < i.length; w++) {
    let E = i[w],
      b = l[E.name],
      x = U + w;
    E.aggregate
      ? (u[x] = 0)
      : (f = Ns(b, o)) !== -1 && f <= c
      ? (u[x] = n[b])
      : (u[x] = null);
  }
  for (let w = 0; w < a.length; w++) {
    let [E] = a[w];
    u[U + E - 2] = n[E];
  }
  let h = ([w]) => n[w],
    p = (w) => w.map(h).join(ke),
    d = "$root" + ke,
    m = a.length > 0 ? d + p(a) + ke : d,
    g = p(o.slice(0, c + 1));
  return (
    (u[we] = t),
    (u[Or] = 0),
    (u[Is] = !1),
    (u[Ur] = !1),
    (u[W] = e),
    (u[Fe] = 0),
    (u[vs] = m + g),
    (u[kr] = 0),
    (u[Oe] = r),
    (u[Ee] = s),
    u
  );
}
function zr(n, e, t, s = 0, r = n.length) {
  let o = {},
    i = t.length,
    l = i - 1;
  for (let a = s, u = s + r; a < u; a++) {
    let c = n[a],
      f = e[c],
      h = o,
      p,
      d;
    for (let m = 0; m < i; m++) {
      let [g] = t[m];
      (d = f[g]),
        (p = h[d]),
        p && m === l
          ? p.push(c)
          : p
          ? (h = p)
          : !p && m < l
          ? (h = h[d] = {})
          : p || (h[d] = [c]);
    }
  }
  return o;
}
function Gs(n, e) {
  let t = n.length,
    s = e === t,
    r = e - 1,
    o = [],
    i = [];
  return (
    n.forEach((l, a) => {
      a < r ? o.push(l) : a > r && i.push(l);
    }),
    [s, o, i]
  );
}
function xt(n, e, t) {
  return n.reduce((s, r) => {
    if (r.aggregate && Ns(r.name, t) === -1) {
      let o = e[r.name];
      s.push([o, r.aggregate]);
    }
    return s;
  }, []);
}
function Bs(n, e, t, s, r, o, i) {
  let a = n[e][W],
    u = Math.abs(a),
    c = 0,
    f = e;
  for (; f < n.length - 1 && Math.abs(n[f + 1][W]) < u; ) (f += 1), (c += 1);
  for (let h = e + c; h >= e; h--) {
    for (let p = 0; p < o.length; p++) {
      let [d] = o[p],
        m = d + U - 2;
      n[h][m] = 0;
    }
    Tt(n[h], n, t, s, o, i, n[h][Fe]);
  }
}
function Tt(n, e, t, s, r, o, i, l = null) {
  let a = n[W],
    u = 0,
    c = l === null ? void 0 : 0;
  if (a === o) {
    let f = n[Ee],
      h = f + i;
    u = i;
    for (let p = f; p < h; p++) {
      let d = s[t[p]],
        m = l === null || l(d);
      if ((l && m && (c += 1), l === null || m))
        for (let g = 0; g < r.length; g++) {
          let [w] = r[g];
          n[U + w - 2] += d[w];
        }
    }
  } else {
    let f = e.indexOf(n) + 1;
    for (let h = f; h < e.length; h++) {
      let p = e[h],
        d = p[W],
        m = p[Fe],
        g = Math.abs(d);
      if (g >= a) break;
      if (g === a - 1) {
        for (let w = 0; w < r.length; w++) {
          let [E, b] = r[w];
          b === "avg"
            ? (n[U + E - 2] += p[U + E - 2] * m)
            : (n[U + E - 2] += p[U + E - 2]);
        }
        u += m;
      }
    }
  }
  for (let f = 0; f < r.length; f++) {
    let [h, p] = r[f];
    p === "avg" && (n[U + h - 2] = n[U + h - 2] / u);
  }
  (n[Fe] = u), (n[Ue] = c);
}
function le(n, [e, t, ...s]) {
  let r = Array(U).fill(0).concat(s);
  return (r[we] = e), (r[vs] = `${n}${ke}${t}`), (r[Is] = !0), r;
}
var J = { lo: 0, hi: 0 };
function je(n, e) {
  let { lo: t, hi: s } = n,
    { lo: r, hi: o } = e;
  return r >= t && o <= s
    ? { from: o, to: o }
    : r >= s || o < t
    ? { from: r, to: o }
    : r === t && o === s
    ? { from: s, to: s }
    : { from: r < t ? r : s, to: o > s ? o : t };
}
var js = 0,
  Se = 2,
  ye = 4,
  We = 8,
  qe = 16,
  Xe = 32,
  bt = 64,
  Ws = 128,
  B = {
    SAME: js,
    FWD: Se,
    BWD: ye,
    CONTIGUOUS: We,
    OVERLAP: qe,
    REDUCE: Xe,
    EXPAND: bt,
    NULL: Ws,
  };
B.GAP = ~(We | qe | Xe);
function qs(n, e) {
  return e.lo === 0 && e.hi === 0
    ? Ws
    : n.lo === e.lo && n.hi === e.hi
    ? js
    : e.hi > n.hi
    ? e.lo > n.hi
      ? Se
      : e.lo === n.hi
      ? Se + We
      : e.lo >= n.lo
      ? Se + qe
      : bt
    : e.lo < n.lo
    ? e.hi < n.lo
      ? ye
      : e.hi === n.lo
      ? ye + We
      : e.hi > n.lo
      ? ye + qe
      : bt
    : e.lo > n.lo
    ? Xe + Se
    : Xe + ye;
}
var Hr = 1,
  $r = { filter: null },
  Ce = class {
    constructor(e, t = 0, s = J) {
      (this.table = e),
        (this.offset = t),
        (this.baseOffset = t),
        (this.range = s),
        (this.currentFilter = null),
        (this.filterSet = null),
        (this.sortSet = void 0),
        (this.data = e.rows),
        (this.type = void 0),
        (this.index = void 0),
        (this.selectedRowsIDX = []);
    }
    get size() {
      return console.error("size must be implemented by concrete Rowset"), 0;
    }
    slice() {
      throw new Error("slice must be implemented by concrete Rowset");
    }
    get filteredData() {
      if (this.filterSet) return this.filterSet;
      {
        let { IDX: e } = y;
        return this.data.map((t) => t[e]);
      }
    }
    get stats() {
      let { totalRowCount: e, filteredRowCount: t, selectedRowsIDX: s } = this,
        r = s.length;
      return {
        totalRowCount: e,
        totalSelected: r,
        filteredRowCount: t,
        filteredSelected: 0,
      };
    }
    get totalRowCount() {
      return this.data.length;
    }
    get filteredRowCount() {
      return this.filterSet === null ? this.data.length : this.filterSet.length;
    }
    get selectedRowCount() {
      return this.selectedRowsIDX.length;
    }
    setRange(e = this.range, t = !0, s = !1) {
      let { from: r, to: o } = t ? je(this.range, e) : $(e),
        i = this.slice(r, o);
      this.range = e;
      let l = this.size;
      return {
        dataType: this.type,
        rows: i,
        range: e,
        size: l,
        offset: this.offset,
        stats: s ? this.stats : void 0,
      };
    }
    currentRange() {
      let { lo: e, hi: t } = this.range,
        s = this.slice(e, t);
      return {
        dataType: this.type,
        rows: s,
        range: this.range,
        size: this.size,
        offset: this.offset,
        stats: void 0,
      };
    }
    select(e) {
      let {
        range: { lo: t, hi: s },
        filterSet: r,
        sortSet: o,
      } = this;
      console.log({ lo: t, hi: s, sortSet: o, filterSet: r });
      let i = (l) => o[l][0];
      return (this.selectedRowsIDX = e.map(i)), this.currentRange();
    }
    selectAll() {
      let {
          data: e,
          selected: t,
          selectedRowsIDX: s,
          range: { lo: r, hi: o },
          filterSet: i,
          offset: l,
        } = this,
        { SELECTED: a } = y,
        u = [...this.selected.rows];
      if (i)
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          s.includes(p) || (t.rows.push(h), s.push(p));
        }
      else
        (this.selected = {
          rows: Rs(e.length),
          focusedIdx: -1,
          lastTouchIdx: -1,
        }),
          (this.selectedRowsIDX = [...this.selected.rows]);
      let c = [],
        f = Math.min(o, (i || e).length);
      for (let h = r; h < f; h++)
        this.selected.rows.includes(h) &&
          !u.includes(h) &&
          c.push([h + l, a, 1]);
      return c;
    }
    selectNone() {
      let {
          range: { lo: e, hi: t },
          filterSet: s,
          offset: r,
        } = this,
        { SELECTED: o } = y,
        i = this.selectedRowsIDX;
      s
        ? ((this.selected = { rows: [], focusedIdx: -1, lastTouchIdx: -1 }),
          (this.selectedRowsIDX = this.selectedRowsIDX.filter(
            (a) => !s.includes(a)
          )))
        : ((this.selected = { rows: [], focusedIdx: -1, lastTouchIdx: -1 }),
          (this.selectedRowsIDX = []));
      let l = [];
      for (let a = e; a < t; a++) {
        let u = s ? s[a] : a;
        i.includes(u) && l.push([a + r, o, 0]);
      }
      return l;
    }
    selectNavigationSet(e) {
      let { COUNT: t, IDX_POINTER: s, FILTER_COUNT: r, NEXT_FILTER_IDX: o } = y;
      return e ? [this.filterSet, o, r] : [this.sortSet, s, t];
    }
    getBinnedValuesForColumn(e) {
      let t = this.table.columnMap[e.name],
        { data: s, filteredData: r } = this,
        o = r.map((u) => s[u][t]),
        i = Pe()
          .thresholds(20)(o)
          .map((u, c) => [c + 1, u.length, u.x0, u.x1]),
        l = new Z({ data: i, primaryKey: "bin", columns: ut });
      return new vt(l, ut, e.name);
    }
    getDistinctValuesForColumn(e) {
      let { data: t, currentFilter: s } = this,
        r = this.table.columnMap[e.name],
        o = {},
        i = [],
        l = t.length,
        [, a] = es(s, e),
        u = 0;
      if (a === null) {
        let f;
        for (let h = 0; h < l; h++) {
          let p = t[h][r];
          (f = o[p])
            ? (f[2] = ++f[1])
            : ((f = [p, 1, 1]), (o[p] = f), i.push(f));
        }
        u = l;
      } else {
        let f = k(this.table.columnMap, a),
          h;
        for (let p = 0; p < l; p++) {
          let d = t[p],
            m = d[r],
            g = f(d) ? 1 : 0;
          (h = o[m])
            ? ((h[1] += g), h[2]++)
            : ((h = [m, g, 1]), (o[m] = h), i.push(h)),
            (u += g);
        }
      }
      let c = new Z({ data: i, primaryKey: "name", columns: at });
      return new It(c, at, e.name, u, l);
    }
  },
  j = class extends Ce {
    static fromGroupRowSet({
      table: e,
      columns: t,
      offset: s,
      currentFilter: r,
    }) {
      return new j(e, t, s, { filter: r });
    }
    constructor(e, t, s = 0, { filter: r = null } = $r) {
      super(e, s);
      (this.type = "rowData"),
        (this.project = Ss(e.columnMap, t)),
        (this.sortCols = null),
        (this.sortReverse = !1),
        (this.sortSet = this.buildSortSet()),
        (this.filterSet = null),
        (this.sortRequired = !1),
        r && ((this.currentFilter = r), this.filter(r));
    }
    buildSortSet() {
      let e = this.data.length,
        t = Array(e);
      for (let s = 0; s < e; s++) t[s] = [s, null, null];
      return t;
    }
    slice(e, t) {
      let {
        data: s,
        selectedRowsIDX: r,
        filterSet: o,
        offset: i,
        sortCols: l,
        sortSet: a,
        sortReverse: u,
      } = this;
      if (o) {
        let c = typeof o[0] == "number" ? (h) => s[h] : ([h]) => s[h],
          f = [];
        for (let h = e, p = o.length; h < p && h < t; h++) {
          let d = c(u ? o[p - h - 1] : o[h]);
          f.push(d);
        }
        return f.map(this.project(e, i, r));
      } else if (l) {
        let c = [];
        for (let f = e, h = s.length; f < h && f < t; f++) {
          let p = u ? a[h - f - 1][0] : a[f][0],
            d = s[p];
          c.push(d);
        }
        return c.map(this.project(e, i, r));
      } else return this.data.slice(e, t).map(this.project(e, i, r));
    }
    get size() {
      return this.filterSet === null ? this.data.length : this.filterSet.length;
    }
    get first() {
      return this.data[0];
    }
    get last() {
      return this.data[this.data.length - 1];
    }
    get rawData() {
      return this.data;
    }
    setSubscribedColumns(e) {
      console.log(`Rowset setSubscribedColumns ${e.join(",")}`);
    }
    setStatus(e) {
      this.status = e;
    }
    addRows(e) {
      St(e, this.index, y.IDX), (this.data = this.data.concat(e));
    }
    sort(e) {
      let t =
        this.currentFilter === null
          ? this.sortSet
          : (this.filterSet = Cs(this.filterSet));
      (this.sortRequired = this.currentFilter !== null),
        Ts(this.sortCols, e, Hr)
          ? (this.sortReverse = !this.sortReverse)
          : this.sortCols !== null && Ge(e, this.sortCols)
          ? ((this.sortReverse = !1), _s(t, this.data, e, this.table.columnMap))
          : ((this.sortReverse = !1),
            xs(t, this.data, e, this.table.columnMap)),
        (this.sortCols = e);
    }
    clearFilter() {
      (this.currentFilter = null),
        (this.filterSet = null),
        this.sortRequired && this.sort(this.sortCols);
    }
    filter(e) {
      let t = Ie(this.currentFilter, e),
        s = e && k(this.table.columnMap, e),
        { data: r } = this,
        [o] = this.selectNavigationSet(t && this.filterSet),
        i = [];
      for (let l = 0; l < o.length; l++) {
        let a = o === this.filterSet ? o[l] : o[l][0],
          u = r[a];
        s(u) && i.push(a);
      }
      if (this.selectedRowsIDX.length) {
        let { selectedRowsIDX: l, selected: a } = this;
        a.rows.length = 0;
        for (let u = 0; u < i.length; u++) {
          let c = i[u];
          l.includes(c) && a.rows.push(u);
        }
      }
      return (
        (this.filterSet = i),
        (this.currentFilter = e),
        !t && this.sortRequired && this.sort(this.sortCols),
        i.length
      );
    }
    update(e, t) {
      if (this.currentFilter === null && this.sortCols === null) {
        if (e >= this.range.lo && e < this.range.hi)
          return [e + this.offset, ...De(t)];
      } else if (this.currentFilter === null) {
        let { sortSet: s } = this;
        for (let r = this.range.lo; r < this.range.hi; r++) {
          let [o] = s[r];
          if (o === e) return [r + this.offset, ...De(t)];
        }
      } else {
        let { filterSet: s } = this;
        for (let r = this.range.lo; r < this.range.hi; r++)
          if ((Array.isArray(s[r]) ? s[r][0] : s[r]) === e)
            return [r + this.offset, ...De(t)];
      }
    }
    insert(e, t) {
      if (this.sortCols === null && this.currentFilter === null)
        return (
          this.sortSet.push([e, null, null]),
          e >= this.range.hi
            ? { size: this.size }
            : { size: this.size, replace: !0 }
        );
      if (this.currentFilter === null) {
        let s = O(this.sortCols, this.table.columnMap),
          [[r]] = s,
          o = [e, t[r]],
          i = Y([[1, "asc"]]),
          l = se(this.sortSet, i, o, "last-available");
        this.sortSet.splice(l, 0, o);
        let a = this.sortReverse ? this.size - l : l;
        return a >= this.range.hi
          ? { size: this.size }
          : a >= this.range.lo
          ? { size: this.size, replace: !0 }
          : { size: this.size, offset: this.offset - 1 };
      } else if (this.sortCols === null)
        if (k(this.table.columnMap, this.currentFilter)(t)) {
          let r = this.filterSet.length;
          return (
            this.filterSet.push(e),
            r >= this.range.hi
              ? { size: this.size }
              : r >= this.range.lo
              ? { size: this.size, replace: !0 }
              : { size: this.size, offset: this.offset - 1 }
          );
        } else return {};
      else if (k(this.table.columnMap, this.currentFilter)(t)) {
        let r = O(this.sortCols, this.table.columnMap),
          [[o, i]] = r,
          l = [e, t[o]],
          a = Y([[1, i]]),
          u = se(this.filterSet, a, l, "last-available");
        return (
          this.filterSet.splice(u, 0, l),
          u >= this.range.hi
            ? { size: this.size }
            : u >= this.range.lo
            ? { size: this.size, replace: !0 }
            : { size: this.size, offset: this.offset - 1 }
        );
      } else return {};
    }
  },
  It = class extends j {
    constructor(e, t, s, r, o) {
      super(e, t);
      (this.type = F.FILTER_DATA),
        (this.columnName = s),
        (this._searchText = null),
        (this.dataRowFilter = null),
        (this.dataCounts = {
          dataRowTotal: o,
          dataRowAllFilters: r,
          dataRowCurrentFilter: 0,
          filterRowTotal: this.data.length,
          filterRowSelected: this.data.length,
          filterRowHidden: 0,
        }),
        this.sort([["name", "asc"]]);
    }
    createSelectionModel() {
      return new Le(Et.Checkbox);
    }
    clearRange() {
      this.range = { lo: 0, hi: 0 };
    }
    get values() {
      let e = this.table.columnMap.name;
      return this.filterSet.map((t) => this.data[t][e]);
    }
    getSelectedValue(e) {
      let { data: t, sortSet: s, filterSet: r } = this;
      if (r) {
        let o = r[e],
          i = typeof o == "number" ? o : o[0];
        return t[i][0];
      } else return s[e][1];
    }
    setSelectedFromFilter(e) {
      let t = ht(e, this.columnName),
        s = this.table.columnMap,
        { data: r, filterSet: o, sortSet: i } = this;
      if (((this.dataRowFilter = e), t)) {
        let l = k(s, ve(t, "name")),
          a = [],
          u = [];
        if (o)
          for (let c = 0; c < o.length; c++) {
            let f = o[c];
            l(r[f]) && (a.push(c), u.push(f));
          }
        else
          for (let c = 0; c < r.length; c++) {
            let f = i[c][0];
            l(r[f]) && (a.push(c), u.push(f));
          }
        (this.selected = { rows: a, focusedIdx: -1, lastTouchIdx: -1 }),
          (this.selectedRowsIDX = u);
      } else this.selectAll();
      return this.currentRange();
    }
  },
  vt = class extends j {
    constructor(e, t, s) {
      super(e, t);
      (this.type = F.FILTER_BINS), (this.columnName = s);
    }
    setSelectedFromFilter(e) {
      console.log("need to apply filter to selected BinRowset", e);
    }
    setRange() {
      let e = this.size;
      return {
        dataType: this.type,
        rows: this.data,
        range: null,
        size: e,
        offset: 0,
        stats: void 0,
      };
    }
  };
var G = 4,
  _e = [null, null, null],
  { IS_EXPANDED: Ke, DEPTH: ze, KEY: At, PARENT_IDX: Xs } = y,
  ne = 0,
  Nt = 1;
function Mt(n, e, t, s, r, o) {
  let i = 0,
    l = null,
    a = null,
    u = ne,
    c = J,
    f = [0, null, null],
    h = [],
    p = [null, null, null],
    d = e.length;
  return {
    get direction() {
      return u;
    },
    get rangePositions() {
      return h;
    },
    setRange: T,
    currentRange: x,
    getRangeIndexOfGroup: g,
    getRangeIndexOfRow: w,
    setNavSet: b,
    setGroupCount: m,
    refresh: x,
    clear: E,
  };
  function m(S) {
    d = S;
  }
  function g(S) {
    let C = h;
    for (let R = 0; R < C.length; R += G)
      if (C[R + 1] === S) return C[R + 2] === null ? R / G : -1;
    return -1;
  }
  function w(S) {
    let C = h;
    for (let R = 0; R < C.length; R += G) if (C[R + 3] === S) return R / G;
    return -1;
  }
  function E() {
    (i = 0),
      (l = null),
      (a = null),
      (u = ne),
      (c = J),
      (f = [0, null, null]),
      (h = []),
      (p = [null, null, null]);
  }
  function b([S, C, R]) {
    (t = S), (r = C), (o = R);
  }
  function x() {
    let S = [[], null],
      [C] = S,
      { IDX: R } = y;
    ([i, l, a] = f),
      i === 0 && l === null && a === null && (i = -1),
      (h.length = 0);
    let v = i,
      I,
      L = c.lo;
    do
      if (((u = ne), ([I, l, a] = re(n, d, s, l, a, t, r, o)), I)) {
        C.push(I), (i += 1);
        let P = a === null ? null : I[R];
        h.push(i, l, a, P), (L += 1);
      }
    while (I && L < c.hi);
    if (I) {
      u = ne;
      let [P, X] = [l, a];
      ([I, l, a] = re(n, d, s, l, a, t, r, o)),
        (i += 1),
        (p = [I ? i : null, l, a]),
        ([l, a] = [P, X]);
    } else p = [null, null, null];
    return (S[1] = v + 1), S;
  }
  function T(S, C = !0) {
    let R = qs(c, S),
      { from: v, to: I } = C ? je(c, S) : $(S),
      { IDX: L } = y,
      P = [[], null],
      [X] = P;
    if (R === B.NULL)
      return (f = [0, null, null]), (p = [null, null, null]), (h.length = 0), P;
    if (S.lo === c.lo && C === !1) ([i, l, a] = f), (h.length = 0);
    else {
      u === ne && R & B.BWD
        ? ([i, l, a] = h)
        : u === Nt && R & B.FWD && (([i, l, a] = h.slice(-G)), (i += 1)),
        R === B.FWD
          ? (_(S.lo - c.hi, re), (h.length = 0))
          : R === B.BWD && (_(c.lo - S.hi, Lt), (h.length = 0));
      let M = S.lo - c.lo,
        N = c.hi - S.hi,
        z = c.hi - c.lo - h.length / G;
      if (M > 0) {
        let Q = h.splice(0, M * G);
        Q.length && ((f = Q.slice(-G)), C === !1 && ([i, l, a] = f));
      }
      if (N > 0 && N > z) {
        let Q = N - z,
          Kt = h.splice(-Q * G, Q * G);
        Kt.length && (p = Kt.slice(0, G));
      }
    }
    let A,
      ue = null;
    if ((R & B.REDUCE) == 0)
      if (R & B.FWD || R === B.SAME) {
        let M = v;
        ue = i;
        do
          if (((u = ne), ([A, l, a] = re(n, d, s, l, a, t, r, o)), A)) {
            X.push(A);
            let N = a === null ? null : A[L];
            h.push(i, l, a, N), (M += 1), (i += 1);
          }
        while (A && M < I);
        if (A) {
          u = ne;
          let [N, z] = [l, a];
          ([A, l, a] = re(n, d, s, l, a, t, r, o)),
            (p = [A ? i : null, l, a]),
            ([l, a] = [N, z]);
        } else p = [null, null, null];
      } else {
        let M = I - 1;
        do
          if (((u = Nt), ([A, l, a] = Lt(n, d, s, l, a, t, r, o)), A)) {
            (i -= 1), X.unshift(A);
            let N = a === null ? null : A[L];
            h.unshift(i, l, a, N), (M -= 1);
          }
        while (A && M >= v);
        if (((ue = i), A)) {
          let [N, z] = [l, a];
          (u = Nt),
            ([A, l, a] = Lt(n, d, s, l, a, t, r, o)),
            (f = [A ? i - 1 : 0, l, a]),
            ([l, a] = [N, z]);
        } else f = [0, null, null];
      }
    else
      R & B.FWD
        ? (console.log("adjust thye idx"), ([i, l, a] = h.slice(-G)), (i += 1))
        : ([i, l, a] = h);
    return (c = S), (P[1] = ue), P;
  }
  function _(S, C) {
    let R = 0,
      v;
    do
      ([v, l, a] = C(n, d, s, l, a, t, r, o)),
        C === re ? (i += 1) : (i -= 1),
        (R += 1);
    while (v && R < S);
    C === re ? (f = [i - 1, l, a]) : (p = [i, l, a]);
  }
}
function Pt(n, e, t, s) {
  return t[n[s] + e];
}
function re(n, e, t, s, r, o, i, l) {
  if (s === null) {
    s = -1;
    do s += 1;
    while (s < n.length && K(n[s], l) === 0);
    return s >= n.length ? _e : [n[s], s, null];
  } else {
    if (s >= n.length) return _e;
    {
      let a = n[s],
        { [Ke]: u, [ze]: c, [At]: f } = a,
        h = K(a, l);
      if (c === e && u && h !== 0 && (r === null || r < h - 1)) {
        r = r === null ? 0 : r + 1;
        let p = Pt(a, r, o, i);
        return [le(f, t[p]), s, r === null ? 0 : r];
      } else if (u) {
        do s += 1;
        while (s < n.length && K(n[s], l) === 0);
        return s >= n.length ? _e : [n[s], s, null];
      } else {
        do s += 1;
        while (s < n.length && (n[s][ze] > c || K(n[s], l) === 0));
        return s >= n.length ? _e : [n[s], s, null];
      }
    }
  }
}
function Lt(n, e, t, s, r, o, i, l) {
  let a = n[s],
    { [ze]: u, [At]: c, [Ke]: f } = a;
  if (s !== null && u === e && typeof r == "number") {
    if (r === 0) return [a, s, null];
    {
      r -= 1;
      let h = Pt(a, r, o, i);
      return [le(c, t[h]), s, r];
    }
  } else {
    if (s === null) s = n.length - 1;
    else {
      if (s === 0) return _e;
      s -= 1;
    }
    let h = n[s];
    if ((({ [ze]: u, [At]: c, [Ke]: f } = h), u === e && f)) {
      r = K(h, l) - 1;
      let p = Pt(h, r, o, i);
      return [le(c, t[p]), s, r];
    }
    for (; h[Xs] !== null && n[h[Xs]][Ke] === !1; )
      (s = h[y.PARENT_IDX]), (h = n[s]);
    return [h, s, null];
  }
}
var Yr = [],
  xe = class extends Ce {
    constructor(e, t, s, r, o = null, i = e.currentFilter) {
      super(e.table, e.baseOffset, e.range);
      (this.columns = t),
        (this.groupby = s),
        (this.groupState = r),
        (this.aggregations = []),
        (this.currentLength = 0),
        (this.groupRows = []),
        (this.aggregatedColumn = {}),
        (this.collapseChildGroups = this.collapseChildGroups.bind(this)),
        (this.countChildGroups = this.countChildGroups.bind(this)),
        t.forEach((c) => {
          if (c.aggregate) {
            let f = e.table.columnMap[c.name];
            this.aggregations.push([f, c.aggregate]),
              (this.aggregatedColumn[f] = c.aggregate);
          }
        }),
        (this.expandedByDefault = !1),
        (this.sortCriteria = Array.isArray(o) && o.length ? o : null),
        (this.sortSet = e.data.map((c, f) => f)),
        (this.rowParents = Array(e.data.length)),
        this.applyGroupby(s);
      let [l, a, u] = this.selectNavigationSet(!1);
      (this.iter = Mt(this.groupRows, this.groupBy, l, this.data, a, u)),
        i && this.filter(i);
    }
    get length() {
      return this.currentLength;
    }
    get first() {
      return this.data[0];
    }
    get last() {
      return this.data[this.data.length - 1];
    }
    currentRange() {
      return this.setRange(this.range, !1);
    }
    clearRange() {
      this.iter.clear(), (this.range = J);
    }
    setSubscribedColumns(e) {
      console.log(`GroupRowset setSubscribedColumns ${e.join(",")}`);
    }
    setRange(e, t = !0) {
      t === !1 && e.lo === 0 && this.clearRange();
      let [s, r] =
          !t && e.lo === this.range.lo && e.hi === this.range.hi
            ? this.iter.currentRange()
            : this.iter.setRange(e, t),
        o = this.filterSet && y.FILTER_COUNT,
        i = s.map((l, a) => this.cloneRow(l, r + a, o));
      return (
        (this.range = e),
        {
          dataType: this.type,
          rows: i,
          range: e,
          size: this.currentLength,
          offset: this.offset,
          stats: void 0,
        }
      );
    }
    cloneRow(e, t, s) {
      let { IDX: r, DEPTH: o, COUNT: i } = y,
        l = e.slice();
      return (
        (l[r] = t + this.offset),
        s && l[o] !== 0 && typeof l[s] == "number" && (l[i] = l[s]),
        l
      );
    }
    applyGroupby(e, t = this.data) {
      let { columns: s } = this;
      this.groupRows.length = 0;
      let r = O(e, this.table.columnMap);
      (this.groupRows = Re(t, this.sortSet, s, this.table.columnMap, r, {
        groups: this.groupRows,
        rowParents: this.rowParents,
      })),
        (this.currentLength = this.countVisibleRows(
          this.groupRows,
          this.groupBy
        ));
    }
    groupBy(e) {
      Ls(e, this.groupby)
        ? this.sortGroupby(e)
        : Ge(e, this.groupby)
        ? (this.extendGroupby(e),
          (this.currentLength = this.countVisibleRows(
            this.groupRows,
            this.groupBy,
            this.filterSet !== null
          )))
        : Ps(e, this.groupby)
        ? (this.reduceGroupby(e),
          (this.range = J),
          this.iter.clear(),
          (this.currentLength = this.countVisibleRows(
            this.groupRows,
            this.groupBy,
            this.filterSet !== null
          )))
        : this.applyGroupby(e),
        this.iter.setGroupCount(e.length),
        (this.groupby = e);
    }
    setGroupState(e) {
      Be(e, this.groupState).forEach(([s, , r]) => {
        let { groupRows: o } = this;
        if (s === "*")
          this.toggleAll(r),
            (this.currentLength = this.countVisibleRows(o, this.groupBy, !1));
        else {
          let i = this.findGroupIdx(s);
          i !== -1
            ? r
              ? (this.currentLength += this.expandGroup(i, o))
              : (this.currentLength -= this.collapseGroup(i, o))
            : console.warn("setGroupState could not find row to toggle");
        }
      }),
        (this.groupState = e);
    }
    expandGroup(e, t) {
      return this.toggleGroup(e, t, this.countChildGroups);
    }
    collapseGroup(e, t) {
      return this.toggleGroup(e, t, this.collapseChildGroups);
    }
    toggleGroup(e, t, s) {
      let { COUNT: r, DEPTH: o, FILTER_COUNT: i, IS_EXPANDED: l } = y,
        a = 0,
        u = t[e],
        c = u[o],
        f = u[l],
        h = this.groupby.length,
        p = this.filterSet !== null;
      return (
        (u[l] = !f),
        c === h ? (a = u[p ? i : r]) : (a = s(c + 1, e + 1, t, p)),
        a
      );
    }
    countChildGroups(e, t, s, r) {
      let { DEPTH: o, FILTER_COUNT: i } = y,
        l = 0;
      for (let a = t; a < s.length; a++) {
        let u = s[a][o];
        if (u === e) (!r || s[a][i] > 0) && (l += 1);
        else if (u < e) break;
      }
      return l;
    }
    collapseChildGroups(e, t, s, r) {
      let { DEPTH: o, FILTER_COUNT: i, IS_EXPANDED: l } = y,
        a = 0;
      for (let u = t; u < s.length; u++) {
        let { [o]: c, [l]: f } = s[u];
        if (c === e)
          (!r || s[u][i] > 0) &&
            ((a += 1), f && (a += this.collapseGroup(u, s)));
        else if (c < e) break;
      }
      return a;
    }
    sort(e) {
      let { groupRows: t } = this,
        { IDX: s, DEPTH: r, COUNT: o, IDX_POINTER: i } = y;
      this.sortCriteria = Array.isArray(e) && e.length ? e : null;
      let l = O(e, this.table.columnMap);
      for (let a = 0; a < t.length; a++) {
        let u = t[a],
          c = u[r],
          f = u[o],
          h = Math.abs(c),
          p = u[i];
        h === 1 && this.sortDataSubset(p, f, l, s);
      }
    }
    sortDataSubset(e, t, s, r) {
      let o = [];
      for (let i = e; i < e + t; i++) {
        let l = this.sortSet[i];
        o.push(this.data[l]);
      }
      o.sort(Y(s));
      for (let i = 0; i < o.length; i++) this.sortSet[i + e] = o[i][r];
    }
    clearFilter() {
      (this.currentFilter = null), (this.filterSet = null);
      let { data: e, groupRows: t, sortSet: s, columns: r } = this,
        { COUNT: o, FILTER_COUNT: i, NEXT_FILTER_IDX: l } = y,
        a = this.groupby.length,
        u = xt(r, this.table.columnMap, this.groupby);
      for (let c = 0; c < t.length; c++) {
        let f = t[c];
        typeof f[i] == "number" &&
          f[o] > f[i] &&
          (Bs(t, c, s, e, r, u, a), (f[i] = null), (f[l] = null));
      }
      this.iter.setNavSet(this.selectNavigationSet(!1)),
        (this.currentLength = this.countVisibleRows(t, !1));
    }
    filter(e) {
      let t = Ie(this.currentFilter, e),
        s = e && k(this.table.columnMap, e),
        {
          COUNT: r,
          DEPTH: o,
          PARENT_IDX: i,
          FILTER_COUNT: l,
          NEXT_FILTER_IDX: a,
        } = y,
        { data: u, groupRows: c } = this,
        [f, h, p] = this.selectNavigationSet(t && this.filterSet),
        d = [];
      for (let m = 0; m < c.length; m++) {
        let g = c[m],
          w = g[o],
          E = K(g, p, r);
        if (Math.abs(w) === 1) {
          let x = g[h],
            T = 0;
          for (let S = x; S < x + E; S++) {
            let C = f[S],
              R = u[C];
            s(R) && ((T += 1), T === 1 && (g[a] = d.length), d.push(C));
          }
          g[l] = T;
          let _ = Yr;
          if (this.aggregations.length) {
            _ = this.aggregations.map(([C, R]) => [C, R, 0]);
            let S = d.length;
            for (let C = S - T; C < S; C++) {
              let R = d[C],
                v = u[R];
              for (let I = 0; I < _.length; I++) {
                let [L] = _[I];
                _[I][2] += v[L];
              }
            }
            _.forEach((C) => {
              let [R, v, I] = C,
                L = R + y.count - 2;
              v === "sum" ? (g[L] = I) : v === "avg" && (g[L] = I / T);
            });
          }
          if (T > 0) {
            let S = g;
            for (; S[i] !== null; )
              (g = c[S[i]]),
                _.forEach((C) => {
                  let [R, v, I] = C,
                    L = R + y.count - 2;
                  if (v === "sum") S[L] += I;
                  else if (v === "avg") {
                    let P = S[l],
                      X = P * S[L];
                    S[L] = (X + I) / (P + T);
                  }
                }),
                (S[l] += T);
          }
        } else
          (g[l] = 0),
            this.aggregations.forEach((x) => {
              let [T] = x,
                _ = T + y.count - 2;
              g[_] = 0;
            });
      }
      (this.filterSet = d),
        (this.currentFilter = e),
        (this.currentLength = this.countVisibleRows(this.groupRows, !0)),
        this.iter.setNavSet(this.selectNavigationSet(!0));
    }
    update(e, t) {
      let {
          groupRows: s,
          offset: r,
          rowParents: o,
          range: { lo: i },
        } = this,
        { COUNT: l, FILTER_COUNT: a, PARENT_IDX: u } = y,
        c,
        f = [];
      for (let d = 0; d < t.length; d += 3) {
        let m = t[d],
          g = m + y.count - 2,
          w = t[d + 1],
          E = t[d + 2];
        f.push(g, w, E);
        let b = o[e],
          x = 0;
        if (this.aggregatedColumn[m]) {
          c = c || [];
          do {
            let T = s[b],
              _ = T[g],
              S = E - w,
              C = this.aggregatedColumn[m];
            if (C === "sum") T[g] += S;
            else if (C === "avg") {
              let R = K(T, a, l);
              T[g] = (T[g] * R + S) / R;
            }
            (c[x] || (c[x] = [b])).push(g, _, T[g]), (b = T[u]), (x += 1);
          } while (b !== null);
        }
      }
      let h = [];
      if (c)
        for (let d = c.length - 1; d >= 0; d--) {
          let [m, ...g] = c[d],
            w = this.iter.getRangeIndexOfGroup(m);
          w !== -1 && h.push([i + w + r, ...g]);
        }
      let p = this.iter.getRangeIndexOfRow(e);
      return p !== -1 && h.push([i + p + r, ...f]), h;
    }
    insert(e, t) {
      let {
          groupRows: s,
          groupby: r,
          data: o,
          sortSet: i,
          columns: l,
          iter: a,
        } = this,
        u = O(r, this.table.columnMap, y.count - 2),
        c = ks(s, u, le(t)),
        { IDX: f, COUNT: h, KEY: p, IDX_POINTER: d } = y,
        m = [[p, "asc"]],
        g = c.length === r.length,
        w = c.length === 0,
        E = !w && !g,
        b,
        x = null;
      if (g) {
        let _ = c[c.length - 1],
          S = s[_];
        this.rowParents[e] = _;
        let C = S[h],
          R = S[d] + C;
        Us(s, R), i.splice(R, 0, t[f]), Fs(s, S) && (this.currentLength += 1);
      } else {
        let _ = O(r, this.table.columnMap);
        (x = se(s, Y(m), Vs(_, t, y), "last-available")), i.push(e);
        let S, C, R;
        E &&
          ((C = _.slice(0, c.length)),
          (R = s[c[c.length - 1]][f]),
          (_ = _.slice(c.length))),
          (S = Re(o, i, l, this.table.columnMap, _, {
            startIdx: i.length - 1,
            length: 1,
            groupIdx: x - 1,
            baseGroupby: C,
            rootIdx: R,
          })),
          Os(s, x, S.length),
          s.splice.apply(s, [x, 0].concat(S));
      }
      return (
        this.updateAggregatedValues(c, t),
        this.incrementGroupCounts(c),
        a.refresh(),
        (g ? a.getRangeIndexOfRow(e) : a.getRangeIndexOfGroup(x)) !== -1
          ? ((b = { replace: !0 }), x !== null && (this.currentLength += 1))
          : w === !1 && (b = { updates: this.collectGroupUpdates(c) }),
        b
      );
    }
    incrementGroupCounts(e) {
      let { groupRows: t } = this,
        { COUNT: s } = y;
      e.forEach((r) => {
        let o = t[r];
        o[s] += 1;
      });
    }
    updateAggregatedValues(e, t) {
      let { groupRows: s } = this;
      e.forEach((r) => {
        let o = s[r];
        for (let [i, l] of this.aggregations) {
          let a = t[i],
            u = i + y.count - 2,
            c = o[u];
          if (l === "sum") o[u] = c + a;
          else if (l === "avg") {
            let f = o[y.COUNT],
              h = f * o[u];
            o[u] = (h + a) / (f + 1);
          }
        }
      });
    }
    collectGroupUpdates(e) {
      let { aggregations: t, groupRows: s, offset: r } = this,
        { COUNT: o } = y,
        i = [];
      for (let l of e) {
        let a = this.iter.getRangeIndexOfGroup(l);
        if (a !== -1) {
          let u = s[l],
            c = [a + r, o, u[o]];
          for (let [f] of t) {
            let h = f + y.count - 2;
            c.push(h, u[h]);
          }
          i.push(c);
        }
      }
      return i;
    }
    findGroupIdx(e) {
      let { groupRows: t } = this;
      for (let s = 0; s < t.length; s++) if (t[s][y.KEY] === e) return s;
      return -1;
    }
    toggleAll(e) {
      let t = e ? 1 : -1,
        { DEPTH: s } = y,
        { groupRows: r } = this;
      this.expandedByDefault = e;
      for (let o = 0, i = r.length; o < i; o++) {
        let l = r[o][s];
        r[o][s] = Math.abs(l) * t;
      }
    }
    sortGroupby(e) {
      let { IDX: t, KEY: s, DEPTH: r, IDX_POINTER: o, PARENT_IDX: i } = y,
        { groupRows: l } = this,
        a = O(e, this.table.columnMap, y.count - 2),
        [u, c] = _t(e, this.groupby),
        f = 0,
        h = 0;
      for (; h < l.length; h++)
        Math.abs(l[h][r]) > c
          ? f > 0 && (this.sortGroupRowsSubset(a, u, h - f, f), (f = 0))
          : (f += 1);
      this.sortGroupRowsSubset(a, u, h - f, f);
      let p = new Ct(e.length);
      this.groupRows.forEach((d, m) => {
        let g = d[r],
          w = d[s],
          E = Math.abs(g);
        p.set(E, m, w),
          (d[t] = m),
          E > 1 && (d[o] = m + 1),
          p.hasParentPos(E) && (d[i] = p.parentPos(E));
      });
    }
    sortGroupRowsSubset(e, t, s = 0, r = this.groupRows.length) {
      let { groupRows: o } = this,
        i = s + r,
        [l, a] = e[t],
        u = (h, p) => (a === ee ? p > h : h > p),
        c = (h, p) => (a === ee ? p < h : h < p),
        f = null;
      for (let h = s; h < s + r; h++) {
        let p = o[h][l];
        if (f === null) f = p;
        else if (u(p, f)) {
          let d = o.splice(s, h - s);
          (i -= d.length),
            o.splice.apply(o, [i, 0].concat(d)),
            (f = p),
            (h = s - 1);
        } else if (c(p, f)) break;
      }
    }
    extendGroupby(e) {
      let t = O(e, this.table.columnMap),
        s = t.slice(0, this.groupby.length),
        r = t.slice(this.groupby.length),
        {
          groupRows: o,
          groupby: i,
          data: l,
          columns: a,
          sortSet: u,
          filterSet: c,
        } = this,
        { IDX_POINTER: f, PARENT_IDX: h, NEXT_FILTER_IDX: p } = y,
        d = i.length,
        m = new Ve(d - 1),
        g = this.currentFilter
          ? k(this.table.columnMap, this.currentFilter)
          : null;
      for (let w = 0; w < o.length; w++) {
        let E = o[w];
        m.idxAdjustment && (E[y.IDX] += m.idxAdjustment);
        let b = E[y.IDX],
          x = E[y.DEPTH],
          T = E[y.COUNT],
          _ = E[y.KEY],
          S = E[y.FILTER_COUNT],
          C = E[p];
        if (
          ((E[y.NEXT_FILTER_IDX] = void 0),
          m.hasPrevious(x + 1) && (E[h] += m.previous(x + 1)),
          x === d)
        ) {
          let R = E[f],
            v = Re(l, u, a, this.table.columnMap, r, {
              depth: x + 1,
              startIdx: R,
              length: T,
              rootIdx: b,
              baseGroupby: s,
              groupIdx: b,
              filterIdx: C,
              filterLength: S,
              filterSet: c,
              filterFn: g,
              rowParents: this.rowParents,
            }),
            I = v.length;
          o.splice(w + 1, 0, ...v), (w += I), m.increment(I);
        } else m.set(x, _);
        E[f] = b + 1;
      }
    }
    reduceGroupby(e) {
      let { groupRows: t, filterSet: s } = this,
        [r] = Ds(e, this.groupby),
        o = O(this.groupby, this.table.columnMap),
        [i, l, a] = Gs(o, r),
        {
          IDX: u,
          DEPTH: c,
          KEY: f,
          IDX_POINTER: h,
          PARENT_IDX: p,
          NEXT_FILTER_IDX: d,
        } = y,
        m = e.length,
        g = new Ve(m),
        w = s !== null,
        E = null,
        b = 0;
      for (let x = t.length; b < x; b++) {
        let T = t[b],
          _ = T[c],
          S = T[f];
        if (_ === r)
          this.reParentLeafRows(b, E),
            t.splice(b, 1),
            (b -= 1),
            (x -= 1),
            g.increment(1);
        else {
          if (_ < r) {
            if ((g.set(_, S), _ === r - 1)) {
              if (i)
                (T[h] = yt(t, h, c, b + 1, _ + 1)),
                  (T[d] = w ? yt(t, d, c, b + 1, _ + 1) : void 0);
              else if (E !== null) {
                let C = this.regroupChildGroups(E, b, l, a);
                (b -= C), (x -= C), g.increment(C);
              }
            }
            (E = b), g.hasPrevious(_ - 1) && (T[p] -= g.previous(_ - 1));
          }
          g.idxAdjustment > 0 &&
            ((T[u] -= g.idxAdjustment), T[c] < m && (T[h] -= g.idxAdjustment));
        }
      }
      i || this.regroupChildGroups(E, b, l, a);
    }
    reParentLeafRows(e, t) {
      let { groupRows: s, rowParents: r, sortSet: o } = this,
        { IDX_POINTER: i, COUNT: l } = y,
        a = s[e],
        u = a[i],
        c = a[l];
      for (let f = u; f < u + c; f++) {
        let h = o[f];
        r[h] = t;
      }
    }
    regroupChildGroups(e, t, s, r) {
      let { groupRows: o, data: i, columns: l } = this,
        { COUNT: a, IDX_POINTER: u } = y,
        c = o[e],
        f = c[a],
        h = o[e + 1][u],
        p = Re(i, this.sortSet, l, this.table.columnMap, r, {
          startIdx: h,
          length: f,
          rootIdx: e,
          baseGroupby: s,
          groupIdx: e,
          rowParents: this.rowParents,
        }),
        d = t - e - 1;
      return o.splice(e + 1, d, ...p), (c[u] = e + 1), d - p.length;
    }
    countVisibleRows(e, t, s = !1) {
      let { IS_EXPANDED: r, DEPTH: o, COUNT: i, FILTER_COUNT: l } = y,
        a = 0;
      for (let u = 0, c = e.length; u < c; u++) {
        let f = s && e[u][l] === 0;
        f || (a += 1);
        let { [r]: h, [o]: p } = e[u];
        if (!h || f) for (; u < c - 1 && Math.abs(e[u + 1][o]) > p; ) u += 1;
        else p === t && (a += s ? e[u][l] : e[u][i]);
      }
      return a;
    }
  };
var He = class {
  constructor() {
    this._queue = [];
  }
  get length() {
    return this._queue.length;
  }
  update(e) {
    let t = this.getCurrentBatch("update"),
      [s] = e,
      { updates: r } = t;
    for (let o = 0, i = r.length; o < i; o++)
      if (r[o][0] === s) {
        let l = r[o];
        for (let a = 1; a < e.length; a += 2) {
          let u = l.indexOf(e[a]);
          u === -1 ? l.push(e[a], e[a + 1]) : (l[u + 1] = e[a + 1]);
        }
        return;
      }
    r.push(e);
  }
  resize(e) {
    let t = this.getCurrentBatch("size");
    t.size = e;
  }
  append(e, t) {
    let s = this.getCurrentBatch("insert");
    s.rows.push(e), (s.offset = t);
  }
  replace({ rows: e, filter: t, size: s, range: r, offset: o }) {
    let i = this.getCurrentBatch("rowset");
    (i.rows = e), (i.size = s), (i.range = r), (i.offset = o), (i.filter = t);
  }
  popAll() {
    let e = this._queue;
    return (this._queue = []), e;
  }
  getCurrentBatch(e) {
    let t = this._queue,
      s = t.length,
      r = s === 0 || e === "rowset" ? (t[0] = Ks(e)) : t[s - 1];
    return (
      r.type !== e &&
        (e === "insert" && r.type === "size"
          ? ((r.type = "insert"), (r.rows = []))
          : (e === "size" && r.type === "insert") || (r = t[s] = Ks(e))),
      r
    );
  }
};
function Ks(n) {
  switch (n) {
    case "rowset":
      return { type: n, rows: [] };
    case "update":
      return { type: n, updates: [] };
    case "insert":
      return { type: n, rows: [] };
    case "size":
      return { type: n };
    default:
      throw Error("Unknown batch type");
  }
}
var Jr = 0,
  zs = !0,
  $e = class {
    constructor(
      e,
      {
        columns: t = [],
        sortCriteria: s = null,
        groupBy: r = null,
        filter: o = null,
      },
      i = new He()
    ) {
      (this._table = e),
        (this._index_offset = Jr),
        (this._filter = o),
        (this._groupState = null),
        (this._sortCriteria = s),
        (this.columns = t),
        (this._groupby = r),
        (this._update_queue = i),
        (this.reset = this.reset.bind(this)),
        (this.rowUpdated = this.rowUpdated.bind(this)),
        (this.rowsUpdated = this.rowsUpdated.bind(this)),
        (this.rowInserted = this.rowInserted.bind(this)),
        this.reset(),
        e.on("ready", this.reset),
        e.on("rowUpdated", this.rowUpdated),
        e.on("rowsUpdated", this.rowsUpdated),
        e.on("rowInserted", this.rowInserted);
    }
    destroy() {
      this._table.removeListener("rowUpdated", this.rowUpdated),
        this._table.removeListener("rowInserted", this.rowInserted),
        (this._table = null),
        (this.rowSet = null),
        (this.filterRowSet = null),
        (this._update_queue = null);
    }
    get status() {
      return this._table.status;
    }
    get hasGroupBy() {
      return this._groupby?.length;
    }
    reset() {
      let { _table: e, _groupby: t, rowSet: s } = this,
        r = s ? s.range : null;
      if (
        ((this.rowSet = new j(e, this.columns, this._index_offset)),
        (this.filterRowSet = null),
        t !== null
          ? (this.rowSet = new xe(
              this.rowSet,
              this.columns,
              this._groupby,
              this._groupState
            ))
          : this._sortCriteria !== null && this.rowSet.sort(this._sortCriteria),
        r)
      ) {
        let o = this.setRange(r, !1);
        console.log(o), this._update_queue.replace(o);
      }
    }
    rowInserted(e, t, s) {
      let { _update_queue: r, rowSet: o } = this,
        { size: i = null, replace: l, updates: a } = o.insert(t, s);
      if ((i !== null && r.resize(i), l)) {
        let { rows: u, size: c, offset: f } = o.currentRange();
        r.replace({
          rows: u,
          size: c,
          offset: f,
          filter: void 0,
          range: void 0,
        });
      } else
        a &&
          a.forEach((u) => {
            r.update(u);
          });
    }
    rowUpdated(e, t, s) {
      let { rowSet: r, _update_queue: o } = this,
        i = r.update(t, s);
      i &&
        (r instanceof j
          ? o.update(i)
          : i.forEach((l) => {
              o.update(l);
            }));
    }
    rowsUpdated(e, t, s) {
      let { rowSet: r, _update_queue: o } = this,
        i = [];
      for (let l = 0; l < t.length; l++) {
        let [a, ...u] = t[l],
          c = r.update(a, u);
        c &&
          (r instanceof j
            ? i.push(c)
            : c.forEach((f) => {
                i.push(f);
              }));
      }
      i.length > 0 && s !== !0 && o.update(i);
    }
    getData(e) {
      return e === F.ROW_DATA
        ? this.rowSet
        : e === F.FILTER_DATA
        ? this.filterRowSet
        : null;
    }
    setSubscribedColumns(e) {
      this.rowSet.setSubscribedColumns(e);
    }
    setRange(e, t = !0, s = F.ROW_DATA) {
      return this.getData(s).setRange(e, t);
    }
    select(e, t = F.ROW_DATA) {
      return this.getData(t).select(e);
    }
    selectAll(e = F.ROW_DATA) {
      let t = this.getData(e);
      return this.selectResponse(t.selectAll(), e, t, !0);
    }
    selectNone(e = F.ROW_DATA) {
      let t = this.getData(e);
      return this.selectResponse(t.selectNone(), e, t, !1);
    }
    selectResponse(e, t, s, r) {
      let o = e.length > 0,
        { stats: i } = s;
      if (t === F.ROW_DATA) {
        if (o) return { updates: e };
      } else {
        let { totalSelected: l } = i;
        return (
          l === 0
            ? this.applyFilterSetChangeToFilter({
                colName: s.columnName,
                type: H,
                values: [],
              })
            : r &&
              this.applyFilterSetChangeToFilter({
                colName: s.columnName,
                type: H,
                values: s.values,
              }),
          { dataType: t, updates: e, stats: s.stats }
        );
      }
    }
    sort(e) {
      return (
        (this._sortCriteria = e),
        this.rowSet.sort(e),
        this.setRange(me(this.rowSet.range), !1)
      );
    }
    filter(e, t = "rowData", s = !1, r = !1) {
      if (t === F.FILTER_DATA) return [void 0, this.filterFilterData(e)];
      {
        s && (e = Jt(this._filter, e));
        let { rowSet: o, _filter: i, filterRowSet: l } = this,
          { range: a } = o;
        this._filter = e;
        let u;
        if (e === null && i) o.clearFilter();
        else if (e) this.rowSet.filter(e);
        else
          throw Error(
            "InMemoryView.filter setting null filter when we had no filter anyway"
          );
        if (l && t === F.ROW_DATA && !r)
          if (e)
            l.type === F.FILTER_DATA
              ? (u = l.setSelectedFromFilter(e))
              : l.type === F.FILTER_BINS &&
                ((this.filterRowSet = o.getBinnedValuesForColumn({
                  name: this.filterRowSet.columnName,
                })),
                (u = this.filterRowSet.setRange()));
          else {
            let { columnName: f, range: h } = l;
            (this.filterRowSet = o.getDistinctValuesForColumn({ name: f })),
              (u = this.filterRowSet.setRange(h, !1));
          }
        let c = { ...this.rowSet.setRange(me(a), !1), filter: e };
        return u ? [c, u] : [c];
      }
    }
    filterFilterData(e) {
      let { filterRowSet: t } = this;
      if (t)
        return (
          e === null ? t.clearFilter() : e && t.filter(e),
          t.setRange(me(t.range), !1, zs)
        );
      console.error("[InMemoryView] filterfilterRowSet no filterRowSet");
    }
    applyFilterSetChangeToFilter(e) {
      let [t] = this.filter(e, F.ROW_DATA, !0, !0);
      this._update_queue.replace(t);
    }
    applyFilter() {}
    groupBy(e) {
      let {
        rowSet: t,
        columns: s,
        _groupState: r,
        _sortCriteria: o,
        _groupby: i,
      } = this;
      return (
        (this._groupby = e),
        e.length === 0
          ? (this.rowSet = j.fromGroupRowSet(this.rowSet))
          : i === null
          ? (this.rowSet = new xe(t, s, e, r, o))
          : t.groupBy(e),
        this.rowSet.currentRange()
      );
    }
    toggleGroupState(e) {
      let t = { ...this._groupState };
      return t[e] ? delete t[e] : (t[e] = !0), t;
    }
    openTreeNode(e) {
      let t = this.toggleGroupState(e);
      return this.setGroupState(t);
    }
    closeTreeNode(e) {
      let t = this.toggleGroupState(e);
      return this.setGroupState(t);
    }
    setGroupState(e) {
      this._groupState = e;
      let { rowSet: t } = this;
      return t.setGroupState(e), t.setRange(t.range, !1);
    }
    get updates() {
      let {
        _update_queue: e,
        rowSet: { range: t },
      } = this;
      return { updates: e.popAll(), range: { lo: t.lo, hi: t.hi } };
    }
    getFilterData(e, t) {
      let { rowSet: s, filterRowSet: r, _filter: o } = this,
        i = e.name,
        l = this.columns.find((u) => u.name === i);
      return (
        ys(l) === "number"
          ? (this.filterRowSet = s.getBinnedValuesForColumn(e))
          : !r || r.columnName !== e.name
          ? (this.filterRowSet = s.getDistinctValuesForColumn(e))
          : r && r.columnName === e.name && r.setRange({ lo: 0, hi: 0 }),
        o
          ? this.filterRowSet.setSelectedFromFilter(o)
          : this.filterRowSet.selectAll(),
        this.filterRowSet.setRange(t, !1, zs)
      );
    }
  };
var Ye = class extends Z {
  constructor({ valueColumns: e, ...t }) {
    super(t);
    this.valueColumns = e;
  }
  setData(e) {
    let { index: t } = this;
    for (let s = 0; s < e.length; s++) {
      let [r, o] = e[s];
      t[o] = r;
    }
    this.rows = e;
  }
  async loadData(e) {
    console.log(`import data from ${e}.js`);
    try {
      let { default: t } = await import(`${e}`);
      t && this.setData(t);
    } catch (t) {
      console.error(`failed to load data from path '${e}'`, t);
    }
  }
};
var Je = [],
  Hs = { filter: "" },
  $s = { sortDefs: [] },
  Ys = (
    { columns: n = Je, filterSpec: e = Hs, groupBy: t = Je, sort: s = $s },
    { columns: r = Je, filterSpec: o = Hs, groupBy: i = Je, sort: l = $s }
  ) => {
    let a = {};
    return (
      Js(n, r) || (a.columns = !0),
      Qr(s, l) || (a.sort = !0),
      Js(t, i) || (a.groupBy = !0),
      e.filter !== o.filter && (a.filter = !0),
      a
    );
  };
function Js(n, e) {
  return !(
    n.length !== e.length ||
    n.some(
      ({ column: t, sortType: s }) =>
        !e.find((r) => r.column === t && r.sortType === s)
    )
  );
}
function Qr({ sortDefs: n }, { sortDefs: e }) {
  return !(
    n.length !== e.length ||
    n.some(({ col: t, dir: s }, r) => {
      let { col: o, dir: i } = e[r];
      return o === t && i === s;
    })
  );
}
var Qs = be("DataStoreConnection", ce.brown),
  Zs = { and: D, or: ie, "=": ot, ">": it, "<": lt, in: H },
  en = (n) => {
    let { column: e, op: t, value: s, values: r, filters: o } = n;
    return o
      ? { type: Zs[t], filters: o.map(en) }
      : { type: Zs[t], colName: e, value: s, values: r };
  };
async function Dt(n, e) {
  return Zr(n, (t) => {
    e(t);
  });
}
async function Zr(n, e, t) {
  e({ type: "connection-status", status: "connecting" });
  let s = await eo(n);
  t = new tn(s, n, e);
  let r = "connected";
  return e({ type: "connection-status", status: r }), (t.status = r), t;
}
var eo = async (n) => {
    console.log(`table config url ${n}`);
    let e = async () => await import(n),
      { config: t } = await e();
    console.log(`got config ${JSON.stringify(t, null, 2)}`);
    let { generateData: s } = await import(t.dataUrl),
      r = new Ye(t);
    return r.setData(s()), new $e(r, { columns: t.columns });
  },
  tn = class {
    constructor(e, t, s) {
      (this.url = t),
        (this.connectionCallback = s),
        (this.viewPortId = void 0),
        this.setDataStore(e),
        (this.status = "ready"),
        (this.viewportMeta = null);
    }
    setDataStore(e) {
      let { connectionCallback: t } = this,
        s = (o, i) => {
          let { requestId: l, body: a } = o;
          switch (a.type) {
            case "CREATE_VP":
              {
                let u = (this.viewPortId = l),
                  {
                    columns: c,
                    filterSpec: f,
                    groupBy: h,
                    sort: p,
                    range: d,
                    table: m,
                  } = a;
                t({
                  requestId: l,
                  body: {
                    type: "CREATE_VP_SUCCESS",
                    viewPortId: u,
                    columns: c,
                    range: d,
                    table: m,
                  },
                });
                let { rows: g, size: w } = e.setRange(
                    { lo: d.from, hi: d.to },
                    !0
                  ),
                  E = +new Date();
                t({
                  requestId: "NA",
                  body: {
                    type: "TABLE_ROW",
                    timeStamp: E,
                    rows: [
                      {
                        viewPortId: u,
                        vpSize: w,
                        rowIndex: -1,
                        rowKey: "SIZE",
                        updateType: "SIZE",
                        sel: 0,
                        ts: E,
                        data: [],
                      },
                    ].concat(
                      g.map(([b, , , , , , x, T, ..._]) => ({
                        viewPortId: u,
                        vpSize: w,
                        rowIndex: b,
                        rowKey: x,
                        updateType: "U",
                        sel: T,
                        ts: E,
                        data: _,
                      }))
                    ),
                  },
                }),
                  (this.viewportMeta = {
                    columns: c,
                    filterSpec: f,
                    groupBy: h,
                    sort: p,
                  });
              }
              break;
            case "CHANGE_VP_RANGE":
              {
                let { from: u, to: c, viewPortId: f } = a;
                t({
                  requestId: l,
                  body: {
                    type: "CHANGE_VP_RANGE_SUCCESS",
                    viewPortId: f,
                    from: u,
                    to: c,
                  },
                });
                let { rows: h, size: p } = e.setRange({ lo: u, hi: c }, !0);
                e.hasGroupBy ? t(ae(f, h, p)) : t(Te(f, h, p));
              }
              break;
            case "CHANGE_VP":
              {
                let { type: u, viewPortId: c, ...f } = a,
                  h = Ys(this.viewportMeta, f);
                if (
                  ((this.viewportMeta = f),
                  t({
                    requestId: l,
                    body: { type: "CHANGE_VP_SUCCESS", viewPortId: c },
                  }),
                  h.filter)
                ) {
                  let p = en(i.filter),
                    [{ rows: d, size: m }] = e.filter(p);
                  e.hasGroupBy ? t(ae(c, d, m)) : t(Te(c, d, m));
                } else if (h.sort) {
                  let p = a.sort.sortDefs.map(({ column: g, sortType: w }) => [
                      g,
                      w === "D" ? "dsc" : "asc",
                    ]),
                    { rows: d, size: m } = e.sort(p);
                  e.hasGroupBy ? t(ae(c, d, m)) : t(Te(c, d, m));
                } else if (h.groupBy) {
                  let { rows: p, size: d } = e.groupBy(a.groupBy);
                  a.groupBy.length > 0 ? t(ae(c, p, d)) : t(Te(c, p, d));
                }
              }
              break;
            case "SET_SELECTION":
              {
                let { viewPortId: u } = this,
                  { rows: c } = e.select(a.selection);
                t(Te(u, c));
              }
              break;
            case "OPEN_TREE_NODE":
              {
                let { viewPortId: u } = this,
                  { rows: c, size: f } = e.openTreeNode(a.treeKey);
                t(ae(u, c, f));
              }
              break;
            case "CLOSE_TREE_NODE":
              {
                let { viewPortId: u } = this,
                  { rows: c, size: f } = e.closeTreeNode(a.treeKey);
                t(ae(u, c, f));
              }
              break;
            default:
              Qs.log(`Unknown message type from client ${a.type}`);
          }
        };
      this.send = s;
      let r = (o) => {
        Qs.log(`Message cannot be sent, socket closed: ${o.type}`);
      };
      this.close = () => {
        console.log("[Connection] close dataStoreConnection"),
          (this.status = "closed"),
          (this.send = r);
      };
    }
  };
function Te(n, e, t) {
  let s = +new Date();
  return {
    requestId: "NA",
    body: {
      type: "TABLE_ROW",
      timeStamp: s,
      rows: e.map(([r, , , , , , o, i, ...l]) => ({
        viewPortId: n,
        vpSize: t,
        rowIndex: r,
        rowKey: o,
        updateType: "U",
        sel: i,
        ts: s,
        data: l,
      })),
    },
  };
}
function ae(n, e, t) {
  let s = +new Date();
  return {
    requestId: "NA",
    body: {
      type: "TABLE_ROW",
      timeStamp: s,
      rows: [
        {
          viewPortId: n,
          vpSize: t,
          rowIndex: -1,
          rowKey: "SIZE",
          updateType: "SIZE",
          sel: 0,
          ts: s,
          data: [],
        },
      ].concat(
        e.map(([r, , o, i, l, a, u, c, ...f]) => ({
          viewPortId: n,
          vpSize: t,
          rowIndex: r,
          rowKey: u,
          updateType: "U",
          sel: c,
          ts: s,
          data: [Math.abs(l), i, u, o, "", a, ...f],
        }))
      ),
    },
  };
}
var sn = [];
var nn = () => {
  let n = sn.slice();
  return (sn.length = 0), n;
};
var to = "AUTH",
  rn = "AUTH_SUCCESS",
  on = "CHANGE_VP",
  ln = "CHANGE_VP_SUCCESS",
  Ft = "CHANGE_VP_RANGE",
  an = "CHANGE_VP_RANGE_SUCCESS",
  un = "CLOSE_TREE_NODE",
  cn = "CLOSE_TREE_SUCCESS";
var Ot = "CREATE_VISUAL_LINK",
  hn = "CREATE_VISUAL_LINK_SUCCESS",
  fn = "CREATE_VP",
  pn = "CREATE_VP_SUCCESS",
  dn = "DISABLE_VP",
  gn = "DISABLE_VP_SUCCESS";
var mn = "ENABLE_VP",
  wn = "ENABLE_VP_SUCCESS";
var En = "GET_TABLE_LIST",
  Rn = "GET_TABLE_META",
  so = "GET_VP_VISUAL_LINKS",
  no = "GET_VIEW_PORT_MENUS",
  Sn = "VIEW_PORT_MENUS_RESP";
var yn = "VIEW_PORT_MENU_RESP";
var Cn = "HB",
  _n = "HB_RESP",
  ro = "LOGIN",
  xn = "LOGIN_SUCCESS",
  Tn = "OPEN_TREE_NODE",
  bn = "OPEN_TREE_SUCCESS";
var In = "REMOVE_VP",
  vn = "REMOVE_VP_SUCCESS";
var Ut = "RPC_CALL",
  An = "RPC_RESP",
  Nn = "MENU_RPC_CALL";
var Mn = "SET_SELECTION",
  Pn = "SET_SELECTION_SUCCESS",
  Ln = "TABLE_META_RESP",
  Dn = "TABLE_LIST_RESP",
  Fn = "VP_VISUAL_LINKS_RESP",
  On = "TABLE_ROW";
var Un = (n, e) => ({ type: to, username: n, password: e }),
  kn = (n, e) => ({ type: ro, token: n, user: e }),
  Vn = (n) => ({ type: so, vpId: n }),
  Gn = (n) => ({ type: no, vpId: n });
var kt = class {
  constructor(e) {
    if (
      ((this.keys = new Map()), (this.free = []), (this.nextKeyValue = 0), e)
    ) {
      let { lo: t, hi: s, from: r = t, to: o = s } = e;
      this.reset({ from: r, to: o });
    }
  }
  next() {
    return this.free.length ? this.free.pop() : this.nextKeyValue++;
  }
  reset({ from: e, to: t }) {
    this.keys.forEach((r, o) => {
      (o < e || o >= t) && (this.free.push(r), this.keys.delete(o));
    });
    let s = t - e;
    this.keys.size + this.free.length > s &&
      (this.free.length = s - this.keys.size);
    for (let r = e; r < t; r++)
      if (!this.keys.has(r)) {
        let o = this.next();
        this.keys.set(r, o);
      }
  }
  keyFor(e) {
    return this.keys.get(e);
  }
};
var Qe = (n, e, t, s) => {
  let r = s * 0.25;
  return !n || !s || n.to - t < r ? !0 : n.from > 0 && e - n.from < r;
};
var Vt = class {
  constructor({ lo: e, hi: t }, { from: s, to: r }, o) {
    this.setRowCount = (e) => {
      if (
        (e < this.internalData.length && (this.internalData.length = e),
        e < this.rowCount)
      ) {
        this.rowsWithinRange = 0;
        let t = Math.min(e, this.clientRange.to);
        for (let s = this.clientRange.from; s < t; s++) {
          let r = s - this.range.from;
          this.internalData[r] !== void 0 && (this.rowsWithinRange += 1);
        }
      }
      this.rowCount = e;
    };
    (this.bufferSize = o),
      (this.clientRange = new te(e, t)),
      (this.range = new te(s, r)),
      (this.internalData = new Array(o)),
      (this.rowsWithinRange = 0),
      (this.rowCount = 0);
  }
  get hasAllRowsWithinRange() {
    return (
      this.rowsWithinRange === this.clientRange.to - this.clientRange.from ||
      (this.rowCount > 0 && this.rowsWithinRange === this.rowCount)
    );
  }
  setAtIndex(e, t) {
    let s = this.isWithinClientRange(e);
    if (s || this.isWithinRange(e)) {
      let r = e - this.range.from;
      !this.internalData[r] && s && (this.rowsWithinRange += 1),
        (this.internalData[r] = t);
    }
    return s;
  }
  getAtIndex(e) {
    return this.range.isWithin(e) &&
      this.internalData[e - this.range.from] != null
      ? this.internalData[e - this.range.from]
      : void 0;
  }
  isWithinRange(e) {
    return this.range.isWithin(e);
  }
  isWithinClientRange(e) {
    return this.clientRange.isWithin(e);
  }
  setClientRange(e, t) {
    let s = this.clientRange.from,
      r = Math.min(this.clientRange.to, this.rowCount);
    if (e === s && t === r) return [!1];
    let o = this.clientRange.copy();
    (this.clientRange.from = e),
      (this.clientRange.to = t),
      (this.rowsWithinRange = 0);
    for (let c = e; c < t; c++) {
      let f = c - this.range.from;
      this.internalData[f] && (this.rowsWithinRange += 1);
    }
    let i,
      l,
      a = this.range.from;
    if (this.hasAllRowsWithinRange)
      if (t > o.to) {
        let c = Math.max(e, o.to);
        i = this.internalData.slice(c - a, t - a);
      } else {
        let c = Math.min(o.from, t);
        i = this.internalData.slice(e - a, c - a);
      }
    else if (this.rowsWithinRange > 0)
      if (t > o.to) {
        let c = Math.max(e, o.to);
        l = this.internalData.slice(c - a, t - a).filter((f) => !!f);
      } else {
        let c = Math.min(o.from, t);
        l = this.internalData
          .slice(Math.max(0, e - a), c - a)
          .filter((f) => !!f);
      }
    return [Qe(this.range, e, t, this.bufferSize), i, l];
  }
  setRange(e, t) {
    let [s, r] = this.range.overlap(e, t),
      o = new Array(t - e + this.bufferSize);
    this.rowsWithinRange = 0;
    for (let i = s; i < r; i++) {
      let l = this.getAtIndex(i);
      if (l) {
        let a = i - e;
        (o[a] = l), this.isWithinClientRange(i) && (this.rowsWithinRange += 1);
      }
    }
    (this.internalData = o), (this.range.from = e), (this.range.to = t);
  }
  getData() {
    let { from: e, to: t } = this.range,
      { from: s, to: r } = this.clientRange,
      o = Math.max(0, s - e),
      i = Math.min(t - e, t, r - e, this.rowCount ?? t);
    return this.internalData.slice(o, i);
  }
};
var Bn = [],
  oo = ([n], [e]) => n - e,
  Gt = class {
    constructor({
      viewport: e,
      tablename: t,
      aggregations: s,
      columns: r,
      range: o,
      bufferSize: i = 0,
      filter: l = "",
      filterQuery: a = "",
      sort: u = [],
      groupBy: c = [],
      visualLink: f,
    }) {
      (this.clientViewportId = e),
        (this.table = t),
        (this.status = ""),
        (this.disabled = !1),
        (this.suspended = !1),
        (this.aggregations = s),
        (this.columns = r),
        (this.clientRange = o),
        (this.bufferSize = i),
        (this.sort = { sortDefs: u }),
        (this.groupBy = c),
        (this.filterSpec = { filter: a }),
        (this.filter = l),
        (this.isTree = !1),
        (this.dataWindow = void 0),
        (this.rowCountChanged = !1),
        (this.keys = new kt(o)),
        (this.links = null),
        (this.linkedParent = null),
        (this.pendingLinkedParent = f),
        (this.pendingOperations = new Map()),
        (this.pendingRangeRequest = null),
        (this.hasUpdates = !1),
        (this.holdingPen = []),
        (this.selection = []),
        (this.lastTouchIdx = null);
    }
    get hasUpdatesToProcess() {
      return this.suspended ? !1 : this.rowCountChanged || this.hasUpdates;
    }
    subscribe() {
      return {
        type: fn,
        table: this.table,
        range: $(this.clientRange, this.bufferSize),
        aggregations: this.aggregations,
        columns: this.columns,
        sort: this.sort,
        groupBy: this.groupBy,
        filterSpec: this.filterSpec,
      };
    }
    handleSubscribed({
      viewPortId: e,
      aggregations: t,
      columns: s,
      table: r,
      range: o,
      sort: i,
      groupBy: l,
      filterSpec: a,
    }) {
      return (
        (this.serverViewportId = e),
        (this.status = "subscribed"),
        (this.aggregations = t),
        (this.columns = s),
        (this.table = r),
        (this.range = o),
        (this.sort = i),
        (this.groupBy = l),
        (this.filterSpec = a),
        (this.isTree = l && l.length > 0),
        (this.dataWindow = new Vt(this.clientRange, o, this.bufferSize)),
        console.log(
          `%cViewport subscribed
        clientVpId: ${this.clientViewportId}
        serverVpId: ${this.serverViewportId}
        table: ${this.table}
        aggregations: ${JSON.stringify(t)}
        columns: ${s.join(",")}
        range: ${JSON.stringify(o)}
        sort: ${JSON.stringify(i)}
        groupBy: ${JSON.stringify(l)}
        filterSpec: ${JSON.stringify(a)}
        bufferSize: ${this.bufferSize}
      `,
          "color: blue"
        ),
        {
          type: "subscribed",
          clientViewportId: this.clientViewportId,
          columns: s,
          filter: this.filter,
          filterSpec: this.filterSpec,
        }
      );
    }
    awaitOperation(e, t) {
      this.pendingOperations.set(e, t);
    }
    completeOperation(e, ...t) {
      let { clientViewportId: s, pendingOperations: r } = this,
        { type: o, data: i } = r.get(e);
      if ((r.delete(e), o === Ft)) {
        let [l, a] = t;
        this.dataWindow.setRange(l, a), (this.pendingRangeRequest = null);
      } else {
        if (o === "groupBy")
          return (
            (this.isTree = !0),
            (this.groupBy = i),
            { clientViewportId: s, type: o, groupBy: i }
          );
        if (o === "groupByClear")
          return (
            (this.isTree = !1),
            (this.groupBy = []),
            { clientViewportId: s, type: "groupBy", groupBy: null }
          );
        if (o === "filter")
          return (
            (this.filterSpec = { filter: i.filterQuery }),
            { clientViewportId: s, type: o, ...i }
          );
        if (o === "aggregate")
          return (
            (this.aggregations = i),
            { clientViewportId: s, type: o, aggregations: i }
          );
        if (o === "sort")
          return (
            (this.sort = { sortDefs: i }),
            { clientViewportId: s, type: o, sort: i }
          );
        if (o !== "selection") {
          if (o === "disable")
            return (
              (this.disabled = !0), { type: "disabled", clientViewportId: s }
            );
          if (o === "enable")
            return (
              (this.disabled = !1), { type: "enabled", clientViewportId: s }
            );
          if (o === Ot) {
            let [l, a, u] = t;
            return (
              (this.linkedParent = {
                colName: l,
                parentViewportId: a,
                parentColName: u,
              }),
              (this.pendingLinkedParent = null),
              {
                type: "visual-link-created",
                clientViewportId: s,
                colName: l,
                parentViewportId: a,
                parentColName: u,
              }
            );
          }
        }
      }
    }
    rangeRequest(e, t, s) {
      let r = Ft,
        [o, i, l] = this.dataWindow.setClientRange(t, s),
        a =
          o && Qe(this.pendingRangeRequest, t, s, this.bufferSize)
            ? {
                type: r,
                viewPortId: this.serverViewportId,
                ...$(
                  { lo: t, hi: s },
                  this.bufferSize,
                  this.dataWindow.rowCount
                ),
              }
            : void 0;
      a &&
        (this.awaitOperation(e, { type: r }), (this.pendingRangeRequest = a)),
        this.keys.reset(this.dataWindow.clientRange),
        this.holdingPen.some(([c]) => c < t || c >= s) &&
          (this.holdingPen = this.holdingPen.filter(([c]) => c >= t && c < s));
      let u = this.isTree ? jt(this.groupBy, this.columns) : Bt;
      return (
        l &&
          l.forEach((c) => {
            this.holdingPen.push(u(c, this.keys));
          }),
        i ? [a, i.map((c) => u(c, this.keys))] : [a]
      );
    }
    setLinks(e) {
      return (
        (this.links = e),
        [
          {
            type: "VP_VISUAL_LINKS_RESP",
            links: e,
            clientViewportId: this.clientViewportId,
          },
          this.pendingLinkedParent,
        ]
      );
    }
    setMenu(e) {
      return {
        type: "VIEW_PORT_MENUS_RESP",
        menu: e,
        clientViewportId: this.clientViewportId,
      };
    }
    createLink(e, t, s, r) {
      let o = {
        type: Ot,
        parentVpId: s,
        childVpId: this.serverViewportId,
        parentColumnName: r,
        childColumnName: t,
      };
      return this.awaitOperation(e, o), o;
    }
    suspend() {
      this.suspended = !0;
    }
    resume() {
      return (this.suspended = !1), this.currentData();
    }
    currentData() {
      let e = this.dataWindow.getData(),
        { keys: t } = this,
        s = this.isTree ? jt(this.groupBy, this.columns) : Bt,
        r = [];
      for (let o of e) o && r.push(s(o, t));
      return r;
    }
    enable(e) {
      return (
        this.awaitOperation(e, { type: "enable" }),
        { type: mn, viewPortId: this.serverViewportId }
      );
    }
    disable(e) {
      return (
        this.awaitOperation(e, { type: "disable" }),
        { type: dn, viewPortId: this.serverViewportId }
      );
    }
    filterRequest(e, t, s) {
      return (
        this.awaitOperation(e, {
          type: "filter",
          data: { filter: t, filterQuery: s },
        }),
        this.createRequest({ filterSpec: { filter: s } })
      );
    }
    aggregateRequest(e, t) {
      return (
        this.awaitOperation(e, { type: "aggregate", data: t }),
        this.createRequest({ aggregations: t })
      );
    }
    sortRequest(e, t) {
      return (
        this.awaitOperation(e, { type: "sort", data: t }),
        this.createRequest({ sort: { sortDefs: t } })
      );
    }
    groupByRequest(e, t = Bn) {
      let s = t === Bn ? "groupByClear" : "groupBy";
      return (
        this.awaitOperation(e, { type: s, data: t }),
        this.createRequest({ groupBy: t })
      );
    }
    selectRequest(e, t) {
      return (
        this.awaitOperation(e, { type: "selection", data: t }),
        { type: Mn, vpId: this.serverViewportId, selection: t }
      );
    }
    handleUpdate(e, t, s) {
      this.dataWindow.rowCount !== s.vpSize &&
        (this.dataWindow.setRowCount(s.vpSize), (this.rowCountChanged = !0)),
        e === "U" && this.dataWindow.setAtIndex(t, s) && (this.hasUpdates = !0);
    }
    getNewRowCount = () => {
      if (this.rowCountChanged)
        return (this.rowCountChanged = !1), this.dataWindow.rowCount;
    };
    getClientRows(e) {
      if (this.hasUpdates) {
        let t = this.dataWindow.getData(),
          { keys: s } = this,
          r = this.isTree ? jt(this.groupBy, this.columns) : Bt,
          o = this.dataWindow.hasAllRowsWithinRange
            ? this.holdingPen.splice(0)
            : void 0,
          i = o || this.holdingPen;
        for (let l of t) l && l.ts >= e && i.push(r(l, s));
        return (this.hasUpdates = !1), o && o.sort(oo);
      }
    }
    createRequest(e) {
      return {
        type: on,
        viewPortId: this.serverViewportId,
        aggregations: this.aggregations,
        columns: this.columns,
        sort: this.sort,
        groupBy: this.groupBy,
        filterSpec: this.filterSpec,
        ...e,
      };
    }
  },
  Bt = ({ rowIndex: n, rowKey: e, sel: t, data: s }, r) =>
    [n, r.keyFor(n), !0, null, null, 1, e, t].concat(s),
  jt =
    (n, e) =>
    ({ rowIndex: t, rowKey: s, sel: r, data: o }, i) => {
      let [l, a, , u, , c, ...f] = o,
        h = s.split("|").slice(1);
      return (
        n.forEach((d, m) => {
          let g = e.indexOf(d);
          f[g] = h[m];
        }),
        [t, i.keyFor(t), u, a, l, c, s, r].concat(f)
      );
    };
var Wt = (n) => {
  switch (n) {
    case "getUniqueFieldValues":
      return ["TypeAheadRpcHandler", "TYPEAHEAD"];
    default:
      return ["OrderEntryRpcHandler", "SIMUL"];
  }
};
var Ze = 1;
var q = () => `${Ze++}`,
  io = [],
  lo = {},
  ao = { "selected-rows": "VIEW_PORT_MENUS_SELECT_RPC" },
  qt = class {
    constructor(e, t) {
      this.queuedRequests = [];
      (this.connection = e),
        (this.postMessageToClient = t),
        (this.viewports = new Map()),
        (this.mapClientToServerViewport = new Map()),
        (this.currentTimestamp = void 0);
    }
    async authenticate(e, t) {
      return new Promise((s, r) => {
        this.sendMessageToServer(Un(e, t), ""),
          (this.pendingAuthentication = { resolve: s, reject: r });
      });
    }
    async login(e = this.loginToken) {
      return new Promise((t, s) => {
        this.sendMessageToServer(kn(e, "user"), ""),
          (this.pendingLogin = { resolve: t, reject: s });
      });
    }
    subscribe(e) {
      if (this.mapClientToServerViewport.has(e.viewport))
        console.log(`ServerProxy spurious subscribe call ${e.viewport}`);
      else {
        let t = new Gt(e);
        this.viewports.set(e.viewport, t);
        let s = this.sessionId !== "";
        this.sendIfReady(t.subscribe(), e.viewport, s);
      }
    }
    unsubscribe(e) {
      let t = this.mapClientToServerViewport.get(e);
      this.sendMessageToServer({ type: In, viewPortId: t });
    }
    handleMessageFromClient(e) {
      let { type: t, viewport: s } = e,
        r = this.mapClientToServerViewport.get(s),
        o = this.viewports.get(r);
      if (!o) {
        switch (t) {
          case En:
            this.sendMessageToServer({ type: t }, e.requestId);
            break;
          case Rn:
            this.sendMessageToServer({ type: t, table: e.table }, e.requestId);
            break;
          case Ut:
            {
              let { method: l } = e,
                [a, u] = Wt(l);
              this.sendMessageToServer(
                {
                  type: t,
                  service: a,
                  method: l,
                  params: e.params || [o.serverViewportId],
                  namedParams: {},
                },
                e.requestId,
                { module: u }
              );
            }
            break;
          default:
        }
        return;
      }
      let i = o.status === "subscribed";
      switch (e.type) {
        case "setViewRange":
          {
            let l = q(),
              [a, u] = o.rangeRequest(l, e.range.lo, e.range.hi);
            if ((a && this.sendIfReady(a, l, i), u)) {
              let c = {
                type: "viewport-updates",
                viewports: { [o.clientViewportId]: { rows: u } },
              };
              this.postMessageToClient(c);
            }
          }
          break;
        case "aggregate":
          {
            let l = q(),
              a = o.aggregateRequest(l, e.aggregations);
            this.sendIfReady(a, l, i);
          }
          break;
        case "sort":
          {
            let l = q(),
              a = o.sortRequest(l, e.sortCriteria);
            this.sendIfReady(a, l, i);
          }
          break;
        case "groupBy":
          {
            let l = q(),
              a = o.groupByRequest(l, e.groupBy);
            this.sendIfReady(a, l, i);
          }
          break;
        case "filterQuery":
          {
            let l = q(),
              { filter: a, filterQuery: u } = e,
              c = o.filterRequest(l, a, u);
            this.sendIfReady(c, l, i);
          }
          break;
        case "select":
          {
            let l = q(),
              { selected: a } = e,
              u = o.selectRequest(l, a);
            this.sendIfReady(u, l, i);
          }
          break;
        case "suspend":
          o.suspend();
          break;
        case "resume":
          {
            let l = o.resume(),
              a = {
                type: "viewport-updates",
                viewports: { [o.clientViewportId]: { rows: l } },
              };
            this.postMessageToClient(a);
          }
          break;
        case "disable":
          {
            let l = q(),
              a = o.disable(l);
            this.sendIfReady(a, l, i);
          }
          break;
        case "enable":
          {
            let l = q(),
              a = o.enable(l);
            this.sendIfReady(a, l, i);
          }
          break;
        case "openTreeNode":
          this.sendIfReady(
            { type: Tn, vpId: o.serverViewportId, treeKey: e.key },
            Ze++,
            i
          );
          break;
        case "closeTreeNode":
          this.sendIfReady(
            { type: un, vpId: o.serverViewportId, treeKey: e.key },
            Ze++,
            i
          );
          break;
        case "createLink":
          {
            let {
                parentVpId: l,
                parentColumnName: a,
                childColumnName: u,
                viewport: c,
              } = e,
              f = this.mapClientToServerViewport.get(c),
              h = this.viewports.get(f),
              p = q(),
              d = h.createLink(p, u, l, a);
            this.sendMessageToServer(d, p);
          }
          break;
        case Nn:
          {
            let { context: l, rpcName: a } = e;
            this.sendMessageToServer(
              { type: ao[l], rpcName: a, vpId: o.serverViewportId },
              e.requestId,
              "CORE"
            );
          }
          break;
        case Ut:
          {
            let { method: l } = e,
              [a, u] = Wt(l);
            this.sendMessageToServer(
              {
                type: t,
                service: a,
                method: l,
                params: e.params || [o.serverViewportId],
                namedParams: {},
              },
              e.requestId,
              u
            );
          }
          break;
        default:
          console.log(
            `Vuu ServerProxy Unexpected message from client ${JSON.stringify(
              e
            )}`
          );
      }
    }
    sendIfReady(e, t, s = !0, r) {
      return (
        s ? this.sendMessageToServer(e, t, r) : this.queuedRequests.push(e), s
      );
    }
    sendMessageToServer(e, t = `${Ze++}`, s = lo) {
      let { module: r = "CORE", ...o } = s;
      this.connection.send(
        {
          requestId: t,
          sessionId: this.sessionId,
          token: this.loginToken,
          user: "user",
          module: r,
          body: e,
        },
        o
      );
    }
    handleMessageFromServer(e) {
      let {
          requestId: t,
          body: { type: s, timeStamp: r, ...o },
        } = e,
        { viewports: i } = this;
      switch (s) {
        case Cn:
          this.sendMessageToServer({ type: _n, ts: +new Date() }, "NA");
          break;
        case rn:
          (this.loginToken = e.token),
            this.pendingAuthentication.resolve(e.token);
          break;
        case xn:
          (this.sessionId = e.sessionId),
            this.pendingLogin.resolve(e.sessionId);
          break;
        case pn:
          if (i.has(t)) {
            let l = i.get(t),
              { viewPortId: a } = o;
            t !== a && (i.delete(t), i.set(a, l)),
              this.mapClientToServerViewport.set(t, a);
            let u = l.handleSubscribed(o);
            u && this.postMessageToClient(u),
              this.sendMessageToServer(Vn(a)),
              this.sendMessageToServer(Gn(a));
          }
          break;
        case vn:
          if (i.has(o.viewPortId)) {
            let { clientViewportId: l } = i.get(o.viewPortId);
            this.mapClientToServerViewport.delete(l), i.delete(o.viewPortId);
          }
          break;
        case Pn:
          i.has(o.vpId) && i.get(o.vpId).completeOperation(t);
          break;
        case ln:
        case gn:
          if (i.has(o.viewPortId)) {
            let l = this.viewports.get(o.viewPortId).completeOperation(t);
            l && this.postMessageToClient(l);
          }
          break;
        case wn:
          if (i.has(o.viewPortId)) {
            let l = i.get(o.viewPortId),
              a = l.completeOperation(t);
            this.postMessageToClient(a);
            let u = l.currentData(),
              c = {
                type: "viewport-updates",
                viewports: { [l.clientViewportId]: { rows: u } },
              };
            this.postMessageToClient(c);
          }
          break;
        case On:
          {
            let [{ ts: l } = { ts: r }] = o.rows || io;
            for (let a of o.rows) {
              let { viewPortId: u, rowIndex: c, rowKey: f, updateType: h } = a,
                p = i.get(u);
              p
                ? p.isTree && h === "U" && !f.startsWith("$root")
                  ? console.log("Ignore blank rows sent after GroupBy")
                  : p.handleUpdate(h, c, a)
                : console.warn(
                    `TABLE_ROW message received for non registered viewport ${u}`
                  );
            }
            this.processUpdates(l);
          }
          break;
        case an:
          {
            let { viewPortId: l, from: a, to: u } = o;
            i.get(l).completeOperation(t, a, u);
          }
          break;
        case bn:
        case cn:
          break;
        case hn:
          {
            let {
                childVpId: l,
                childColumnName: a,
                parentVpId: u,
                parentColumnName: c,
              } = o,
              { clientViewportId: f } = this.viewports.get(u),
              h = this.viewports.get(l).completeOperation(t, a, f, c);
            h && this.postMessageToClient(h);
          }
          break;
        case Dn:
          this.postMessageToClient({ type: s, tables: o.tables, requestId: t });
          break;
        case Ln:
          this.postMessageToClient({
            type: s,
            table: o.table,
            columns: o.columns,
            dataTypes: o.dataTypes,
            requestId: t,
          });
          break;
        case Fn:
          {
            let l = this.getActiveLinks(o.links);
            if (l.length) {
              let a = this.viewports.get(o.vpId),
                [u, c] = a.setLinks(l);
              if ((this.postMessageToClient(u), c)) {
                console.log({ pendingLink: c });
                let { colName: f, parentViewportId: h, parentColName: p } = c,
                  d = q(),
                  m = this.mapClientToServerViewport.get(h),
                  g = a.createLink(d, f, m, p);
                this.sendMessageToServer(g, d);
              }
            }
          }
          break;
        case Sn:
          if (o.menu.name) {
            let a = this.viewports.get(o.vpId).setMenu(o.menu);
            this.postMessageToClient(a);
          }
          break;
        case yn:
          {
            let { action: l } = o;
            this.postMessageToClient({
              type: s,
              action: l,
              tableAlreadyOpen: this.isTableOpen(l.table),
              requestId: t,
            });
          }
          break;
        case An:
          {
            let { method: l, result: a } = o;
            this.postMessageToClient({
              type: s,
              method: l,
              result: a,
              requestId: t,
            });
          }
          break;
        case "ERROR":
          console.error(o.msg);
          break;
        default:
          console.log(`handleMessageFromServer,${o.type}.`);
      }
    }
    isTableOpen(e) {
      if (e) {
        let t = e.table;
        for (let s of this.viewports.values())
          if (!s.suspended && s.table === t) return !0;
      }
    }
    getActiveLinks(e) {
      return e.filter((t) => {
        let s = this.viewports.get(t.parentVpId);
        return s && !s.suspended;
      });
    }
    processUpdates(e) {
      let t;
      this.viewports.forEach((s) => {
        if (s.hasUpdatesToProcess) {
          let r = s.getClientRows(e),
            o = s.getNewRowCount();
          (o !== void 0 || r) &&
            ((t = t || { type: "viewport-updates", viewports: {} }),
            (t.viewports[s.clientViewportId] = { rows: r, size: o }));
        }
        t && this.postMessageToClient(t);
      });
    }
  };
var oe;
async function uo(n, e, t, s) {
  let o = await (t ? st : Dt)(n, (i) =>
    i.type === "connection-status" ? s(i) : oe.handleMessageFromServer(i)
  );
  (oe = new qt(o, (i) => ho(i))),
    !e && o.requiresAuthentication && (await oe.authenticate("bill", "pword")),
    o.requiresLogin && (await oe.login(e));
}
var Xt = 0,
  co = [];
function ho(n) {
  let e = Math.round(performance.now());
  Xt && co.push(e - Xt), postMessage(n), (Xt = e);
}
var fo = async ({ data: n }) => {
  switch (n.type) {
    case "connect":
      await uo(n.url, n.token, n.useWebsocket, postMessage),
        postMessage({ type: "connected" });
      break;
    case "subscribe":
      oe.subscribe(n);
      break;
    case "unsubscribe":
      oe.unsubscribe(n.viewport);
      break;
    case "send-websocket-data":
      postMessage({ type: "websocket-data", data: nn() });
      break;
    default:
      oe.handleMessageFromClient(n);
  }
};
self.addEventListener("message", fo);
postMessage({ type: "ready" });
//# sourceMappingURL=worker.js.map

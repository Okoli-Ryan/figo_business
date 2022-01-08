function b(t, n, i = (e) => e) {
  let e = Object.create(null);
  (e.options = n || {}),
    (e.reviver = i),
    (e.value = ""),
    (e.entry = []),
    (e.output = []),
    (e.col = 1),
    (e.row = 1);
  let l = /"|,|\r\n|\n|\r|[^",\r\n]+/y,
    a = /^(\r\n|\n|\r)$/,
    u = [],
    o = "",
    r = 0;
  for (; (u = l.exec(t)) !== null; )
    switch (((o = u[0]), r)) {
      case 0:
        switch (!0) {
          case o === '"':
            r = 3;
            break;
          case o === ",":
            (r = 0), s(e);
            break;
          case a.test(o):
            (r = 0), s(e), c(e);
            break;
          default:
            (e.value += o), (r = 2);
            break;
        }
        break;
      case 2:
        switch (!0) {
          case o === ",":
            (r = 0), s(e);
            break;
          case a.test(o):
            (r = 0), s(e), c(e);
            break;
          default:
            throw (
              ((r = 4),
              Error(`CSVError: Illegal state [row:${e.row}, col:${e.col}]`))
            );
        }
        break;
      case 3:
        switch (!0) {
          case o === '"':
            r = 4;
            break;
          default:
            (r = 3), (e.value += o);
            break;
        }
        break;
      case 4:
        switch (!0) {
          case o === '"':
            (r = 3), (e.value += o);
            break;
          case o === ",":
            (r = 0), s(e);
            break;
          case a.test(o):
            (r = 0), s(e), c(e);
            break;
          default:
            throw Error(`CSVError: Illegal state [row:${e.row}, col:${e.col}]`);
        }
        break;
    }
  return e.entry.length !== 0 && (s(e), c(e)), e.output;
}
function w(t, n = {}, i = (e) => e) {
  let e = Object.create(null);
  (e.options = n),
    (e.options.eof = e.options.eof !== void 0 ? e.options.eof : !0),
    (e.row = 1),
    (e.col = 1),
    (e.output = "");
  let l = /"|,|\r\n|\n|\r/;
  return (
    t.forEach((a, u) => {
      let o = "";
      switch (
        ((e.col = 1),
        a.forEach((r, f) => {
          typeof r == "string" &&
            ((r = r.replace(/"/g, '""')), (r = l.test(r) ? `"${r}"` : r)),
            (o += i(r, e.row, e.col)),
            f !== a.length - 1 && (o += ","),
            e.col++;
        }),
        !0)
      ) {
        case e.options.eof:
        case !e.options.eof && u !== t.length - 1:
          e.output += `${o}
`;
          break;
        default:
          e.output += `${o}`;
          break;
      }
      e.row++;
    }),
    e.output
  );
}
function s(t) {
  let n = t.options.typed ? p(t.value) : t.value;
  t.entry.push(t.reviver(n, t.row, t.col)), (t.value = ""), t.col++;
}
function c(t) {
  t.output.push(t.entry), (t.entry = []), t.row++, (t.col = 1);
}
function p(t) {
  let n = /.\./;
  switch (!0) {
    case t === "true":
    case t === "false":
      return t === "true";
    case n.test(t):
      return parseFloat(t);
    case isFinite(t):
      return parseInt(t);
    default:
      return t;
  }
}
export { b as parse, w as stringify };

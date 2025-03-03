// https://github.com/topojson/topojson-client Version 1.8.0. Copyright 2016 Mike Bostock.
!function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(n.topojson = n.topojson || {})
}(this, function(n) {
    "use strict";
    function t(n) {
        if (!n)
            return h;
        var t,
            r,
            e = n.scale[0],
            o = n.scale[1],
            i = n.translate[0],
            u = n.translate[1];
        return function(n, f) {
            f || (t = r = 0), n[0] = (t += n[0]) * e + i, n[1] = (r += n[1]) * o + u
        }
    }
    function r(n) {
        if (!n)
            return h;
        var t,
            r,
            e = n.scale[0],
            o = n.scale[1],
            i = n.translate[0],
            u = n.translate[1];
        return function(n, f) {
            f || (t = r = 0);
            var c = Math.round((n[0] - i) / e),
                a = Math.round((n[1] - u) / o);
            n[0] = c - t, n[1] = a - r, t = c, r = a
        }
    }
    function e(n, t) {
        for (var r, e = n.length, o = e - t; o < --e;)
            r = n[o], n[o++] = n[e], n[e] = r
    }
    function o(n, t) {
        for (var r = 0, e = n.length; r < e;) {
            var o = r + e >>> 1;
            n[o] < t ? r = o + 1 : e = o
        }
        return r
    }
    function i(n, t) {
        var r = {
            type: "Feature",
            id: t.id,
            properties: t.properties || {},
            geometry: u(n, t)
        };
        return null == t.id && delete r.id, r
    }
    function u(n, r) {
        function o(n, t) {
            t.length && t.pop();
            for (var r, o = l[n < 0 ? ~n : n], i = 0, u = o.length; i < u; ++i)
                t.push(r = o[i].slice()), s(r, i);
            n < 0 && e(t, u)
        }
        function i(n) {
            return n = n.slice(), s(n, 0), n
        }
        function u(n) {
            for (var t = [], r = 0, e = n.length; r < e; ++r)
                o(n[r], t);
            return t.length < 2 && t.push(t[0].slice()), t
        }
        function f(n) {
            for (var t = u(n); t.length < 4;)
                t.push(t[0].slice());
            return t
        }
        function c(n) {
            return n.map(f)
        }
        function a(n) {
            var t = n.type;
            return "GeometryCollection" === t ? {
                type: t,
                geometries: n.geometries.map(a)
            } : t in h ? {
                type: t,
                coordinates: h[t](n)
            } : null
        }
        var s = t(n.transform),
            l = n.arcs,
            h = {
                Point: function(n) {
                    return i(n.coordinates)
                },
                MultiPoint: function(n) {
                    return n.coordinates.map(i)
                },
                LineString: function(n) {
                    return u(n.arcs)
                },
                MultiLineString: function(n) {
                    return n.arcs.map(u)
                },
                Polygon: function(n) {
                    return c(n.arcs)
                },
                MultiPolygon: function(n) {
                    return n.arcs.map(c)
                }
            };
        return a(r)
    }
    function f(n, t, r) {
        function e(n) {
            var t = n < 0 ? ~n : n;
            (a[t] || (a[t] = [])).push({
                i: n,
                g: c
            })
        }
        function o(n) {
            n.forEach(e)
        }
        function i(n) {
            n.forEach(o)
        }
        function u(n) {
            "GeometryCollection" === n.type ? n.geometries.forEach(u) : n.type in s && (c = n, s[n.type](n.arcs))
        }
        var f = [];
        if (arguments.length > 1) {
            var c,
                a = [],
                s = {
                    LineString: o,
                    MultiLineString: i,
                    Polygon: i,
                    MultiPolygon: function(n) {
                        n.forEach(i)
                    }
                };
            u(t), a.forEach(arguments.length < 3 ? function(n) {
                f.push(n[0].i)
            } : function(n) {
                r(n[0].g, n[n.length - 1].g) && f.push(n[0].i)
            })
        } else
            for (var l = 0, h = n.arcs.length; l < h; ++l)
                f.push(l);
        return {
            type: "MultiLineString",
            arcs: v(n, f)
        }
    }
    function c(n) {
        var t = n[0],
            r = n[1],
            e = n[2];
        return Math.abs((t[0] - e[0]) * (r[1] - t[1]) - (t[0] - r[0]) * (e[1] - t[1]))
    }
    function a(n) {
        for (var t, r = -1, e = n.length, o = n[e - 1], i = 0; ++r < e;)
            t = o, o = n[r], i += t[0] * o[1] - t[1] * o[0];
        return i / 2
    }
    function s(n, t) {
        function r(n) {
            n.forEach(function(t) {
                t.forEach(function(t) {
                    (o[t = t < 0 ? ~t : t] || (o[t] = [])).push(n)
                })
            }), i.push(n)
        }
        function e(t) {
            return Math.abs(a(u(n, {
                type: "Polygon",
                arcs: [t]
            }).coordinates[0]))
        }
        var o = {},
            i = [],
            f = [];
        return t.forEach(function(n) {
            "Polygon" === n.type ? r(n.arcs) : "MultiPolygon" === n.type && n.arcs.forEach(r)
        }), i.forEach(function(n) {
            if (!n._) {
                var t = [],
                    r = [n];
                for (n._ = 1, f.push(t); n = r.pop();)
                    t.push(n), n.forEach(function(n) {
                        n.forEach(function(n) {
                            o[n < 0 ? ~n : n].forEach(function(n) {
                                n._ || (n._ = 1, r.push(n))
                            })
                        })
                    })
            }
        }), i.forEach(function(n) {
            delete n._
        }), {
            type: "MultiPolygon",
            arcs: f.map(function(t) {
                var r,
                    i = [];
                if (t.forEach(function(n) {
                    n.forEach(function(n) {
                        n.forEach(function(n) {
                            o[n < 0 ? ~n : n].length < 2 && i.push(n)
                        })
                    })
                }), i = v(n, i), (r = i.length) > 1)
                    for (var u, f, c = 1, a = e(i[0]); c < r; ++c)
                        (u = e(i[c])) > a && (f = i[0], i[0] = i[c], i[c] = f, a = u);
                return i
            })
        }
    }
    function l(n, t) {
        return n[1][2] - t[1][2]
    }
    var h = function() {},
        p = function(n, t) {
            return "GeometryCollection" === t.type ? {
                type: "FeatureCollection",
                features: t.geometries.map(function(t) {
                    return i(n, t)
                })
            } : i(n, t)
        },
        v = function(n, t) {
            function r(t) {
                var r,
                    e = n.arcs[t < 0 ? ~t : t],
                    o = e[0];
                return n.transform ? (r = [0, 0], e.forEach(function(n) {
                    r[0] += n[0], r[1] += n[1]
                })) : r = e[e.length - 1], t < 0 ? [r, o] : [o, r]
            }
            function e(n, t) {
                for (var r in n) {
                    var e = n[r];
                    delete t[e.start], delete e.start, delete e.end, e.forEach(function(n) {
                        o[n < 0 ? ~n : n] = 1
                    }), f.push(e)
                }
            }
            var o = {},
                i = {},
                u = {},
                f = [],
                c = -1;
            return t.forEach(function(r, e) {
                var o,
                    i = n.arcs[r < 0 ? ~r : r];
                i.length < 3 && !i[1][0] && !i[1][1] && (o = t[++c], t[c] = r, t[e] = o)
            }), t.forEach(function(n) {
                var t,
                    e,
                    o = r(n),
                    f = o[0],
                    c = o[1];
                if (t = u[f])
                    if (delete u[t.end], t.push(n), t.end = c, e = i[c]) {
                        delete i[e.start];
                        var a = e === t ? t : t.concat(e);
                        i[a.start = t.start] = u[a.end = e.end] = a
                    } else
                        i[t.start] = u[t.end] = t;
                else if (t = i[c])
                    if (delete i[t.start], t.unshift(n), t.start = f, e = u[f]) {
                        delete u[e.end];
                        var s = e === t ? t : e.concat(t);
                        i[s.start = e.start] = u[s.end = t.end] = s
                    } else
                        i[t.start] = u[t.end] = t;
                else
                    t = [n], i[t.start = f] = u[t.end = c] = t
            }), e(u, i), e(i, u), t.forEach(function(n) {
                o[n < 0 ? ~n : n] || f.push([n])
            }), f
        },
        g = function(n) {
            return u(n, f.apply(this, arguments))
        },
        d = function(n) {
            return u(n, s.apply(this, arguments))
        },
        y = function(n) {
            function t(n, t) {
                n.forEach(function(n) {
                    n < 0 && (n = ~n);
                    var r = i[n];
                    r ? r.push(t) : i[n] = [t]
                })
            }
            function r(n, r) {
                n.forEach(function(n) {
                    t(n, r)
                })
            }
            function e(n, t) {
                "GeometryCollection" === n.type ? n.geometries.forEach(function(n) {
                    e(n, t)
                }) : n.type in f && f[n.type](n.arcs, t)
            }
            var i = {},
                u = n.map(function() {
                    return []
                }),
                f = {
                    LineString: t,
                    MultiLineString: r,
                    Polygon: r,
                    MultiPolygon: function(n, t) {
                        n.forEach(function(n) {
                            r(n, t)
                        })
                    }
                };
            n.forEach(e);
            for (var c in i)
                for (var a = i[c], s = a.length, l = 0; l < s; ++l)
                    for (var h = l + 1; h < s; ++h) {
                        var p,
                            v = a[l],
                            g = a[h];
                        (p = u[v])[c = o(p, g)] !== g && p.splice(c, 0, g), (p = u[g])[c = o(p, v)] !== v && p.splice(c, 0, v)
                    }
            return u
        },
        m = function() {
            function n(n, t) {
                for (; t > 0;) {
                    var r = (t + 1 >> 1) - 1,
                        o = e[r];
                    if (l(n, o) >= 0)
                        break;
                    e[o._ = t] = o, e[n._ = t = r] = n
                }
            }
            function t(n, t) {
                for (;;) {
                    var r = t + 1 << 1,
                        i = r - 1,
                        u = t,
                        f = e[u];
                    if (i < o && l(e[i], f) < 0 && (f = e[u = i]), r < o && l(e[r], f) < 0 && (f = e[u = r]), u === t)
                        break;
                    e[f._ = t] = f, e[n._ = t = u] = n
                }
            }
            var r = {},
                e = [],
                o = 0;
            return r.push = function(t) {
                return n(e[t._ = o] = t, o++), o
            }, r.pop = function() {
                if (!(o <= 0)) {
                    var n,
                        r = e[0];
                    return --o > 0 && (n = e[o], t(e[n._ = 0] = n, 0)), r
                }
            }, r.remove = function(r) {
                var i,
                    u = r._;
                if (e[u] === r)
                    return u !== --o && (i = e[o], (l(i, r) < 0 ? n : t)(e[i._ = u] = i, u)), u
            }, r
        },
        E = function(n, e) {
            function o(n) {
                f.remove(n), n[1][2] = e(n), f.push(n)
            }
            var i = t(n.transform),
                u = r(n.transform),
                f = m();
            return null == e && (e = c), n.arcs.forEach(function(n) {
                var t,
                    r,
                    c,
                    a,
                    s = [],
                    l = 0;
                for (r = 0, c = n.length; r < c; ++r)
                    a = n[r], i(n[r] = [a[0], a[1], 1 / 0], r);
                for (r = 1, c = n.length - 1; r < c; ++r)
                    t = n.slice(r - 1, r + 2), t[1][2] = e(t), s.push(t), f.push(t);
                for (r = 0, c = s.length; r < c; ++r)
                    t = s[r], t.previous = s[r - 1], t.next = s[r + 1];
                for (; t = f.pop();) {
                    var h = t.previous,
                        p = t.next;
                    t[1][2] < l ? t[1][2] = l : l = t[1][2], h && (h.next = p, h[2] = t[2], o(h)), p && (p.previous = h, p[0] = t[0], o(p))
                }
                n.forEach(u)
            }), n
        };
    n.mesh = g, n.meshArcs = f, n.merge = d, n.mergeArcs = s, n.feature = p, n.neighbors = y, n.presimplify = E, Object.defineProperty(n, "__esModule", {
        value: !0
    })
});


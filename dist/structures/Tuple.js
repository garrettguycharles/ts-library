"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuple = void 0;
class Tuple {
    a;
    b;
    c;
    d;
    e;
    f;
    g;
    h;
    i;
    j;
    k;
    l;
    m;
    n;
    o;
    p;
    constructor(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.j = j;
        this.k = k;
        this.l = l;
        this.m = m;
        this.n = n;
        this.o = o;
        this.p = p;
    }
    static of(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        return new Tuple(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
    }
}
exports.Tuple = Tuple;
//# sourceMappingURL=Tuple.js.map
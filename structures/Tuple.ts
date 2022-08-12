export class Tuple<A, B, C=undefined, D=undefined, E=undefined, F=undefined, G=undefined, H=undefined, I=undefined, J=undefined, K=undefined, L=undefined, M=undefined, N=undefined, O=undefined, P=undefined, Q=undefined> {
    a: A;
    b: B;
    c?: C;
    d?: D;
    e?: E;
    f?: F;
    g?: G;
    h?: H;
    i?: I;
    j?: J;
    k?: K;
    l?: L;
    m?: M;
    n?: N;
    o?: O;
    p?: P;


    constructor(a: A, b: B, c?: C, d?: D, e?: E, f?: F, g?: G, h?: H, i?: I, j?: J, k?: K, l?: L, m?: M, n?: N, o?: O, p?: P) {
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

    static of<A, B, C=undefined, D=undefined, E=undefined, F=undefined, G=undefined, H=undefined, I=undefined, J=undefined, K=undefined, L=undefined, M=undefined, N=undefined, O=undefined, P=undefined, Q=undefined>(a: A, b: B, c?: C, d?: D, e?: E, f?: F, g?: G, h?: H, i?: I, j?: J, k?: K, l?: L, m?: M, n?: N, o?: O, p?: P) {
        return new Tuple(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
    }
}
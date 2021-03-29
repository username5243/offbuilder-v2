import * as math from "../classes/math.js";

export const polygon = function(n, m, d, r) {
    const res = [];

    for(let i = 0; i < n; i++)
        res.push([math.cos(i+m, d*n)*r, math.sin(i+m, d*n)*r]);

    return res;
}
globalThis.polygon = polygon;

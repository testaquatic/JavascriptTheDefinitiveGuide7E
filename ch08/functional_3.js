/**
 *
 * @param {number[]} a
 * @param  {[callbackfn: (value: number, index: number, array: number[]) => number, thisArg?: any]} args
 * @returns {number}
 */
const map = function (a, ...args) {
    return a.map(...args);
};

/**
 *
 * @param {number[]} a
 * @param  {[callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number]} args
 * @returns {number}
 */
const reduce = function (a, ...args) {
    return a.reduce(...args);
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns
 */
const sum = (x, y) => x + y;

/**
 *
 * @param {number} x
 * @returns
 */
const square = (x) => x * x;

let data = [1, 1, 3, 5, 5];
let mean = reduce(data, sum) / data.length;
let deviation = map(data, (x) => x - mean);
let stddev = Math.sqrt(reduce(map(deviation, square), sum) / (data.length - 1));
stddev;

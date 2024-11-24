const sum = (x, y) => x + y;
const square = (x) => x * x;

/**
 * 
 * @param {[number]} data 
 * @returns 
 */
exports.mean = data => data.reduce(sum) / data.length;

/**
 * 
 * @param {[number]} d
 * @returns 
 */
exports.stddev = function(d) {
    let m = exports.mean(d);
    return Math.sqrt(
        d.map(x => x - m).map(square).reduce(sum)/(d.length - 1)
    );
}
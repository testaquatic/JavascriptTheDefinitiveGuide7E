/**
 * @type {Array<number>}
 */
let data = [1, 1, 3, 5, 5];

let total = 0;
for (let i = 0; i < data.length; i++) {
    total += data[i];
}
let mean = total / data.length;

total = 0;
for (let i = 0; i < data.length; i++) {
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total / (data.length - 1));

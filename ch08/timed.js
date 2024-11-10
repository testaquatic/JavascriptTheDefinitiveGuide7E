/**
 *
 * @param {Function} f
 * @returns {Function}
 */
function timed(f) {
    return function (...args) {
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            return f(...args);
        } finally {
            console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
        }
    };
}

/**
 *
 * @param {number} n
 * @returns {number}
 */
function benchmark(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

timed(benchmark)(1000000);

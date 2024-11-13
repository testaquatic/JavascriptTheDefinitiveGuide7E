/**
 *
 * @param {function} f
 * @param  {...any} outerArgs
 * @returns {function}
 */
function partialLeft(f, ...outerArgs) {
    return function (...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        return f.apply(this, args);
    };
}

/**
 *
 * @param {function} f
 * @param  {...any} outerArgs
 * @returns {function}
 */
function partialRight(f, ...outerArgs) {
    return function (...innerArgs) {
        let args = [...innerArgs, ...outerArgs];
        return f.apply(this, args);
    };
}

/**
 *
 * @param {function (...params): any} f
 * @param  {...any} outerArgs
 * @returns {function}
 */
function partial(f, ...outerArgs) {
    return function (...innerArgs) {
        let args = [...outerArgs];
        let innerIndex = 0;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined) {
                args[i] = innerArgs[innerIndex++];
            }
        }

        args.push(...innerArgs.slice(innerIndex));

        return f.apply(this, args);
    };
}

/**
 *
 * @param {function (...any): any} f
 * @param {function (...any): any} g
 * @returns
 */
function compose(f, g) {
    return function (...args) {
        return f.call(this, g.apply(this, args));
    };
}

const sum = (x, y) => x + y;
const square = (x) => x * x;
/**
 *
 * @param {any[]} a
 * @param  {...any} args
 */
const map = function (a, ...args) {
    return a.map(...args);
};
/**
 *
 * @param {any[]} a
 * @param  {...any} args
 * @returns
 */
const reduce = function (a, ...args) {
    return a.reduce(...args);
};
const product = (x, y) => x * y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, 0.5);
const reciprocal = partial(Math.pow, undefined, neg(1));

let data = [1, 1, 3, 5, 5];
let mean = product(reduce(data, sum), reciprocal(data.length));
let stddev = sqrt(
    product(
        reduce(map(data, compose(square, partial(sum, neg(mean)))), sum),
        reciprocal(sum(data.length, neg(1)))
    )
);

[mean, stddev];

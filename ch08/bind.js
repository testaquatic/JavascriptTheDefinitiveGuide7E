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
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number}
 */
const f = function (x, y, z) {
    return x * (y - z);
};
partialLeft(f, 2)(3, 4); // 2 * (3 - 4)
partialRight(f, 2)(3, 4); // 3 * (4 - 2)
partial(f, undefined, 2)(3, 4); // 3 * (2 - 4)

const sum = (x, y) => x + y;
const increment = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1 / 3);
cuberoot(increment(26));

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

const not = partialLeft(compose, (x) => !x);
const even = (x) => x % 2 === 0;
const odd = not(even);
const isNumber = not(isNaN);
odd(3) && isNumber(2);

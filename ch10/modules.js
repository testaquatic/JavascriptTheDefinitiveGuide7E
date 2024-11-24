const modules = {};

/**
 *
 * @param {string} moduleName
 * @returns
 */
function require(moduleName) {
    return modules[moduleName];
}

modules["sets.js"] = (function () {
    const exports = {};

    exports.BitSet = class BitSet {
        #max;
        #n;
        #numBytes;
        #data;

        static #bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);

        /**
         *
         * @param {number} max
         */
        constructor(max) {
            this.#max = max;
            this.#n = 0;
            this.#numBytes = Math.floor(max / 8) + 1;
            this.#data = new Uint8Array(this.#numBytes);
        }

        /**
         *
         * @param {number} x
         * @returns
         */
        #valid(x) {
            return Number.isInteger(x) && x >= 0 && this.#max;
        }

        /**
         *
         * @param {number} byte
         * @param {number} bit
         * @returns
         */
        #has(byte, bit) {
            return (this.#data[byte] & BitSet.#bits[bit]) != 0;
        }

        /**
         *
         * @param {number} x
         * @returns
         */
        has(x) {
            if (this.#valid(x)) {
                let byte = Math.floor(x / 8);
                let bit = x % 8;
                return this.#has(byte, bit);
            }
            return false;
        }

        /**
         *
         * @param {number} x
         * @returns
         */
        insert(x) {
            if (this.#valid(x)) {
                let byte = Math.floor(x / 8);
                let bit = x % 8;
                if (!this.#has(byte, bit)) {
                    this.#data[byte] |= BitSet.#bits[bit];
                    this.#n++;
                }
            } else {
                throw new TypeError(`Invalid set element: ${x}`);
            }
        }

        *[Symbol.iterator]() {
            for (let i = 0; i <= this.#max; i++) {
                if (this.has(i)) {
                    yield i;
                }
            }
        }
    };

    return exports;
})();

modules["stats.js"] = (function () {
    const exports = {};

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
    /**
     *
     * @param {[number]} data
     * @returns
     */
    exports.mean = function (data) {
        return data.reduce(sum) / data.length;
    };
    /**
     *
     * @param {[number]} data
     */
    exports.stddev = function (data) {
        let m = data.reduce(sum) / data.length;
        return (
            data
                .map((x) => x - m)
                .map(square)
                .reduce(sum) /
            (data.length - 1)
        );
    };

    return exports;
})();

const stats = require("stats.js");
const BitSet = require("sets.js").BitSet;

let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);

// 평균은 20이다.
average;

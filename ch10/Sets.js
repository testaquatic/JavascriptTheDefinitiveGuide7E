class AbstractSet {
    /**
     *
     * @param {*} x
     * @returns {boolean}
     */
    has(x) {
        throw new Error("Abstract method");
    }
}

class NotSet extends AbstractSet {
    constructor(set) {
        super();
        this.set = set;
    }

    has(x) {
        return !this.set.has(x);
    }

    toString() {
        return `{x| x ∉ ${this.set.toString()} }`;
    }
}

class RangeSet extends AbstractSet {
    /**
     * @type {number}
     */
    #from;
    /**
     * @type {number}
     */
    #to;
    /**
     *
     * @param {number} from
     * @param {number} to
     */
    constructor(from, to) {
        super();
        this.#from = from;
        this.#to = to;
    }

    /**
     *
     * @param {number} x
     * @returns
     */
    has(x) {
        return x >= this.#from && x <= this.#to;
    }

    toString() {
        return `{x | ${this.from} <= x <= ${this.to} }`;
    }
}

class AbstractEnumerableSet extends AbstractSet {
    /**
     * @type {number}
     */
    #size;

    get size() {
        throw new Error(`Abstract method`);
    }

    [Symbol.iterator]() {
        throw new Error("Abstract method");
    }

    isEmpty() {
        return this.#size === 0;
    }

    toString() {
        return `{${Array.from(this).join(", ")}}`;
    }

    /**
     *
     * @param {AbstractEnumerableSet} set
     * @returns {boolean}
     */
    equals(set) {
        if (!(set instanceof AbstractEnumerableSet)) {
            return false;
        }

        if (this.#size !== set.#size) {
            return false;
        }

        for (let element of this) {
            if (!set.has(element)) {
                return false;
            }
        }

        return true;
    }
}

class singletonSet extends AbstractEnumerableSet {
    #member;
    constructor(member) {
        super();
        this.#member = member;
    }

    hax(x) {
        return x === this.#member;
    }

    get size() {
        return 1;
    }

    *[Symbol.iterator]() {
        yield this.member;
    }
}

class AbstractWritableSet extends AbstractEnumerableSet {
    insert(x) {
        throw new Error("Abstract method");
    }

    remove(x) {
        throw new Error("Abstract method");
    }

    /**
     *
     * @param {AbstractWritableSet} set
     */
    add(set) {
        for (let element of set) {
            this.insert(element);
        }
    }

    subtract(set) {
        for (let element of set) {
            this.remove(element);
        }
    }

    intersect(set) {
        for (let element of this) {
            if (!set.has(element)) {
                this.remove(element);
            }
        }
    }
}

module.exports = class BitSet extends AbstractWritableSet {
    #max;
    #n;
    #numBytes;
    #data;

    static #bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
    static #masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
    /**
     *
     * @param {number} max
     */
    constructor(max) {
        super();
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
        return Number.isInteger(x) && x >= 0 && x <= this.#max;
    }

    /**
     *
     * @param {number} byte
     * @param {number} bit
     * @returns
     */
    #has(byte, bit) {
        return (this.#data[byte] & BitSet.bits[bit]) !== 0;
    }

    /**
     *
     * @param {number} x
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
            throw new TypeError("Invalid set element: " + x);
        }
    }

    /**
     *
     * @param {number} x
     */
    remove(x) {
        if (this.#valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            if (this.#has(byte, bit)) {
                this.#data[byte] &= BitSet.#masks[bit];
                this.n--;
            }
        } else {
            throw new TypeError("Invalid set element: " + x);
        }
    }

    get size() {
        return this.#n;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i <= this.max; i++) {
            if (this.has[i]) {
                yield i;
            }
        }
    }
}

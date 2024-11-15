class Range {
    /**
     *
     * @param {number} from
     * @param {number} to
     */

    #from = 0;
    #to = 0;
    static #integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;

    constructor(from, to) {
        this.#from = from;
        this.#to = to;
    }

    includes(x) {
        return this.#from <= x && x <= this.#to;
    }

    *[Symbol.iterator]() {
        for (let x = Math.ceil(this.#from); x <= this.#to; x++) {
            yield x;
        }
    }

    toString() {
        return `(${this.#from}...${this.#to})`;
    }

    /**
     *
     * @param {string} s
     */
    static parse(s) {
        let matches = s.match(Range.#integerRangePattern);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from "${s}".`);
        }
        return new Range(parseInt(matches[1]), parseInt(matches[2]));
    }
}

class Span extends Range {
    /**
     *
     * @param {number} start
     * @param {number} length
     */
    constructor(start, length) {
        if (length >= 0) {
            super(start, start + length);
        } else {
            super(start + length, start);
        }
    }
}

let r = Range.parse("(1...10)");
[...r];

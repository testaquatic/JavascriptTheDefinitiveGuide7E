class Complex {
    /**
     * 실수부
     * @type {number}
     */
    #r = 0;
    /**
     * 허수부
     * @type {number}
     */
    #i = 0;

    constructor(real, imaginary) {
        this.#r = real;
        this.#i = imaginary;
    }

    /**
     *
     * @param {Complex} that
     * @returns
     */
    plus(that) {
        return new Complex(this.#r + that.#r, this.#i + that.#i);
    }

    /**
     *
     * @param {Complex} that
     * @returns
     */
    times(that) {
        return new Complex(
            this.#r * that.#r - this.#i * that.#i,
            this.#r * that.#i + this.#i * that.#r
        );
    }

    static sum(c, d) {
        return c.plus(d);
    }

    static product(c, d) {
        return c.times(d);
    }

    get real() {
        return this.#r;
    }

    get imaginary() {
        return this.#i;
    }

    get magnitude() {
        return Math.hypot(this.#r, this.#i);
    }

    toString() {
        return `{${this.#r},${this.#i}}`;
    }

    /**
     *
     * @param {Complex} that
     */
    equals(that) {
        return (
            that instanceof Complex && this.#r == that.#r && this.#i == that.#i
        );
    }

    static ZERO = new Complex(0, 0);
    static ONE = new Complex(1, 0);
    static I = new Complex(0, 1);
}

Complex.prototype.conj = function () {
    return new Complex(this.real(), -this.imaginary());
};

let c = new Complex(2, 3);
let d = new Complex(c.imaginary, c.real);
c.plus(d).toString();
c.magnitude;
Complex.product(c, d);
Complex.ZERO.toString();

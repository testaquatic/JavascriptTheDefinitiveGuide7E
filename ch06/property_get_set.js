let p = {
    x: 1.0,
    y: 1.0,

    /**
     * @returns {number}
     */
    get r() {
        return Math.hypot(this.x, this.y);
    },

    /**
     * @param {number} newvalue
     */
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    /**
     * @returns {number}
     */
    get theta() {
        return Math.atan2(this.y, this.x);
    },
};

let q = Object.create(p);
q.x = 3;
q.y = 4;
q.r;
q.theta;

const serialnum = {
    /**
     * @type {number}
     */
    _n: 0,

    /**
     * @returns {number}
     */
    get next() {
        return this._n++;
    },

    /**
     * @param {number} n
     */
    set next(n) {
        if (n > this._n) {
            this._n = n;
        } else {
            throw new Error("serial number can only be set to a larger.");
        }
    },
};

serialnum = 10;
serialnum.next;
serialnum.next;

const stats = (function () {
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
    function mean(data) {
        return data.reduce(sum) / data.length;
    }

    /**
     *
     * @param {[number]} data
     * @returns
     */
    function stddev(data) {
        let m = mean(data);
        return Math.sqrt(
            data
                .map((x) => x - m)
                .map(square)
                .reduce(sum) /
                (data.length - 1)
        );
    }

    return { mean, stddev };
})();

stats.mean([1, 3, 5, 7, 9]);
stats.stddev([1, 3, 5, 7, 9]);

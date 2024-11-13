/**
 *
 * @param {*} o
 * @param {string} name
 * @param {Function} predicate
 */
function addPrivateProperty(o, name, predicate) {
    let value;

    o[`get${name}`] = function () {
        return value;
    };

    o[`set${name}`] = function (v) {
        if (predicate && !predicate(v)) {
            throw new TypeError(`set${name}: invalid value ${v}`);
        } else {
            value = v;
        }
    };
}

let o = {};

addPrivateProperty(o, "Name", (x) => typeof x === "string");
o.setName("Frank");
o.getName;
o.setName();

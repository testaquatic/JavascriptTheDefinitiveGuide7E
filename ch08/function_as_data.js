// 단순한 함수를 몇개 정의한다.
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

/**
 * 함수를 인자로 받는다.
 * @param {Function} operator
 * @param {any} operand1
 * @param {any} operand2
 * @returns {any}
 */
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

/**
 * @type {number}
 */
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

// 함수를 객체 리터럴로 만든다.
const operators = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
    multiply: (x, y) => x * y,
    divide: (x, y) => x / y,
    pow: Math.pow,
};

/**
 *
 * @param {string} operation
 * @param {*} operand1
 * @param {*} operand2
 * @returns {*}
 */
function operate2(operation, operand1, operand2) {
    if (typeof operators[operation] == "function") {
        return operators[operation](operand1, operand2);
    } else {
        throw "unknown operator";
    }
}

operate2("add", "hello", operate2("add", " ", "world"));
operate2("pow", 10, 2);

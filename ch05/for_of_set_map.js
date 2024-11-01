/**
 * @type {string}
 */
let text = "Na na na na na na an na Batmat!";
let wordSet = new Set(text.split(" "));
/**
 * @type {Array<string>}
 */
let unique = [];
for (let word of wordSet) {
    unique.push(word);
}

unique;

/**
 * Basic Calculator II
 * 
 * Strategy: We use a variable 'lastNumber' to keep track of the result of the 
 * most recent multiplication or division, and 'result' to accumulate the sum 
 * of already processed terms. When we encounter '+' or '-', we add the 
 * 'lastNumber' to the 'result' and start a new term. When we encounter '*' or 
 * '/', we update 'lastNumber' immediately by performing the operation with 
 * the 'currentNumber'. This effectively respects operator precedence without 
 * needing a full stack for simple cases.
 * 
 * Time Complexity: O(N) where N is the length of the string. We traverse the string once.
 * Space Complexity: O(1) as we only use a few variables to store numbers and signs.
 */

/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
    if (!s) return 0;

    let currentNumber = 0;
    let lastNumber = 0;
    let result = 0;
    let operation = '+';

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + (char - '0');
        }

        if ((isNaN(char) && char !== ' ') || i === s.length - 1) {
            if (operation === '+') {
                result += lastNumber;
                lastNumber = currentNumber;
            } else if (operation === '-') {
                result += lastNumber;
                lastNumber = -currentNumber;
            } else if (operation === '*') {
                lastNumber = lastNumber * currentNumber;
            } else if (operation === '/') {
                lastNumber = Math.trunc(lastNumber / currentNumber);
            }

            operation = char;
            currentNumber = 0;
        }
    }

    result += lastNumber;
    return result;
}

// Example Test Cases
console.log("Test 1:", calculate("3+2*2"));      // Expected: 7
console.log("Test 2:", calculate(" 3/2 "));      // Expected: 1
console.log("Test 3:", calculate(" 3+5 / 2 "));  // Expected: 5
console.log("Test 4:", calculate("14-3/2"));     // Expected: 13

module.exports = calculate;

/**
 * Letter Combinations of a Phone Number
 * 
 * Strategy: We use backtracking to explore all possible letter combinations.
 * We maintain a map of digits to letters. At each step, we pick a digit, 
 * iterate through its letters, and recurse for the next digit.
 * 
 * Time Complexity: O(4^N) where N is the length of digits.
 * Space Complexity: O(N) for recursion stack.
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
    if (!digits) return [];

    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const res = [];

    function backtrack(index, currentStr) {
        if (index === digits.length) {
            res.push(currentStr);
            return;
        }

        const letters = map[digits[index]];
        for (const char of letters) {
            backtrack(index + 1, currentStr + char);
        }
    }

    backtrack(0, "");
    return res;
}

// Example Test Case
console.log("Test 1:", letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log("Test 2:", letterCombinations(""));   // []

module.exports = letterCombinations;

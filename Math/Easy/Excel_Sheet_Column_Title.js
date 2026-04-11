// Problem: Excel Sheet Column Title
// Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

// Example 1:
// Input: columnNumber = 1
// Output: "A"

// Example 2:
// Input: columnNumber = 28
// Output: "AB"

// Example 3:
// Input: columnNumber = 701
// Output: "ZY"

// Constraints:
// 1 <= columnNumber <= 2^31 - 1

/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
    let result = "";

    while (columnNumber > 0) {
        columnNumber--; // Adjust to 0-indexed for modulo arithmetic
        let charCode = columnNumber % 26;
        result = String.fromCharCode(65 + charCode) + result;
        columnNumber = Math.floor(columnNumber / 26);
    }

    return result;
};

// Notes:
// - This is essentially converting a base-10 number to base-26.
// - However, it's 1-indexed (A=1, B=2...), so we subtract 1 at each step to handle the mapping correctly.
// - 65 is the ASCII code for 'A'.
// - Time Complexity: O(log26 N)
// - Space Complexity: O(1) (ignoring output string complexity)

module.exports = { convertToTitle };

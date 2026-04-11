// Problem: Excel Sheet Column Number
// Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.

// Example 1:
// Input: columnTitle = "A"
// Output: 1

// Example 2:
// Input: columnTitle = "AB"
// Output: 28

// Example 3:
// Input: columnTitle = "ZY"
// Output: 701

// Constraints:
// 1 <= columnTitle.length <= 7
// columnTitle consists only of uppercase English letters.
// columnTitle is in the range ["A", "FXSHRXW"].

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
    let result = 0;

    for (let i = 0; i < columnTitle.length; i++) {
        let charValue = columnTitle.charCodeAt(i) - 64; // 'A' is 65, so 'A' - 64 = 1
        result = result * 26 + charValue;
    }

    return result;
};

// Notes:
// - This is converting from base-26 to base-10.
// - Each character contributes to the total value based on its position and face value (A=1, B=2...).
// - result = result * 26 + currentDigitValue.
// - Time Complexity: O(N) where N is length of string.
// - Space Complexity: O(1)

module.exports = { titleToNumber };

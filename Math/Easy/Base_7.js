// Problem: Base 7
// Given an integer num, return a string of its base 7 representation.

// Example 1:
// Input: num = 100
// Output: "202"

// Example 2:
// Input: num = -7
// Output: "-10"

// Constraints:
// -10^7 <= num <= 10^7

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
    if (num === 0) return "0";

    let isNegative = num < 0;
    num = Math.abs(num);
    let result = "";

    while (num > 0) {
        result = (num % 7) + result;
        num = Math.floor(num / 7);
    }

    return isNegative ? "-" + result : result;
};

// Notes:
// - Standard base conversion using modulo and division.
// - Handle the sign separately to simplify the logic.
// - Time Complexity: O(log7 N)
// - Space Complexity: O(log7 N) for the result string.

module.exports = { convertToBase7 };

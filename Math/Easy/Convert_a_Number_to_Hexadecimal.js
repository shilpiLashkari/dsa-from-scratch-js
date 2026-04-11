// Problem: Convert a Number to Hexadecimal
// Given an integer num, return a string representing its hexadecimal representation. 
// For negative integers, two’s complement method is used.

// Example 1:
// Input: num = 26
// Output: "1a"

// Example 2:
// Input: num = -1
// Output: "ffffffff"

// Constraints:
// -2^31 <= num <= 2^31 - 1

/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
    if (num === 0) return "0";

    const hexChars = "0123456789abcdef";
    let result = "";

    // JavaScript's unsigned right shift operator (>>>) treats the operand as a 32-bit unsigned integer.
    // This handles negative numbers (two's complement) automatically.
    let n = num >>> 0;

    while (n > 0) {
        let digit = n % 16;
        result = hexChars[digit] + result;
        n = Math.floor(n / 16);
    }

    return result;
};

// Notes:
// - Hexadecimal is base-16.
// - Negative numbers are represented in two's complement.
// - `num >>> 0` in JavaScript converts the number into a 32-bit unsigned integer, representing the same bit pattern.
// - Time Complexity: O(1) - The number of digits is at most 8 (for 32-bit integers).
// - Space Complexity: O(1)

module.exports = { toHex };

// Problem: Reverse Integer
// Given a signed 32-bit integer x, return x with its digits reversed. 
// If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

// Example 1:
// Input: x = 123
// Output: 321

// Example 2:
// Input: x = -123
// Output: -321

// Example 3:
// Input: x = 120
// Output: 21

// Constraints:
// -2^31 <= x <= 2^31 - 1

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let originalNumber = x;
    let reverse = 0;
    x = Math.abs(x);

    while (x > 0) {
        reverse = reverse * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    let limit = 2 ** 31;
    if (reverse < -limit || reverse > limit) return 0;
    return originalNumber < 0 ? -reverse : reverse;
};

// Notes:
// - The problem asks to reverse the digits of a 32-bit signed integer.
// - We must handle the overflow case where the reversed integer exceeds the 32-bit range.
// - We take the absolute value for reversing and re-apply the sign at the end.
// - Time Complexity: O(log10(n)) - We process each digit of the number.
// - Space Complexity: O(1) - Constant extra space used for variables.

module.exports = { reverse };

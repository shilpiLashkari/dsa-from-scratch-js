// Problem: Power of Four
// Given an integer n, return true if it is a power of four. Otherwise, return false.
// An integer n is a power of four if there exists an integer x such that n == 4^x.

// Example 1:
// Input: n = 16
// Output: true

// Example 2:
// Input: n = 5
// Output: false

// Example 3:
// Input: n = 1
// Output: true

// Constraints:
// -2^31 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
    if (n <= 0) return false;

    // Check if n is a power of 2: (n & (n - 1)) === 0
    // Check if (n - 1) is divisible by 3: (n - 1) % 3 === 0
    // 4^x - 1 = (2^x - 1)(2^x + 1) is always divisible by 3.
    return (n & (n - 1)) === 0 && (n - 1) % 3 === 0;
};

// Notes:
// - A number is a power of 4 if:
//   1. It is positive.
//   2. It is a power of 2 (only one bit set).
//   3. The set bit is at an even position (0, 2, 4...).
// - Mathematical property: (4^x - 1) is always divisible by 3.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { isPowerOfFour };

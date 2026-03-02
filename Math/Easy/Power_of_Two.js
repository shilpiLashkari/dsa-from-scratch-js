// Problem: Power of Two
// Given an integer n, return true if it is a power of two. Otherwise, return false.
// An integer n is a power of two, if there exists an integer x such that n == 2^x.

// Example 1:
// Input: n = 1
// Output: true
// Explanation: 2^0 = 1

// Example 2:
// Input: n = 16
// Output: true
// Explanation: 2^4 = 16

// Example 3:
// Input: n = 3
// Output: false

// Constraints:
// -2^31 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    // A power of two is always greater than 0
    // In binary, a power of two has exactly one bit set: 100...0
    // n - 1 will have all bits to the right of that bit set: 011...1
    // So n & (n - 1) will be 0 if n is a power of two
    return n > 0 && (n & (n - 1)) === 0;
};

// Notes:
// - The most efficient way is using bitwise operators.
// - A number n is a power of two if (n > 0) and (n & (n - 1) == 0).
// - Time Complexity: O(1) - Bitwise operations are constant time.
// - Space Complexity: O(1) - No extra space used.

module.exports = { isPowerOfTwo };

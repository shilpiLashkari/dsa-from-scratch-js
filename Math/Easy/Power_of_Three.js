// Problem: Power of Three
// Given an integer n, return true if it is a power of three. Otherwise, return false.
// An integer n is a power of three if there exists an integer x such that n == 3^x.

// Example 1:
// Input: n = 27
// Output: true
// Explanation: 27 = 3^3

// Example 2:
// Input: n = 0
// Output: false

// Example 3:
// Input: n = -1
// Output: false

// Constraints:
// -2^31 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    if (n <= 0) return false;

    // A simple way is to repeatedly divide by 3
    /*
    while (n % 3 === 0) {
        n /= 3;
    }
    return n === 1;
    */

    // Alternatively, since 3 is a prime number, any power of 3 will be a divisor of the maximum power of 3 that fits in an integer.
    // 3^19 = 1,162,261,467 is the largest power of 3 less than 2^31 - 1.
    return 1162261467 % n === 0;
};

// Notes:
// - We can use iterative division or a mathematical property.
// - Mathematical property: If 3^x = n, then n must be a divisor of the largest power of 3 that fits in the integer range.
// - This only works because 3 is a prime number.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { isPowerOfThree };

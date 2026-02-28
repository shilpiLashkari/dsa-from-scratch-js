// Problem: Sqrt(x)
// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. 
// The returned integer should be non-negative as well.
// You must not use any built-in exponent function or operator.

// Example 1:
// Input: x = 4
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

// Example 2:
// Input: x = 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

// Constraints:
// 0 <= x <= 2^31 - 1

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x < 2) return x;

    let left = 2;
    let right = Math.floor(x / 2);
    let pivot;
    let num;

    while (left <= right) {
        pivot = left + Math.floor((right - left) / 2);
        num = pivot * pivot;
        if (num > x) {
            right = pivot - 1;
        } else if (num < x) {
            left = pivot + 1;
        } else {
            return pivot;
        }
    }

    return right;
};

// Notes:
// - We use Binary Search to find the square root.
// - For x < 2, the square root is x itself (0 or 1).
// - For x >= 2, the square root is always less than x/2 and greater than 1.
// - We keep a range [left, right] where the square root might be.
// - Time Complexity: O(log N) - Binary Search approach.
// - Space Complexity: O(1) - Constant space used.

module.exports = { mySqrt };

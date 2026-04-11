// Problem: Valid Perfect Square
// Given a positive integer num, return true if num is a perfect square or false otherwise.
// A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.
// You must not use any built-in library function, such as sqrt.

// Example 1:
// Input: num = 16
// Output: true
// Explanation: 16 = 4 * 4 and 4 is an integer.

// Example 2:
// Input: num = 14
// Output: false
// Explanation: 14 is not a perfect square since 3.742 * 3.742 = 14 and 3.742 is not an integer.

// Constraints:
// 1 <= num <= 2^31 - 1

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    if (num < 1) return false;

    let left = 1;
    let right = num;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        let square = mid * mid;

        if (square === num) {
            return true;
        } else if (square < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
};

// Notes:
// - We use Binary Search to find if there exists an integer x such that x*x = num.
// - This is similar to finding the square root of a number.
// - Time Complexity: O(log N)
// - Space Complexity: O(1)

module.exports = { isPerfectSquare };

// Problem: A Number After a Double Reversal
// Reversing an integer means to reverse all its digits.
// For example, reversing 2021 gives 1202. Reversing 12300 gives 321 as the leading zeros are not retained.
// Given an integer num, reverse num to get reversed1, then reverse reversed1 to get reversed2. 
// Return true if reversed2 equals num. Otherwise return false.

// Example 1:
// Input: num = 526
// Output: true
// Explanation: Reverse num to get 625, then reverse 625 to get 526, which equals num.

// Example 2:
// Input: num = 1800
// Output: false
// Explanation: Reverse num to get 81, then reverse 81 to get 18, which does not equal num.

// Example 3:
// Input: num = 0
// Output: true
// Explanation: Reverse num to get 0, then reverse 0 to get 0, which equals num.

// Constraints:
// 0 <= num <= 10^6

/**
 * @param {number} num
 * @return {boolean}
 */
var isSameAfterReversals = function(num) {
    // If the number is 0, it's always true.
    // If a number ends in 0, reversing it drops the 0. The second reversal won't bring it back, so it's false.
    // Otherwise, reversing twice gives the original number.
    return num === 0 || num % 10 !== 0;
};

// Notes:
// - We don't actually need to reverse the number twice.
// - Reversal drops trailing zeros because they become leading zeros.
// - So, only numbers ending in 0 (other than 0 itself) will change after double reversal.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { isSameAfterReversals };

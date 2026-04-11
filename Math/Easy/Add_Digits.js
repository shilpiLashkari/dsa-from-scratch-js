// Problem: Add Digits
// Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.

// Example 1:
// Input: num = 38
// Output: 2
// Explanation: The process is
// 38 --> 3 + 8 --> 11
// 11 --> 1 + 1 --> 2 
// Since 2 has only one digit, return it.

// Example 2:
// Input: num = 0
// Output: 0

// Constraints:
// 0 <= num <= 2^31 - 1

/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
    if (num === 0) return 0;
    
    // Using the Digital Root formula
    return 1 + (num - 1) % 9;
};

// Notes:
// - This problem can be solved using the property of digital roots.
// - For any non-negative integer, the digital root is the remainder of the number when divided by 9.
// - If the number is a multiple of 9, the digital root is 9 (except for 0).
// - Formula: dr(n) = 1 + (n - 1) % 9.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { addDigits };

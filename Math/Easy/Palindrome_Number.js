// Problem: Palindrome Number

// Given an integer x, return true if x is a palindrome, and false otherwise.
// An integer is a palindrome when it reads the same forward and backward.
// For example, 121 is a palindrome while 123 is not.

// Example 1:
// Input: x = 121
// Output: true
// Explanation: 121 reads as 121 from left to right and from right to left.

// Example 2:
// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

// Example 3:
// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

// Constraints:
// -2^31 <= x <= 2^31 - 1
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let reverse = 0;
    let remainder = 0;
    let originalNumber = x;
    if (x < 0) return false;
    while (x > 0) {
        remainder = x % 10;
        reverse = reverse * 10 + remainder;
        x = Math.floor(x / 10);
    }
    return (reverse === originalNumber);
};
// Notes:
// - The most intuitive way is to convert integer to string and check if it's a palindrome.
// - However, that requires extra space.
// - The optimized approach reverses the half of the integer and compares it to the other half.
// - This avoids overflow issues that might occur if we reversed the entire number.
// - Time Complexity: O(log10(n)) - We divide the input by 10 in every iteration.
// - Space Complexity: O(1) - Constant space used.

module.exports = { isPalindrome };

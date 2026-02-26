// Problem: Plus One
// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. 
// The digits are ordered from most significant to least significant in left-to-right order. 
// The large integer does not contain any leading 0's.
// Increment the large integer by one and return the resulting array of digits.

// Example 1:
// Input: digits = [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123. Incrementing by one gives 123 + 1 = 124.

// Example 2:
// Input: digits = [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322.

// Example 3:
// Input: digits = [9]
// Output: [1,0]
// Explanation: The array represents the integer 9. Incrementing by one gives 9 + 1 = 10.

// Constraints:
// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9
// digits does not contain any leading 0's.

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};
// Notes:
// - We iterate from the end of the array (least significant digit).
// - If the current digit is less than 9, we simply increment it and return.
// - If the digit is 9, it becomes 0 and we continue to the next digit (carrying over).
// - If all digits were 9, the loop finishes and we add a leading 1 (e.g., [9,9] -> [1,0,0]).
// - Time Complexity: O(n) - Single pass through the digits.
// - Space Complexity: O(1) - In-place modification (worst case O(n) for unshift in some JS engines).

module.exports = { plusOne };

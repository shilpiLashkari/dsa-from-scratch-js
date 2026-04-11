// Problem: Add to Array-Form of Integer
// The array-form of an integer num is an array representing its digits in left to right order.
// For example, for num = 1321, the array form is [1,3,2,1].
// Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

// Example 1:
// Input: num = [1,2,0,0], k = 34
// Output: [1,2,3,4]
// Explanation: 1200 + 34 = 1234

// Example 2:
// Input: num = [2,7,4], k = 181
// Output: [4,5,5]
// Explanation: 274 + 181 = 455

// Example 3:
// Input: num = [2,1,5], k = 806
// Output: [1,0,2,1]
// Explanation: 215 + 806 = 1021

// Constraints:
// 1 <= num.length <= 10^4
// 0 <= num[i] <= 9
// num does not contain any leading zeros except for the zero itself.
// 1 <= k <= 10^4

/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function(num, k) {
    let result = [];
    let i = num.length - 1;
    let carry = k;

    // We can add k directly to the carry and process digit by digit from right to left.
    while (i >= 0 || carry > 0) {
        if (i >= 0) {
            carry += num[i];
            i--;
        }
        
        result.push(carry % 10);
        carry = Math.floor(carry / 10);
    }
    
    return result.reverse();
};

// Notes:
// - Instead of a standard carry (0 or 1), we treat k itself as the initial carry.
// - At each position, we add the current array digit to the carry.
// - The new array digit is carry % 10, and the new carry is floor(carry / 10).
// - This avoids BigInt and elegantly handles when k has more digits than num.
// - Time Complexity: O(max(N, log K)) where N is length of array.
// - Space Complexity: O(max(N, log K)) for the results array.

module.exports = { addToArrayForm };

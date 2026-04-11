// Problem: Gray Code
// An n-bit gray code sequence is a sequence of 2^n integers where:
// Every integer is in the inclusive range [0, 2^n - 1],
// The first integer is 0,
// An integer appears no more than once in the sequence,
// The binary representation of every pair of adjacent integers differs by exactly one bit, and
// The binary representation of the first and last integers differs by exactly one bit.
// Given an integer n, return any valid n-bit gray code sequence.

// Example 1:
// Input: n = 2
// Output: [0,1,3,2]
// Explanation:
// The binary representation of [0,1,3,2] is [00,01,11,10].
// - 00 and 01 differ by one bit
// - 01 and 11 differ by one bit
// - 11 and 10 differ by one bit
// - 10 and 00 differ by one bit
// [0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].

// Example 2:
// Input: n = 1
// Output: [0,1]

// Constraints:
// 1 <= n <= 16

/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    let result = [];
    const totalCount = 1 << n; // 2^n
    
    // There is a well known bitwise logic to compute the i-th Gray code:
    // G(i) = i ^ (i >> 1)
    
    for (let i = 0; i < totalCount; i++) {
        result.push(i ^ (i >> 1));
    }
    
    return result;
};

// Notes:
// - The Gray code is a binary numeral system where two successive values differ in only one bit.
// - It can be generated mathematically. The n-th Gray code can be found directly by performing an XOR between `n` and `n / 2`.
// - So, `i ^ (i >> 1)` gives the Gray code sequence perfectly.
// - Time Complexity: O(2^n) since we must generate 2^n items.
// - Space Complexity: O(1) excluding the output array.

module.exports = { grayCode };

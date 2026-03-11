// Problem: Complement of Base 10 Integer

// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.
// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer n, return its complement.

// Example 1:
// Input: n = 5
// Output: 2
// Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.

// Example 2:
// Input: n = 7
// Output: 0
// Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.

// Example 3:
// Input: n = 10
// Output: 5
// Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

// Constraints:
// 0 <= n < 10^9

/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function (n) {
    if (n === 0) return 1;

    // A number XOR with its complement equals a string of 1s of the same length.
    // E.g., 5 is 101, complement is 010. 101 XOR 010 = 111.
    // So, n XOR (111...) = complement.
    // We need to find the smallest number of the form 2^k - 1 that is >= n.

    let mask = 1;
    while (mask < n) {
        mask = (mask << 1) | 1;
    }

    return n ^ mask;
};

// Notes:
// - The bitwise complement flips all bits of the binary representation.
// - Since we only care about the bits up to the most significant bit of n, we use a mask of 1s.
// - Edge case: n = 0, the binary is "0", its complement is "1", so return 1.
// - Time Complexity: O(log N) - Number of bits in n.
// - Space Complexity: O(1) - Constant space used.

module.exports = { bitwiseComplement };

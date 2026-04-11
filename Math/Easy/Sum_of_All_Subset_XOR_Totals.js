// Problem: Sum of All Subset XOR Totals
// The XOR total of an array is defined as the bitwise XOR of all its elements, or 0 if the array is empty.
// Given an array nums, return the sum of all XOR totals for every subset of nums. 
// Note: Subsets with the same elements should be counted multiple times.
// An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements.

// Example 1:
// Input: nums = [1,3]
// Output: 6
// Explanation: The 4 subsets of [1,3] are:
// - The empty subset has an XOR total of 0.
// - [1] has an XOR total of 1.
// - [3] has an XOR total of 3.
// - [1,3] has an XOR total of 1 XOR 3 = 2.
// 0 + 1 + 3 + 2 = 6

// Example 2:
// Input: nums = [5,1,6]
// Output: 28

// Constraints:
// 1 <= nums.length <= 12
// 1 <= nums[i] <= 20

/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function(nums) {
    let sum = 0;
    const n = nums.length;
    const totalSubsets = 1 << n;

    // We can iterate through all subsets using bit manipulation.
    // For each subset (0 to 2^n - 1), we check which elements are included based on the set bits.
    for (let i = 0; i < totalSubsets; i++) {
        let currentXor = 0;
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) !== 0) {
                currentXor ^= nums[j];
            }
        }
        sum += currentXor;
    }

    return sum;
};

// Notes:
// - Since nums.length <= 12, there are at most 2^12 = 4096 subsets.
// - We can easily generate all subsets using a bitmask from 0 to 2^n - 1.
// - A faster mathematical approach exists: return (nums.reduce((a, b) => a | b)) << (nums.length - 1).
// - Time Complexity: O(N * 2^N)
// - Space Complexity: O(1)

module.exports = { subsetXORSum };

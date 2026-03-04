// Problem: Single Number
// Given a non-empty array of integers nums, every element appears twice except for one. 
// Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:
// Input: nums = [2,2,1]
// Output: 1

// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4

// Example 3:
// Input: nums = [1]
// Output: 1

// Constraints:
// 1 <= nums.length <= 3 * 10^4
// -3 * 10^4 <= nums[i] <= 3 * 10^4
// Each element in the array appears twice except for one element which appears only once.

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let xor = 0;
    for (num of nums) {
        xor ^= num;
    }
    return xor;
};

// Notes:
// - A common optimized approach uses Bit Manipulation (XOR).
// - XORing a number with itself results in 0 (a ^ a = 0).
// - XORing a number with 0 results in the number itself (a ^ 0 = a).
// - Time Complexity Target: O(n)
// - Space Complexity Target: O(1)

module.exports = { singleNumber };

// Problem: Maximum Product of Three Numbers
// Given an integer array nums, find three numbers whose product is maximum and return the maximum product.

// Example 1:
// Input: nums = [1,2,3]
// Output: 6

// Example 2:
// Input: nums = [1,2,3,4]
// Output: 24

// Example 3:
// Input: nums = [-1,-2,-3]
// Output: -6

// Constraints:
// 3 <= nums.length <= 10^4
// -1000 <= nums[i] <= 1000

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    // Sort the numbers to easily find the largest and smallest
    nums.sort((a, b) => a - b);
    let n = nums.length;

    // The max product can be:
    // 1. Three largest numbers (e.g. all positive)
    // 2. Two smallest (most negative) and the largest one (e.g. -10 * -10 * 10)
    return Math.max(
        nums[n - 1] * nums[n - 2] * nums[n - 3],
        nums[0] * nums[1] * nums[n - 1]
    );
};

// Notes:
// - If all numbers are positive, the product of the three largest is maximum.
// - If there are negative numbers, two large negatives multiplied can result in a large positive number.
// - Sorting makes it easy to pick these candidates.
// - Time Complexity: O(N log N) due to sorting. Can be O(N) by finding 3 max and 2 min values in one pass.
// - Space Complexity: O(1) or O(log N) depending on sort implementation.

module.exports = { maximumProduct };

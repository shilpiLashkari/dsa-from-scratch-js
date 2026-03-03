// Problem: Move Zeroes
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.

// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// Example 2:
// Input: nums = [0]
// Output: [0]

// Constraints:
// 1 <= nums.length <= 10^4
// -2^31 <= nums[i] <= 2^31 - 1

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let x = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[x] = nums[i];
            x++;
        }
    }
    for (let i = x; i < nums.length; i++) {
        nums[i] = 0;
    }
};

// Notes:
// - A common approach is to use a "slow" pointer to track the position of the last non-zero element found so far.
// - Iterate through the array with a "fast" pointer; whenever a non-zero element is found, swap it with the element at the slow pointer.
// - Time Complexity Target: O(n)
// - Space Complexity Target: O(1)

module.exports = { moveZeroes };

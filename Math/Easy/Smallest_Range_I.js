// Problem: Smallest Range I
// You are given an integer array nums and an integer k.
// In one operation, you can choose any index i where 0 <= i < nums.length and change nums[i] to nums[i] + x where x is an integer from the range [-k, k]. 
// You can apply this operation at most once for each index i.
// The score of the array is the difference between the maximum and minimum elements in nums.
// Return the minimum score of nums after applying the mentioned operation at most once for each index in it.

// Example 1:
// Input: nums = [1], k = 0
// Output: 0

// Example 2:
// Input: nums = [0,10], k = 2
// Output: 6
// Explanation: Change nums to [2, 8]. The score is 8 - 2 = 6.

// Example 3:
// Input: nums = [1,3,6], k = 3
// Output: 0

// Constraints:
// 1 <= nums.length <= 10^4
// 0 <= nums[i] <= 10^4
// 0 <= k <= 10^4

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
    let min = Math.min(...nums);
    let max = Math.max(...nums);

    // We can increase min by k and decrease max by k.
    // The new range will be (max - k) - (min + k) = max - min - 2k.
    // If max - min is less than or equal to 2k, we can make all elements equal (score 0).
    return Math.max(0, max - min - 2 * k);
};

// Notes:
// - We find the initial min and max of the array.
// - To minimize the range, we want to bring the min and max closer.
// - The closest they can get is by adding k to min and subtracting k from max.
// - The minimum difference is max(0, (max - k) - (min + k)).
// - Time Complexity: O(N)
// - Space Complexity: O(1)

module.exports = { smallestRangeI };

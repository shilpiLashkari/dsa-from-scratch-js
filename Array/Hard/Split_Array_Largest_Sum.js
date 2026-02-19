// Problem: Split Array Largest Sum
//
// Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.
// Return the minimized largest sum of the split.
// A subarray is a contiguous part of the array.
//
// Example 1:
// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays. The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
//
// Example 2:
// Input: nums = [1,2,3,4,5], k = 2
// Output: 9
// Explanation: There are four ways to split nums into two subarrays. The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.
//
// Constraints:
// 1 <= nums.length <= 1000
// 0 <= nums[i] <= 10^6
// 1 <= k <= min(50, nums.length)

// Solution:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);

    function getCount(targetSum) {
        let count = 1;
        let currentSum = 0;
        for (let num of nums) {
            if (currentSum + num > targetSum) {
                count++;
                currentSum = num;
            } else {
                currentSum += num;
            }
        }
        return count;
    }

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (getCount(mid) > k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
};

// Notes:
// - The trick here is to use "Binary Search on Answer" instead of searching for an index.
// - The possible answer range is from `max(nums)` (minimum possible max sum) to `sum(nums)` (maximum possible max sum).
// - We pick a `mid` value and check if we can split the array into `k` or fewer subarrays such that no subarray sum exceeds `mid`.
// - The helper function `getCount` greedily counts how many subarrays we need for a given sum limit.
// - If we need more than `k` subarrays, our `mid` is too small, so we search the right half.
// - If we can do it with `k` or fewer, `mid` is a valid answer, but we try to find a smaller one in the left half.
// - Time Complexity: O(N * log(Sum(nums) - Max(nums))), where N is the length of nums.
// - Space Complexity: O(1) - we only use a few variables.

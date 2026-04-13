/**
 * Minimum Distance to the Target Element (LeetCode 1848)
 *
 * Given an integer array nums (0-indexed) and two integers target and start,
 * find an index i such that nums[i] == target and abs(i - start) is minimized.
 * Return abs(i - start).
 *
 * It is guaranteed that target exists in nums.
 *
 * Example 1:
 *   Input: nums = [1,2,3,4,5], target = 5, start = 3
 *   Output: 1
 *   Explanation: nums[4] = 5 is the only value equal to target,
 *   so the answer is abs(4 - 3) = 1.
 *
 * Example 2:
 *   Input: nums = [1], target = 1, start = 0
 *   Output: 0
 *   Explanation: nums[0] = 1 is the only value equal to target,
 *   so the answer is abs(0 - 0) = 0.
 *
 * Example 3:
 *   Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
 *   Output: 0
 *   Explanation: Every value of nums is 1, but nums[0] minimizes
 *   abs(i - start), which is abs(0 - 0) = 0.
 *
 * Constraints:
 *   1 <= nums.length <= 1000
 *   1 <= nums[i] <= 10^4
 *   0 <= start < nums.length
 *   target is in nums
 *
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
  let minimumDistance = Infinity;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    if (nums[currentIndex] === target) {
      const currentDistance = Math.abs(currentIndex - start);
      if (currentDistance < minimumDistance) {
        minimumDistance = currentDistance;
      }
    }
  }

  return minimumDistance;
};

/**
 * Notes:
 * 1. We iterate through every element in the array once.
 * 2. When a value matches the target, we compute the absolute distance
 *    from that index to the start position.
 * 3. We track the smallest distance seen so far and return it at the end.
 * 4. Time Complexity: O(n) — single pass through the array.
 * 5. Space Complexity: O(1) — only a single variable is used.
 */

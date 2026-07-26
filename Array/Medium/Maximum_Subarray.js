/**
 * LeetCode 53: Maximum Subarray
 *
 * Kadane's algorithm tracks the best subarray ending at each position and the
 * best sum seen anywhere.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let endingHere = nums[0];
  let maximumSum = nums[0];

  for (let index = 1; index < nums.length; index++) {
    endingHere = Math.max(nums[index], endingHere + nums[index]);
    maximumSum = Math.max(maximumSum, endingHere);
  }

  return maximumSum;
};

if (require.main === module) {
  const tests = [
    [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
    [[1], 1],
    [[5, 4, -1, 7, 8], 23],
    [[-3, -2, -5], -2],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = maxSubArray(nums);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { maxSubArray };

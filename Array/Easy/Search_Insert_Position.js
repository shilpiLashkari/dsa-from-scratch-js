/**
 * LeetCode 35: Search Insert Position
 *
 * Binary-search the first position whose value is greater than or equal to the
 * target.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (nums[middle] < target) left = middle + 1;
    else right = middle;
  }

  return left;
};

if (require.main === module) {
  const tests = [
    [[1, 3, 5, 6], 5, 2],
    [[1, 3, 5, 6], 2, 1],
    [[1, 3, 5, 6], 7, 4],
    [[1, 3, 5, 6], 0, 0],
  ];

  tests.forEach(([nums, target, expected], index) => {
    const actual = searchInsert(nums, target);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { searchInsert };

/**
 * LeetCode 448: Find All Numbers Disappeared in an Array
 *
 * Use each value as an index and negate the value stored there to mark it seen.
 * Positive positions after marking correspond to missing numbers.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1), excluding the output
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  for (const value of nums) {
    const index = Math.abs(value) - 1;
    nums[index] = -Math.abs(nums[index]);
  }

  const missing = [];

  for (let index = 0; index < nums.length; index++) {
    if (nums[index] > 0) missing.push(index + 1);
  }

  return missing;
};

if (require.main === module) {
  const tests = [
    [[4, 3, 2, 7, 8, 2, 3, 1], [5, 6]],
    [[1, 1], [2]],
    [[1], []],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = findDisappearedNumbers([...nums]);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findDisappearedNumbers };

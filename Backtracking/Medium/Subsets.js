/**
 * LeetCode 78: Subsets
 *
 * Record every current path, then extend it with each later value.
 *
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];
  const current = [];

  const search = (start) => {
    result.push([...current]);

    for (let index = start; index < nums.length; index++) {
      current.push(nums[index]);
      search(index + 1);
      current.pop();
    }
  };

  search(0);
  return result;
};

if (require.main === module) {
  const tests = [
    [[1, 2, 3], 8],
    [[0], 2],
    [[], 1],
  ];

  tests.forEach(([nums, expectedCount], index) => {
    const actual = subsets(nums);
    const unique = new Set(actual.map(JSON.stringify));
    if (actual.length !== expectedCount || unique.size !== expectedCount) {
      throw new Error(`Test ${index + 1}: invalid subset count`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { subsets };

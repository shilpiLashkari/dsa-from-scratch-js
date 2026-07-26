/**
 * LeetCode 90: Subsets II
 *
 * Sort values and skip equal candidates at the same recursion depth so each
 * distinct multiset subset is generated once.
 *
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const current = [];

  const search = (start) => {
    result.push([...current]);

    for (let index = start; index < nums.length; index++) {
      if (index > start && nums[index] === nums[index - 1]) continue;

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
    [[1, 2, 2], 6],
    [[0], 2],
    [[1, 1, 1], 4],
  ];

  tests.forEach(([nums, expectedCount], index) => {
    const actual = subsetsWithDup([...nums]);
    const unique = new Set(actual.map(JSON.stringify));
    if (actual.length !== expectedCount || unique.size !== expectedCount) {
      throw new Error(`Test ${index + 1}: invalid subset count`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { subsetsWithDup };

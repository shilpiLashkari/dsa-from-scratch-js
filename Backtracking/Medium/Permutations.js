/**
 * LeetCode 46: Permutations
 *
 * Build each permutation position by position, tracking which input indices are
 * already used in the current path.
 *
 * Time Complexity: O(n * n!)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const permutations = [];
  const current = [];
  const used = new Array(nums.length).fill(false);

  const search = () => {
    if (current.length === nums.length) {
      permutations.push([...current]);
      return;
    }

    for (let index = 0; index < nums.length; index++) {
      if (used[index]) continue;

      used[index] = true;
      current.push(nums[index]);
      search();
      current.pop();
      used[index] = false;
    }
  };

  search();
  return permutations;
};

if (require.main === module) {
  const tests = [
    [[1, 2, 3], 6],
    [[0, 1], 2],
    [[1], 1],
  ];

  tests.forEach(([nums, expectedCount], index) => {
    const actual = permute(nums);
    const unique = new Set(actual.map(JSON.stringify));
    if (actual.length !== expectedCount || unique.size !== expectedCount) {
      throw new Error(`Test ${index + 1}: invalid permutation count`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { permute };

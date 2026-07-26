/**
 * LeetCode 47: Permutations II
 *
 * Sort values and skip an unused duplicate when its identical predecessor has
 * not been used in the current path.
 *
 * Time Complexity: O(n * n!)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);
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
      if (
        index > 0 &&
        nums[index] === nums[index - 1] &&
        !used[index - 1]
      ) {
        continue;
      }

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
    [[1, 1, 2], [[1, 1, 2], [1, 2, 1], [2, 1, 1]]],
    [
      [1, 2, 3],
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [[1, 1, 1], [[1, 1, 1]]],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = permuteUnique([...nums]);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: permutation mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { permuteUnique };

/**
 * LeetCode 40: Combination Sum II
 *
 * Sort candidates and backtrack while advancing to the next index after every
 * choice. Skip equal candidates at the same depth to avoid duplicate results.
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  const combinations = [];
  const current = [];

  const search = (start, remaining) => {
    if (remaining === 0) {
      combinations.push([...current]);
      return;
    }

    for (let index = start; index < candidates.length; index++) {
      if (index > start && candidates[index] === candidates[index - 1]) continue;

      const value = candidates[index];
      if (value > remaining) break;

      current.push(value);
      search(index + 1, remaining - value);
      current.pop();
    }
  };

  search(0, target);
  return combinations;
};

if (require.main === module) {
  const tests = [
    [
      [10, 1, 2, 7, 6, 1, 5],
      8,
      [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
    ],
    [[2, 5, 2, 1, 2], 5, [[1, 2, 2], [5]]],
    [[1], 2, []],
  ];

  tests.forEach(([candidates, target, expected], index) => {
    const actual = combinationSum2([...candidates], target);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: combination mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { combinationSum2 };

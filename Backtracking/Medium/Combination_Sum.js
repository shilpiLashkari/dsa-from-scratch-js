/**
 * LeetCode 39: Combination Sum
 *
 * Backtrack through sorted candidates. Reuse the current candidate by recursing
 * with the same index, and stop a branch once its candidate exceeds the target.
 *
 * Time Complexity: O(number of generated combinations * target)
 * Space Complexity: O(target) recursion depth, excluding the output
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  const combinations = [];
  const current = [];

  const search = (start, remaining) => {
    if (remaining === 0) {
      combinations.push([...current]);
      return;
    }

    for (let index = start; index < candidates.length; index++) {
      const value = candidates[index];
      if (value > remaining) break;

      current.push(value);
      search(index, remaining - value);
      current.pop();
    }
  };

  search(0, target);
  return combinations;
};

if (require.main === module) {
  const tests = [
    [[2, 3, 6, 7], 7, [[2, 2, 3], [7]]],
    [[2, 3, 5], 8, [[2, 2, 2, 2], [2, 3, 3], [3, 5]]],
    [[2], 1, []],
  ];

  tests.forEach(([candidates, target, expected], index) => {
    const actual = combinationSum([...candidates], target);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: combination mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { combinationSum };

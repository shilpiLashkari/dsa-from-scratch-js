/**
 * LeetCode 77: Combinations
 *
 * Backtrack through increasing values and prune when too few candidates remain
 * to complete the current combination.
 *
 * Time Complexity: O(k * C(n, k))
 * Space Complexity: O(k), excluding the output
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const combinations = [];
  const current = [];

  const search = (start) => {
    if (current.length === k) {
      combinations.push([...current]);
      return;
    }

    const needed = k - current.length;

    for (let value = start; value <= n - needed + 1; value++) {
      current.push(value);
      search(value + 1);
      current.pop();
    }
  };

  search(1);
  return combinations;
};

if (require.main === module) {
  const tests = [
    [4, 2, 6],
    [1, 1, 1],
    [5, 3, 10],
  ];

  tests.forEach(([n, k, expectedCount], index) => {
    const actual = combine(n, k);
    const unique = new Set(actual.map(JSON.stringify));
    if (actual.length !== expectedCount || unique.size !== expectedCount) {
      throw new Error(`Test ${index + 1}: invalid combination count`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { combine };

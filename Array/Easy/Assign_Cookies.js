/**
 * LeetCode 455: Assign Cookies
 *
 * Sort children and cookies. Give the smallest sufficient remaining cookie to
 * the least-greedy unsatisfied child.
 *
 * Time Complexity: O(n log n + m log m)
 * Space Complexity: O(log n + log m), depending on the sorting implementation
 */

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let child = 0;
  let cookie = 0;

  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child++;
    cookie++;
  }

  return child;
};

if (require.main === module) {
  const tests = [
    [[1, 2, 3], [1, 1], 1],
    [[1, 2], [1, 2, 3], 2],
    [[], [1], 0],
    [[10, 9, 8, 7], [5, 6, 7, 8], 2],
  ];

  tests.forEach(([children, cookies, expected], index) => {
    const actual = findContentChildren([...children], [...cookies]);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findContentChildren };

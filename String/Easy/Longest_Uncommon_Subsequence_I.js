/**
 * LeetCode 521: Longest Uncommon Subsequence I
 *
 * If the strings are equal, every subsequence is shared. Otherwise, the longer
 * complete string cannot be a subsequence of the shorter different string.
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
  return a === b ? -1 : Math.max(a.length, b.length);
};

if (require.main === module) {
  const tests = [
    ["aba", "cdc", 3],
    ["aaa", "bbb", 3],
    ["aaa", "aaa", -1],
    ["abcd", "abc", 4],
  ];

  tests.forEach(([a, b, expected], index) => {
    const actual = findLUSlength(a, b);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findLUSlength };

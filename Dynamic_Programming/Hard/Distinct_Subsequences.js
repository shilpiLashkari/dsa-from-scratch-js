/**
 * 115. Distinct Subsequences
 *
 * Counts how many distinct subsequences of s equal t.
 *
 * Time: O(s.length * t.length)
 * Space: O(t.length)
 *
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {
  const ways = new Array(t.length + 1).fill(0);
  ways[0] = 1;

  for (const character of s) {
    for (let index = t.length; index >= 1; index -= 1) {
      if (character === t[index - 1]) {
        ways[index] += ways[index - 1];
      }
    }
  }

  return ways[t.length];
}

module.exports = { numDistinct };

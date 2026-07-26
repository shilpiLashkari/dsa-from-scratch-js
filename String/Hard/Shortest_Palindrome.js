/**
 * LeetCode 214: Shortest Palindrome
 *
 * A KMP prefix table over s + "#" + reverse(s) finds the longest palindromic
 * prefix. Prepend the unmatched reversed suffix.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function (s) {
  const reversed = [...s].reverse().join("");
  const combined = `${s}#${reversed}`;
  const prefix = new Array(combined.length).fill(0);

  for (let index = 1; index < combined.length; index++) {
    let matched = prefix[index - 1];

    while (matched > 0 && combined[index] !== combined[matched]) {
      matched = prefix[matched - 1];
    }

    if (combined[index] === combined[matched]) matched++;
    prefix[index] = matched;
  }

  const palindromicPrefixLength = prefix[prefix.length - 1] ?? 0;
  return reversed.slice(0, s.length - palindromicPrefixLength) + s;
};

module.exports = { shortestPalindrome };

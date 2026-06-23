// Problem: Maximum Number of Balloons
// Given a string text, return the maximum number of times the word "balloon"
// can be formed by using characters from text.

// Example 1:
// Input: text = "loonbalxballpoon"
// Output: 2

// Example 2:
// Input: text = "balon"
// Output: 0

// Example 3:
// Input: text = "balloonballoon"
// Output: 2

// Constraints:
// 1 <= text.length <= 10^4
// text consists of lower case English letters only.

/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
  const charCount = {};

  for (const char of text) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  const b = charCount["b"] || 0;
  const a = charCount["a"] || 0;
  const l = Math.floor((charCount["l"] || 0) / 2);
  const o = Math.floor((charCount["o"] || 0) / 2);
  const n = charCount["n"] || 0;

  return Math.min(b, a, l, o, n);
};

// Notes:
// - The word "balloon" requires 1 b, 1 a, 2 l's, 2 o's, and 1 n.
// - We count each character in the input string and then divide the counts
//   for letters that are needed twice in the target word.
// - The final answer is limited by the least available letter count after
//   normalizing the duplicated letters.
// - Time Complexity: O(n), where n is the length of the input string.
// - Space Complexity: O(1), since the character frequency map is bounded by
//   the alphabet size (lowercase English letters only).

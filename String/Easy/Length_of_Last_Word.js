/**
 * LeetCode 58: Length of Last Word
 *
 * Scan backward past trailing spaces, then count the final contiguous word.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let index = s.length - 1;

  while (index >= 0 && s[index] === " ") index--;

  const wordEnd = index;

  while (index >= 0 && s[index] !== " ") index--;

  return wordEnd - index;
};

if (require.main === module) {
  const tests = [
    ["Hello World", 5],
    ["   fly me   to   the moon  ", 4],
    ["luffy is still joyboy", 6],
    ["a", 1],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = lengthOfLastWord(input);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { lengthOfLastWord };

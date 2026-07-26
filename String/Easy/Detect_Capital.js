/**
 * LeetCode 520: Detect Capital
 *
 * A valid word is entirely uppercase, entirely lowercase, or title-cased.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for normalized strings
 */

/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  return (
    word === word.toUpperCase() ||
    word === word.toLowerCase() ||
    (word[0] === word[0].toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase())
  );
};

if (require.main === module) {
  const tests = [
    ["USA", true],
    ["FlaG", false],
    ["Google", true],
    ["leetcode", true],
  ];

  tests.forEach(([word, expected], index) => {
    const actual = detectCapitalUse(word);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { detectCapitalUse };

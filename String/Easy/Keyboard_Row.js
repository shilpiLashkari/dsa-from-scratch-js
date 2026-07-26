/**
 * LeetCode 500: Keyboard Row
 *
 * Map each letter to its keyboard row and retain words whose letters all match
 * the row of their first letter.
 *
 * Time Complexity: O(total characters)
 * Space Complexity: O(1), excluding the output
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  const rowByLetter = {};

  ["qwertyuiop", "asdfghjkl", "zxcvbnm"].forEach((row, rowIndex) => {
    for (const letter of row) rowByLetter[letter] = rowIndex;
  });

  return words.filter((word) => {
    const lowercase = word.toLowerCase();
    const row = rowByLetter[lowercase[0]];

    return [...lowercase].every((letter) => rowByLetter[letter] === row);
  });
};

if (require.main === module) {
  const tests = [
    [["Hello", "Alaska", "Dad", "Peace"], ["Alaska", "Dad"]],
    [["omk"], []],
    [["adsdf", "sfd"], ["adsdf", "sfd"]],
  ];

  tests.forEach(([words, expected], index) => {
    const actual = findWords(words);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: result mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findWords };

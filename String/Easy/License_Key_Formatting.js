/**
 * LeetCode 482: License Key Formatting
 *
 * Remove dashes, uppercase the characters, then form groups from the end so
 * every group except possibly the first has exactly k characters.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  const characters = [];
  let groupSize = 0;

  for (let index = s.length - 1; index >= 0; index--) {
    if (s[index] === "-") continue;

    if (groupSize === k) {
      characters.push("-");
      groupSize = 0;
    }

    characters.push(s[index].toUpperCase());
    groupSize++;
  }

  return characters.reverse().join("");
};

if (require.main === module) {
  const tests = [
    ["5F3Z-2e-9-w", 4, "5F3Z-2E9W"],
    ["2-5g-3-J", 2, "2-5G-3J"],
    ["---", 3, ""],
    ["a-a-a-a-", 1, "A-A-A-A"],
  ];

  tests.forEach(([s, k, expected], index) => {
    const actual = licenseKeyFormatting(s, k);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { licenseKeyFormatting };

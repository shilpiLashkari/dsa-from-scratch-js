/**
 * LeetCode 28: Find the Index of the First Occurrence in a String
 *
 * Try each viable starting position and compare the needle character by
 * character.
 *
 * Time Complexity: O((n - m + 1) * m)
 * Space Complexity: O(1)
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    let offset = 0;

    while (
      offset < needle.length &&
      haystack[start + offset] === needle[offset]
    ) {
      offset++;
    }

    if (offset === needle.length) return start;
  }

  return -1;
};

if (require.main === module) {
  const tests = [
    ["sadbutsad", "sad", 0],
    ["leetcode", "leeto", -1],
    ["mississippi", "issip", 4],
    ["a", "a", 0],
  ];

  tests.forEach(([haystack, needle, expected], index) => {
    const actual = strStr(haystack, needle);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { strStr };

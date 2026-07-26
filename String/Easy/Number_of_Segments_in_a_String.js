/**
 * LeetCode 434: Number of Segments in a String
 *
 * Count each non-space character that begins the string or follows a space.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  let segmentCount = 0;

  for (let index = 0; index < s.length; index++) {
    if (s[index] !== " " && (index === 0 || s[index - 1] === " ")) {
      segmentCount++;
    }
  }

  return segmentCount;
};

if (require.main === module) {
  const tests = [
    ["Hello, my name is John", 5],
    ["Hello", 1],
    ["   ", 0],
    [" love live! mu'sic forever ", 4],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = countSegments(input);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { countSegments };

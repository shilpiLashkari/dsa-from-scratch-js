/**
 * LeetCode 459: Repeated Substring Pattern
 *
 * Build the KMP prefix table. A string repeats a shorter pattern when its
 * longest proper prefix/suffix leaves a period that evenly divides its length.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  const prefixLength = new Array(s.length).fill(0);

  for (let index = 1; index < s.length; index++) {
    let matched = prefixLength[index - 1];

    while (matched > 0 && s[index] !== s[matched]) {
      matched = prefixLength[matched - 1];
    }

    if (s[index] === s[matched]) matched++;
    prefixLength[index] = matched;
  }

  const repeatedPrefix = prefixLength[s.length - 1];
  const period = s.length - repeatedPrefix;

  return repeatedPrefix > 0 && s.length % period === 0;
};

if (require.main === module) {
  const tests = [
    ["abab", true],
    ["aba", false],
    ["abcabcabcabc", true],
    ["a", false],
    ["zzzz", true],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = repeatedSubstringPattern(input);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { repeatedSubstringPattern };

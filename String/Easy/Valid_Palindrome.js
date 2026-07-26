/**
 * LeetCode 125: Valid Palindrome
 *
 * Move two pointers inward, skipping non-alphanumeric characters, and compare
 * the remaining characters without regard to case.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const isAlphanumeric = (character) => {
    const code = character.charCodeAt(0);

    return (
      (code >= 48 && code <= 57) ||
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122)
    );
  };

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
};

if (require.main === module) {
  const tests = [
    ["A man, a plan, a canal: Panama", true],
    ["race a car", false],
    [" ", true],
    ["0P", false],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = isPalindrome(input);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isPalindrome };

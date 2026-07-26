/**
 * LeetCode 20: Valid Parentheses
 *
 * Use a stack to match each closing bracket with the most recent unmatched
 * opening bracket.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const matchingOpening = { ")": "(", "]": "[", "}": "{" };
  const stack = [];

  for (const bracket of s) {
    if (!(bracket in matchingOpening)) {
      stack.push(bracket);
    } else if (stack.pop() !== matchingOpening[bracket]) {
      return false;
    }
  }

  return stack.length === 0;
};

if (require.main === module) {
  const tests = [
    ["()", true],
    ["()[]{}", true],
    ["(]", false],
    ["([])", true],
    ["([)]", false],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = isValid(input);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isValid };

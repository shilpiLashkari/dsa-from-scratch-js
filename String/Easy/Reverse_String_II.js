/**
 * LeetCode 541: Reverse String II
 *
 * For each block of 2k characters, reverse only its first k characters.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const characters = [...s];

  for (let start = 0; start < characters.length; start += 2 * k) {
    let left = start;
    let right = Math.min(start + k - 1, characters.length - 1);

    while (left < right) {
      [characters[left], characters[right]] = [
        characters[right],
        characters[left],
      ];
      left++;
      right--;
    }
  }

  return characters.join("");
};

if (require.main === module) {
  const tests = [
    ["abcdefg", 2, "bacdfeg"],
    ["abcd", 2, "bacd"],
    ["a", 2, "a"],
    ["abcdef", 3, "cbadef"],
  ];

  tests.forEach(([s, k, expected], index) => {
    const actual = reverseStr(s, k);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { reverseStr };

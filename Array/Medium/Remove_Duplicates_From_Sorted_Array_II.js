/**
 * LeetCode 80: Remove Duplicates from Sorted Array II
 *
 * Write each value when fewer than two values have been written or it differs
 * from the value two positions behind the write pointer.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let write = 0;

  for (const value of nums) {
    if (write < 2 || value !== nums[write - 2]) {
      nums[write++] = value;
    }
  }

  return write;
};

if (require.main === module) {
  const tests = [
    [[1, 1, 1, 2, 2, 3], [1, 1, 2, 2, 3]],
    [[0, 0, 1, 1, 1, 1, 2, 3, 3], [0, 0, 1, 1, 2, 3, 3]],
    [[1], [1]],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = [...input];
    const length = removeDuplicates(actual);
    if (JSON.stringify(actual.slice(0, length)) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: compacted array mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { removeDuplicates };

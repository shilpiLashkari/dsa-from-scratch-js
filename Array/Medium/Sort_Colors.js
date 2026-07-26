/**
 * LeetCode 75: Sort Colors
 *
 * Dutch National Flag partitioning places zeroes before low, twos after high,
 * and scans unknown values between them.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {void}
 */
var sortColors = function (nums) {
  let low = 0;
  let current = 0;
  let high = nums.length - 1;

  while (current <= high) {
    if (nums[current] === 0) {
      [nums[low], nums[current]] = [nums[current], nums[low]];
      low++;
      current++;
    } else if (nums[current] === 2) {
      [nums[current], nums[high]] = [nums[high], nums[current]];
      high--;
    } else {
      current++;
    }
  }
};

if (require.main === module) {
  const tests = [
    [[2, 0, 2, 1, 1, 0], [0, 0, 1, 1, 2, 2]],
    [[2, 0, 1], [0, 1, 2]],
    [[0], [0]],
    [[1, 2, 0], [0, 1, 2]],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = [...input];
    sortColors(actual);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { sortColors };

/**
 * LeetCode 34: Find First and Last Position of Element in Sorted Array
 *
 * Run lower-bound searches for target and target + 1. Their positions delimit
 * the target's inclusive range.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const lowerBound = (value) => {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const middle = Math.floor((left + right) / 2);
      if (nums[middle] < value) left = middle + 1;
      else right = middle;
    }

    return left;
  };

  const first = lowerBound(target);

  if (first === nums.length || nums[first] !== target) return [-1, -1];

  return [first, lowerBound(target + 1) - 1];
};

if (require.main === module) {
  const tests = [
    [[5, 7, 7, 8, 8, 10], 8, [3, 4]],
    [[5, 7, 7, 8, 8, 10], 6, [-1, -1]],
    [[], 0, [-1, -1]],
    [[2, 2], 2, [0, 1]],
  ];

  tests.forEach(([nums, target, expected], index) => {
    const actual = searchRange(nums, target);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { searchRange };

/**
 * LeetCode 81: Search in Rotated Sorted Array II
 *
 * Binary-search the sorted half. When equal boundary values hide the pivot,
 * shrink both boundaries until a sorted half becomes distinguishable.
 *
 * Time Complexity: O(n) worst case
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (nums[middle] === target) return true;

    if (nums[left] === nums[middle] && nums[middle] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[middle]) {
      if (nums[left] <= target && target < nums[middle]) right = middle - 1;
      else left = middle + 1;
    } else {
      if (nums[middle] < target && target <= nums[right]) left = middle + 1;
      else right = middle - 1;
    }
  }

  return false;
};

if (require.main === module) {
  const tests = [
    [[2, 5, 6, 0, 0, 1, 2], 0, true],
    [[2, 5, 6, 0, 0, 1, 2], 3, false],
    [[1, 0, 1, 1, 1], 0, true],
    [[1, 1, 1], 2, false],
  ];

  tests.forEach(([nums, target, expected], index) => {
    const actual = search(nums, target);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { search };

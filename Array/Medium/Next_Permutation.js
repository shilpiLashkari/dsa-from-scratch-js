/**
 * LeetCode 31: Next Permutation
 *
 * Find the rightmost ascent, swap its smaller value with the smallest larger
 * suffix value, then reverse the descending suffix.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {void}
 */
var nextPermutation = function (nums) {
  let pivot = nums.length - 2;

  while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) pivot--;

  if (pivot >= 0) {
    let successor = nums.length - 1;
    while (nums[successor] <= nums[pivot]) successor--;
    [nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];
  }

  let left = pivot + 1;
  let right = nums.length - 1;

  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};

if (require.main === module) {
  const tests = [
    [[1, 2, 3], [1, 3, 2]],
    [[3, 2, 1], [1, 2, 3]],
    [[1, 1, 5], [1, 5, 1]],
    [[1, 3, 2], [2, 1, 3]],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = [...nums];
    nextPermutation(actual);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { nextPermutation };

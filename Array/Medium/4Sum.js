/**
 * LeetCode 18: 4Sum
 *
 * Sort the array, fix two values, then find the remaining pair with two
 * pointers. Skip equal values at every level to keep quadruplets unique.
 *
 * Time Complexity: O(n^3)
 * Space Complexity: O(log n), depending on the sorting implementation
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const quadruplets = [];

  for (let first = 0; first < nums.length - 3; first++) {
    if (first > 0 && nums[first] === nums[first - 1]) continue;

    for (let second = first + 1; second < nums.length - 2; second++) {
      if (second > first + 1 && nums[second] === nums[second - 1]) continue;

      let left = second + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[first] + nums[second] + nums[left] + nums[right];

        if (sum < target) left++;
        else if (sum > target) right--;
        else {
          quadruplets.push([
            nums[first],
            nums[second],
            nums[left],
            nums[right],
          ]);
          left++;
          right--;

          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        }
      }
    }
  }

  return quadruplets;
};

if (require.main === module) {
  const tests = [
    [
      [1, 0, -1, 0, -2, 2],
      0,
      [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]],
    ],
    [[2, 2, 2, 2, 2], 8, [[2, 2, 2, 2]]],
    [[0, 0, 0], 0, []],
  ];

  tests.forEach(([nums, target, expected], index) => {
    const actual = fourSum([...nums], target);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: quadruplet mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { fourSum };

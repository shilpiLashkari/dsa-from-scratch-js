/**
 * LeetCode 15: 3Sum
 *
 * Sort the array, fix one value, and use two pointers to find complementary
 * pairs while skipping duplicates.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(log n), depending on the sorting implementation
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const triplets = [];

  for (let first = 0; first < nums.length - 2; first++) {
    if (first > 0 && nums[first] === nums[first - 1]) continue;
    if (nums[first] > 0) break;

    let left = first + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[first] + nums[left] + nums[right];

      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        triplets.push([nums[first], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return triplets;
};

if (require.main === module) {
  const tests = [
    [[-1, 0, 1, 2, -1, -4], [[-1, -1, 2], [-1, 0, 1]]],
    [[0, 1, 1], []],
    [[0, 0, 0], [[0, 0, 0]]],
    [[-2, 0, 1, 1, 2], [[-2, 0, 2], [-2, 1, 1]]],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = threeSum([...nums]);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: triplet mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { threeSum };

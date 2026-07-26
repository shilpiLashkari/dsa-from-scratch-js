/**
 * LeetCode 16: 3Sum Closest
 *
 * Sort the values, fix one number, and move two pointers according to whether
 * the current sum is below or above the target.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(log n), depending on the sorting implementation
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let first = 0; first < nums.length - 2; first++) {
    let left = first + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[first] + nums[left] + nums[right];

      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }

      if (sum < target) left++;
      else if (sum > target) right--;
      else return target;
    }
  }

  return closestSum;
};

if (require.main === module) {
  const tests = [
    [[-1, 2, 1, -4], 1, 2],
    [[0, 0, 0], 1, 0],
    [[1, 1, 1, 0], -100, 2],
  ];

  tests.forEach(([nums, target, expected], index) => {
    const actual = threeSumClosest([...nums], target);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { threeSumClosest };

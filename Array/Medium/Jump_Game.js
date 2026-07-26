/**
 * LeetCode 55: Jump Game
 *
 * Track the farthest reachable index. If the scan reaches an index beyond that
 * boundary, the last position is unreachable.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let farthestReach = 0;

  for (let index = 0; index < nums.length; index++) {
    if (index > farthestReach) return false;
    farthestReach = Math.max(farthestReach, index + nums[index]);
    if (farthestReach >= nums.length - 1) return true;
  }

  return true;
};

if (require.main === module) {
  const tests = [
    [[2, 3, 1, 1, 4], true],
    [[3, 2, 1, 0, 4], false],
    [[0], true],
    [[2, 0, 0], true],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = canJump(nums);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { canJump };

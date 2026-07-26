/**
 * LeetCode 45: Jump Game II
 *
 * Treat the indices reachable with the current jump count as a BFS layer. Track
 * the farthest next-layer boundary and commit a jump at the current boundary.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let jumps = 0;
  let currentBoundary = 0;
  let farthestReach = 0;

  for (let index = 0; index < nums.length - 1; index++) {
    farthestReach = Math.max(farthestReach, index + nums[index]);

    if (index === currentBoundary) {
      jumps++;
      currentBoundary = farthestReach;
    }
  }

  return jumps;
};

if (require.main === module) {
  const tests = [
    [[2, 3, 1, 1, 4], 2],
    [[2, 3, 0, 1, 4], 2],
    [[0], 0],
    [[1, 1, 1, 1], 3],
  ];

  tests.forEach(([nums, expected], index) => {
    const actual = jump(nums);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { jump };

/**
 * LeetCode 112: Path Sum
 *
 * Subtract each visited value from the remaining target. At a leaf, the path is
 * valid exactly when the remaining target equals the leaf value.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root === null) return false;

  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  const remaining = targetSum - root.val;

  return (
    hasPathSum(root.left, remaining) ||
    hasPathSum(root.right, remaining)
  );
};

if (require.main === module) {
  const leaf = (val) => ({ val, left: null, right: null });
  const root = {
    val: 5,
    left: {
      val: 4,
      left: { val: 11, left: leaf(7), right: leaf(2) },
      right: null,
    },
    right: { val: 8, left: leaf(13), right: leaf(4) },
  };
  const tests = [
    [root, 22, true],
    [root, 24, false],
    [null, 0, false],
  ];

  tests.forEach(([tree, target, expected], index) => {
    const actual = hasPathSum(tree, target);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { hasPathSum };

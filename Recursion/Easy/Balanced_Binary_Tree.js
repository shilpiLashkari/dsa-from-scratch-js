/**
 * LeetCode 110: Balanced Binary Tree
 *
 * Compute subtree heights bottom-up. Return -1 immediately when a subtree is
 * already unbalanced, avoiding repeated height calculations.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  const height = (node) => {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = height(node.right);
    if (rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;

    return 1 + Math.max(leftHeight, rightHeight);
  };

  return height(root) !== -1;
};

if (require.main === module) {
  const leaf = (val) => ({ val, left: null, right: null });
  const balanced = {
    val: 3,
    left: leaf(9),
    right: { val: 20, left: leaf(15), right: leaf(7) },
  };
  const unbalanced = {
    val: 1,
    left: {
      val: 2,
      left: { val: 3, left: leaf(4), right: leaf(4) },
      right: leaf(3),
    },
    right: leaf(2),
  };
  const tests = [
    [balanced, true],
    [unbalanced, false],
    [null, true],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = isBalanced(tree);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isBalanced };

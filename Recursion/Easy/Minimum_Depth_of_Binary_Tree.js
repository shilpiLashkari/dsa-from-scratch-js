/**
 * LeetCode 111: Minimum Depth of Binary Tree
 *
 * A missing child cannot complete a root-to-leaf path, so a one-child node must
 * continue through its non-null child. Otherwise use the smaller subtree depth.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) return 0;
  if (root.left === null) return 1 + minDepth(root.right);
  if (root.right === null) return 1 + minDepth(root.left);

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

if (require.main === module) {
  const root = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
      val: 20,
      left: { val: 15, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };
  const chain = {
    val: 2,
    left: null,
    right: { val: 3, left: null, right: { val: 4, left: null, right: null } },
  };
  const tests = [
    [root, 2],
    [chain, 3],
    [null, 0],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = minDepth(tree);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { minDepth };

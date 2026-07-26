/**
 * LeetCode 104: Maximum Depth of Binary Tree
 *
 * The depth of a node is one plus the larger depth of its two subtrees.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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
  const tests = [
    [root, 3],
    [null, 0],
    [{ val: 1, left: null, right: null }, 1],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = maxDepth(tree);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { maxDepth };

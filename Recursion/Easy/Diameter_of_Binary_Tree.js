/**
 * LeetCode 543: Diameter of Binary Tree
 *
 * Compute subtree heights bottom-up. At each node, the path joining its deepest
 * left and right descendants is a diameter candidate.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let maximumDiameter = 0;

  const height = (node) => {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    maximumDiameter = Math.max(maximumDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  };

  height(root);
  return maximumDiameter;
};

if (require.main === module) {
  const root = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: { val: 3, left: null, right: null },
  };
  const tests = [
    [root, 3],
    [{ val: 1, left: { val: 2, left: null, right: null }, right: null }, 1],
    [null, 0],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = diameterOfBinaryTree(tree);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { diameterOfBinaryTree };

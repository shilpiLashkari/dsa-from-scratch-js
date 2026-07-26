/**
 * LeetCode 94: Binary Tree Inorder Traversal
 *
 * Simulate recursive inorder traversal with an explicit stack: descend left,
 * visit the node, then traverse its right subtree.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const values = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    values.push(current.val);
    current = current.right;
  }

  return values;
};

if (require.main === module) {
  const root = {
    val: 1,
    left: null,
    right: { val: 2, left: { val: 3, left: null, right: null }, right: null },
  };
  const tests = [
    [root, [1, 3, 2]],
    [null, []],
    [{ val: 1, left: null, right: null }, [1]],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = inorderTraversal(tree);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { inorderTraversal };

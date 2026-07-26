/**
 * LeetCode 99: Recover Binary Search Tree
 *
 * Inorder traversal should be increasing. Record the endpoints of its one or
 * two inversions, then swap those two misplaced node values.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {void}
 */
var recoverTree = function (root) {
  let previous = null;
  let first = null;
  let second = null;

  const inorder = (node) => {
    if (node === null) return;

    inorder(node.left);

    if (previous !== null && previous.val > node.val) {
      if (first === null) first = previous;
      second = node;
    }

    previous = node;
    inorder(node.right);
  };

  inorder(root);
  [first.val, second.val] = [second.val, first.val];
};

if (require.main === module) {
  const inorderValues = (root, values = []) => {
    if (root === null) return values;
    inorderValues(root.left, values);
    values.push(root.val);
    inorderValues(root.right, values);
    return values;
  };
  const first = {
    val: 1,
    left: { val: 3, left: null, right: { val: 2, left: null, right: null } },
    right: null,
  };
  const second = {
    val: 3,
    left: { val: 1, left: null, right: null },
    right: { val: 4, left: { val: 2, left: null, right: null }, right: null },
  };
  const tests = [
    [first, [1, 2, 3]],
    [second, [1, 2, 3, 4]],
  ];

  tests.forEach(([root, expected], index) => {
    recoverTree(root);
    const actual = inorderValues(root);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: recovered inorder mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { recoverTree };

/**
 * LeetCode 98: Validate Binary Search Tree
 *
 * Recursively carry strict lower and upper bounds inherited from every
 * ancestor, not only from the direct parent.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const validate = (node, lower, upper) => {
    if (node === null) return true;
    if (node.val <= lower || node.val >= upper) return false;

    return (
      validate(node.left, lower, node.val) &&
      validate(node.right, node.val, upper)
    );
  };

  return validate(root, -Infinity, Infinity);
};

if (require.main === module) {
  const leaf = (val) => ({ val, left: null, right: null });
  const tests = [
    [{ val: 2, left: leaf(1), right: leaf(3) }, true],
    [
      {
        val: 5,
        left: leaf(1),
        right: { val: 4, left: leaf(3), right: leaf(6) },
      },
      false,
    ],
    [null, true],
  ];

  tests.forEach(([root, expected], index) => {
    const actual = isValidBST(root);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isValidBST };

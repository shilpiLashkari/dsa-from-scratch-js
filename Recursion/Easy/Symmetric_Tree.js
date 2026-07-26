/**
 * LeetCode 101: Symmetric Tree
 *
 * Recursively compare the outside and inside children of the left and right
 * subtrees as mirror pairs.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const areMirrors = (left, right) => {
    if (left === null || right === null) return left === right;

    return (
      left.val === right.val &&
      areMirrors(left.left, right.right) &&
      areMirrors(left.right, right.left)
    );
  };

  return root === null || areMirrors(root.left, root.right);
};

if (require.main === module) {
  const leaf = (val) => ({ val, left: null, right: null });
  const symmetric = {
    val: 1,
    left: { val: 2, left: leaf(3), right: leaf(4) },
    right: { val: 2, left: leaf(4), right: leaf(3) },
  };
  const asymmetric = {
    val: 1,
    left: { val: 2, left: null, right: leaf(3) },
    right: { val: 2, left: null, right: leaf(3) },
  };
  const tests = [
    [symmetric, true],
    [asymmetric, false],
    [null, true],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = isSymmetric(tree);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isSymmetric };

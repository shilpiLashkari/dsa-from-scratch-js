/**
 * LeetCode 530: Minimum Absolute Difference in BST
 *
 * Inorder traversal produces sorted values, so the minimum difference must
 * occur between two consecutive visited nodes.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let previousValue = null;
  let minimumDifference = Infinity;
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();

    if (previousValue !== null) {
      minimumDifference = Math.min(
        minimumDifference,
        current.val - previousValue,
      );
    }

    previousValue = current.val;
    current = current.right;
  }

  return minimumDifference;
};

if (require.main === module) {
  const first = {
    val: 4,
    left: {
      val: 2,
      left: { val: 1, left: null, right: null },
      right: { val: 3, left: null, right: null },
    },
    right: { val: 6, left: null, right: null },
  };
  const second = {
    val: 1,
    left: { val: 0, left: null, right: null },
    right: { val: 48, left: { val: 12, left: null, right: null }, right: null },
  };
  const tests = [
    [first, 1],
    [second, 1],
  ];

  tests.forEach(([root, expected], index) => {
    const actual = getMinimumDifference(root);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { getMinimumDifference };

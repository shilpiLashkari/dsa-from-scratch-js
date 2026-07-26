/**
 * LeetCode 501: Find Mode in Binary Search Tree
 *
 * Inorder traversal visits equal BST values consecutively. Track the current
 * run length and retain every value tied for the largest frequency.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} root
 * @return {number[]}
 */
var findMode = function (root) {
  const modes = [];
  let previousValue;
  let currentFrequency = 0;
  let maximumFrequency = 0;

  const inorder = (node) => {
    if (node === null) return;

    inorder(node.left);

    if (node.val === previousValue) currentFrequency++;
    else {
      previousValue = node.val;
      currentFrequency = 1;
    }

    if (currentFrequency > maximumFrequency) {
      maximumFrequency = currentFrequency;
      modes.length = 0;
      modes.push(node.val);
    } else if (currentFrequency === maximumFrequency) {
      modes.push(node.val);
    }

    inorder(node.right);
  };

  inorder(root);
  return modes;
};

if (require.main === module) {
  const tree = {
    val: 1,
    left: null,
    right: { val: 2, left: { val: 2, left: null, right: null }, right: null },
  };
  const tie = {
    val: 2,
    left: { val: 1, left: null, right: null },
    right: { val: 3, left: null, right: null },
  };
  const tests = [
    [tree, [2]],
    [tie, [1, 2, 3]],
    [{ val: 0, left: null, right: null }, [0]],
  ];

  tests.forEach(([root, expected], index) => {
    const actual = findMode(root);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findMode };

/**
 * LeetCode 102: Binary Tree Level Order Traversal
 *
 * Breadth-first search processes the queue one current level at a time.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w), where w is the maximum tree width
 */

/**
 * @param {TreeNode|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) return [];

  const levels = [];
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    const levelEnd = queue.length;
    const level = [];

    while (head < levelEnd) {
      const node = queue[head++];
      level.push(node.val);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    levels.push(level);
  }

  return levels;
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
    [root, [[3], [9, 20], [15, 7]]],
    [null, []],
    [{ val: 1, left: null, right: null }, [[1]]],
  ];

  tests.forEach(([tree, expected], index) => {
    const actual = levelOrder(tree);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: level order mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { levelOrder };

/**
 * LeetCode 95: Unique Binary Search Trees II
 *
 * Choose every value as a root and combine every recursively generated left
 * subtree with every recursively generated right subtree.
 *
 * Time Complexity: O(Cn * n), where Cn is the nth Catalan number
 * Space Complexity: O(Cn * n), including the generated trees
 */

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const build = (start, end) => {
    if (start > end) return [null];

    const trees = [];

    for (let rootValue = start; rootValue <= end; rootValue++) {
      const leftTrees = build(start, rootValue - 1);
      const rightTrees = build(rootValue + 1, end);

      for (const left of leftTrees) {
        for (const right of rightTrees) {
          trees.push({ val: rootValue, left, right });
        }
      }
    }

    return trees;
  };

  return build(1, n);
};

if (require.main === module) {
  const serialize = (root) => {
    if (root === null) return "#";
    return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
  };
  const tests = [
    [1, 1],
    [2, 2],
    [3, 5],
    [4, 14],
  ];

  tests.forEach(([n, expectedCount], index) => {
    const trees = generateTrees(n);
    const unique = new Set(trees.map(serialize));
    if (trees.length !== expectedCount || unique.size !== expectedCount) {
      throw new Error(`Test ${index + 1}: invalid tree count`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { generateTrees };

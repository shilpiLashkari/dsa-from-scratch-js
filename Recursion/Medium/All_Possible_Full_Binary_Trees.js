/**
 * All Possible Full Binary Trees
 * 
 * Strategy: A Full Binary Tree (FBT) is a tree where each node has either 0 
 * or 2 children. This means the total number of nodes in an FBT must be odd.
 * We use recursion with memoization to solve this:
 * 1. Base case: If n is even, return []. If n = 1, return [new TreeNode(0)].
 * 2. Split n-1 remaining nodes into left and right subtrees:
 *    left nodes = i, right nodes = n - 1 - i, where i is odd.
 * 3. Combine every possible left subtree with every possible right subtree 
 *    under a new root node.
 * 
 * Time Complexity: Exponential (Catalan number related).
 * Space Complexity: Exponential for storing all trees.
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

const memo = new Map();

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function allPossibleFBT(n) {
    if (n % 2 === 0) return [];
    if (n === 1) return [new TreeNode(0)];
    if (memo.has(n)) return memo.get(n);

    const res = [];
    for (let i = 1; i < n; i += 2) {
        const leftTrees = allPossibleFBT(i);
        const rightTrees = allPossibleFBT(n - 1 - i);

        for (const left of leftTrees) {
            for (const right of rightTrees) {
                const root = new TreeNode(0);
                root.left = left;
                root.right = right;
                res.push(root);
            }
        }
    }

    memo.set(n, res);
    return res;
}

// Example Test Case
console.log("Test 1 (n=3):", allPossibleFBT(3).length); // Expected: 1
console.log("Test 2 (n=7):", allPossibleFBT(7).length); // Expected: 5

module.exports = allPossibleFBT;

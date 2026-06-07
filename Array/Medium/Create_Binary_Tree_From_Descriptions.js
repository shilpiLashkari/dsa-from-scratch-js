/**
 * Problem Name: Create Binary Tree From Descriptions
 * Problem Link: https://leetcode.com/problems/create-binary-tree-from-descriptions/
 * 
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * Constructs a binary tree from the given descriptions.
 * 
 * Approach: Hash Map and Hash Set
 * 1. We use a Hash Map `nodes` to keep track of the `TreeNode` objects created for each value.
 * 2. We use a Hash Set `children` to keep track of all node values that are children of some node.
 * 3. Iterate through descriptions to create nodes and link parents to children.
 * 4. The root of the tree is the only node that does not appear in the `children` set.
 * 
 * @param {number[][]} descriptions - An array of [parent, child, isLeft] representations.
 * @return {TreeNode} The root node of the binary tree.
 */
var createBinaryTree = function(descriptions) {
    const nodes = new Map();
    const children = new Set();

    // Step 1 & 2: Create nodes and connect them
    for (const [parentVal, childVal, isLeft] of descriptions) {
        if (!nodes.has(parentVal)) {
            nodes.set(parentVal, new TreeNode(parentVal));
        }
        if (!nodes.has(childVal)) {
            nodes.set(childVal, new TreeNode(childVal));
        }

        const parentNode = nodes.get(parentVal);
        const childNode = nodes.get(childVal);

        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        children.add(childVal);
    }

    // Step 3 & 4: Find the root node
    let root = null;
    for (const [parentVal] of descriptions) {
        if (!children.has(parentVal)) {
            root = nodes.get(parentVal);
            break;
        }
    }

    return root;
};

/*
 * -------------------------------------------------------
 * Complexity Analysis:
 * Time Complexity: O(N)
 *   - We iterate over the descriptions array of length N twice. Map and Set operations take O(1) on average. Total time is O(N).
 * Space Complexity: O(N)
 *   - The `nodes` Map stores all unique node values, and the `children` Set stores all child values. In the worst case, we store 2*N nodes. Total space is O(N).
 * -------------------------------------------------------
 */

// ==========================================
// Test Cases
// ==========================================

// Helper function to print tree in level order format
function printLevelOrder(root) {
    if (!root) return "[]";
    const queue = [root];
    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    // Remove trailing nulls for cleaner output similar to LeetCode
    while (result[result.length - 1] === null) {
        result.pop();
    }
    return "[" + result.map(v => v === null ? "null" : v).join(", ") + "]";
}

console.log("Test Case 1: Example 1");
const descriptions1 = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]];
const root1 = createBinaryTree(descriptions1);
console.log("Output:  ", printLevelOrder(root1));
console.log("Expected:", "[50, 20, 80, 15, 17, 19]");

console.log("\nTest Case 2: Example 2");
const descriptions2 = [[1,2,1],[2,3,0],[3,4,1]];
const root2 = createBinaryTree(descriptions2);
console.log("Output:  ", printLevelOrder(root2));
console.log("Expected:", "[1, 2, null, null, 3, 4]");

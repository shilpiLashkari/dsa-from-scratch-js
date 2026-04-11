// Problem: Unique Binary Search Trees
// Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.

// Example 1:
// Input: n = 3
// Output: 5
// Explanation: The 5 unique BSTs are structurally different.

// Example 2:
// Input: n = 1
// Output: 1

// Constraints:
// 1 <= n <= 19

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    // DP approach or Catalan number.
    // Let's use the DP approach. G(n) = sum(G(i-1) * G(n-i)) for i = 1 to n.
    // Since n is very small (up to 19), DP is extremely fast.
    
    let G = new Array(n + 1).fill(0);
    G[0] = 1; // Empty tree is 1 way
    G[1] = 1; // 1 node tree is 1 way
    
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            // j is the root.
            // Left subtree has j-1 nodes (1 to j-1)
            // Right subtree has i-j nodes (j+1 to i)
            G[i] += G[j - 1] * G[i - j];
        }
    }
    
    return G[n];
};

// Notes:
// - The number of unique BST's for n nodes corresponds to the n-th Catalan number.
// - It can be calculated using Dynamic Programming where the number of trees G(n) 
//   is the sum over each possible root `j` from 1 to `n` of the product of the number of 
//   left subtrees (G(j-1)) and right subtrees (G(n-j)).
// - An O(N) mathematical formula using combinations also exists: C(2n, n) / (n + 1)
// - Time Complexity: O(N^2) for DP
// - Space Complexity: O(N) for the DP array.

module.exports = { numTrees };

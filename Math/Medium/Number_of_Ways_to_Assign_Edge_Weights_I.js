/**
 * Problem: Number of Ways to Assign Edge Weights I (LeetCode 3558)
 * 
 * Strategy:
 * 1. Build an adjacency list representation of the tree.
 * 2. Use Breadth-First Search (BFS) to find the maximum depth of the tree rooted at 1.
 *    The maximum depth represents the number of edges (L) in the longest path from root to any leaf.
 * 3. The number of ways to assign weights (1 or 2) to the L edges on this path such that the sum is odd is 2^(L - 1).
 * 4. Since n >= 2, L is always >= 1.
 * 5. Compute 2^(L - 1) modulo 10^9 + 7.
 * 
 * Time Complexity: O(N) where N is the number of nodes in the tree.
 * Space Complexity: O(N) to store the graph adjacency list and the BFS queue/visited set.
 */

const MOD = 1000000007n;

/**
 * @param {number[][]} edges
 * @return {number}
 */
function assignEdgeWeights(edges) {
    if (!edges || edges.length === 0) return 0;
    
    const n = edges.length + 1;
    const adj = Array.from({ length: n + 1 }, () => []);
    
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    // BFS from root 1 to find the maximum depth (length of the path to the deepest node)
    const queue = [1];
    const visited = new Set([1]);
    let depth = 0;
    let head = 0;
    
    while (head < queue.length) {
        const size = queue.length - head;
        let hasNext = false;
        
        for (let i = 0; i < size; i++) {
            const u = queue[head++];
            for (const v of adj[u]) {
                if (!visited.has(v)) {
                    visited.add(v);
                    queue.push(v);
                    hasNext = true;
                }
            }
        }
        
        if (hasNext) {
            depth++;
        }
    }
    
    if (depth === 0) return 0;
    
    // Compute 2^(depth - 1) % MOD
    return Number(power(2n, BigInt(depth - 1), MOD));
}

/**
 * Modular Exponentiation: (base^exp) % mod
 */
function power(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = (res * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return res;
}

// Example Test Cases
console.log("Test 1 (edges = [[1,2],[1,3],[3,4],[3,5]]):", assignEdgeWeights([[1, 2], [1, 3], [3, 4], [3, 5]])); // Expected: 2
console.log("Test 2 (edges = [[1,2]]):", assignEdgeWeights([[1, 2]])); // Expected: 1
console.log("Test 3 (edges = [[1,2],[2,3],[3,4]]):", assignEdgeWeights([[1, 2], [2, 3], [3, 4]])); // Expected: 4

module.exports = assignEdgeWeights;

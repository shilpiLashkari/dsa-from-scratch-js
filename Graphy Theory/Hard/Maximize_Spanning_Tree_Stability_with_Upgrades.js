// Problem: Maximize Spanning Tree Stability with Upgrades (LeetCode 3600)

// You are given an undirected connected graph with n nodes and m edges.
// Each edge i is represented as [u_i, v_i, s_i, must_i].
// u_i, v_i are the nodes, s_i is the initial strength, and must_i is a boolean.
// If must_i is 1, the edge must be included in the spanning tree and cannot be upgraded.
// If must_i is 0, the edge is optional and can be upgraded at most once, doubling its strength.
// You can perform at most k upgrades.
// Return the maximum possible stability (minimum strength among all edges in the spanning tree).
// If no spanning tree can be formed, return -1.

/**
 * Disjoint Set Union (DSU) with Path Compression and Union by Rank
 */
class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.numComponents = n;
    }

    find(i) {
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]);
    }

    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootI] = rootJ;
                this.rank[rootJ]++;
            }
            this.numComponents--;
            return true;
        }
        return false;
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStability = function (n, edges, k) {
    if (n === 1) return 0;

    const check = (target) => {
        let dsu = new DSU(n);
        let edgesUsed = 0;
        let upgradesUsed = 0;

        // 1. Process Mandatory Edges
        for (const [u, v, s, must] of edges) {
            if (must === 1) {
                if (s < target) return false;
                if (dsu.union(u, v)) {
                    edgesUsed++;
                }
            }
        }

        // 2. Process Optional Edges that meet target without upgrade
        for (const [u, v, s, must] of edges) {
            if (must === 0 && s >= target) {
                if (dsu.union(u, v)) {
                    edgesUsed++;
                }
            }
        }

        // 3. Process Optional Edges that need upgrade to meet target
        // We sort them to prioritize edges that are "closer" to the target or just use any that fit.
        // Actually, since all upgrades cost 1, any edge that satisfies 2*s >= target is equivalent.
        for (const [u, v, s, must] of edges) {
            if (must === 0 && s < target && 2 * s >= target && upgradesUsed < k) {
                if (dsu.union(u, v)) {
                    edgesUsed++;
                    upgradesUsed++;
                }
            }
        }

        return edgesUsed === n - 1;
    };

    let low = 0;
    let high = 0;
    for (const [, , s] of edges) high = Math.max(high, 2 * s);

    let result = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (check(mid)) {
            result = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return result;
};

// Notes:
// - The problem asks to maximize the minimum (stability). This is a classic Binary Search on Answer pattern.
// - For a fixed target stability 'X', we check if we can form a spanning tree where all edges >= X.
// - Mandatory edges MUST be >= X. Optional edges can be >= X initially or after one upgrade (2*s >= X).
// - We use DSU to manage connectivity and ensure no cycles.
// - Time Complexity: O(log(MaxStrength) * E * α(N)), where E is number of edges and α is inverse Ackermann.
// - Space Complexity: O(N) for DSU.

module.exports = { maxStability };

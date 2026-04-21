/**
 * Minimize Hamming Distance After Swap Operations
 * 
 * Strategy: Use a Union-Find data structure to group indices that can be swapped.
 * Any indices in the same connected component can have their values rearranged freely.
 * For each connected component, we count the frequencies of values in the source and target arrays.
 * The number of matches for a component is the sum of the minimum of the counts of each value in source and target.
 * The Hamming distance for the component is componentSize - totalMatches.
 * 
 * Time Complexity: O(N + S * α(N)) where N is the length of the arrays, S is the number of swaps, and α is the inverse Ackermann function.
 * Space Complexity: O(N) to store the Union-Find structure and frequency maps.
 */

class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
    }

    find(i) {
        if (this.parent[i] === i) return i;
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
}

/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
function minimumHammingDistance(source, target, allowedSwaps) {
    const n = source.length;
    const uf = new UnionFind(n);

    for (const [u, v] of allowedSwaps) {
        uf.union(u, v);
    }

    // Group indices by their connected component root
    const components = new Map();
    for (let i = 0; i < n; i++) {
        const root = uf.find(i);
        if (!components.has(root)) {
            components.set(root, []);
        }
        components.get(root).push(i);
    }

    let totalMatches = 0;
    for (const [root, indices] of components) {
        const sourceCounts = new Map();
        for (const idx of indices) {
            const val = source[idx];
            sourceCounts.set(val, (sourceCounts.get(val) || 0) + 1);
        }

        let matches = 0;
        for (const idx of indices) {
            const val = target[idx];
            if (sourceCounts.has(val) && sourceCounts.get(val) > 0) {
                matches++;
                sourceCounts.set(val, sourceCounts.get(val) - 1);
            }
        }
        totalMatches += matches;
    }

    return n - totalMatches;
}

// Example Test Cases
console.log("Test 1:", minimumHammingDistance([1, 2, 3, 4], [2, 1, 4, 5], [[0, 1], [2, 3]])); // Expected: 1
console.log("Test 2:", minimumHammingDistance([1, 2, 3, 4], [1, 3, 2, 4], []));             // Expected: 2
console.log("Test 3:", minimumHammingDistance([5, 1, 2, 4, 3], [1, 5, 4, 2, 3], [[0, 1], [1, 2], [3, 4]])); // Expected: 2

module.exports = minimumHammingDistance;

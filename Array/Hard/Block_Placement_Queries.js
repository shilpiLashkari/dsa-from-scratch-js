/**
 * Problem: Block Placement Queries (LeetCode 3161)
 * 
 * There exists an infinite number line starting at 0.
 * You are given a 2D array queries.
 * Queries can be of two types:
 * 1. [1, x]: Build an obstacle at distance x from the origin. 
 *    (It is guaranteed that no obstacle exists at x when the query is made).
 * 2. [2, x, sz]: Check if it is possible to place a block of size sz 
 *    anywhere in the range [0, x]. The block can touch obstacles but cannot overlap them.
 * 
 * Returns a boolean array containing the results of all type 2 queries.
 * 
 * Time Complexity: O(Q * log^2(X)) where Q is the number of queries and X is max coordinate (up to 50000).
 * Space Complexity: O(X) for Fenwick Tree and Segment Tree.
 */

class FenwickTree {
    constructor(size) {
        this.tree = new Int32Array(size + 1);
    }

    add(i, delta) {
        for (; i < this.tree.length; i += i & -i) {
            this.tree[i] += delta;
        }
    }

    query(i) {
        let sum = 0;
        for (; i > 0; i -= i & -i) {
            sum += this.tree[i];
        }
        return sum;
    }
}

/**
 * Segment tree to maintain the maximum gap between obstacles
 */
class SegmentTree {
    constructor(size) {
        this.tree = new Int32Array(4 * size);
    }

    update(node, start, end, idx, val) {
        if (start === end) {
            this.tree[node] = val;
            return;
        }
        let mid = Math.floor((start + end) / 2);
        if (start <= idx && idx <= mid) {
            this.update(2 * node, start, mid, idx, val);
        } else {
            this.update(2 * node + 1, mid + 1, end, idx, val);
        }
        this.tree[node] = Math.max(this.tree[2 * node], this.tree[2 * node + 1]);
    }

    query(node, start, end, l, r) {
        if (r < start || end < l || l > r) return 0;
        if (l <= start && end <= r) return this.tree[node];
        let mid = Math.floor((start + end) / 2);
        let p1 = this.query(2 * node, start, mid, l, r);
        let p2 = this.query(2 * node + 1, mid + 1, end, l, r);
        return Math.max(p1, p2);
    }
}

/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function(queries) {
    let MAX_X = 0;
    for (let q of queries) {
        MAX_X = Math.max(MAX_X, q[1]);
    }
    // Safety buffer
    MAX_X += 5;
    
    // Fenwick Tree will be 1-indexed (1 to MAX_X + 1)
    let fw = new FenwickTree(MAX_X + 1);
    let sg = new SegmentTree(MAX_X + 1);
    
    // obstacles[i] is true if there's an obstacle at i
    let obstacles = new Uint8Array(MAX_X + 1);
    
    // Initial obstacle at 0
    obstacles[0] = 1;
    fw.add(1, 1);
    sg.update(1, 0, MAX_X, 0, 0);
    
    const getPrevObstacle = (x) => {
        let sum = fw.query(x + 1);
        if (sum === 0) return 0; // Should always find at least 0
        let low = 0, high = x;
        let ans = 0;
        while (low <= high) {
            let mid = (low + high) >> 1;
            if (fw.query(mid + 1) === sum) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    };
    
    const getNextObstacle = (x) => {
        let sum = fw.query(x + 1);
        let total = fw.query(MAX_X + 1);
        if (sum === total) return -1;
        
        let low = x + 1, high = MAX_X;
        let ans = -1;
        while (low <= high) {
            let mid = (low + high) >> 1;
            if (fw.query(mid + 1) >= sum + 1) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    };
    
    let res = [];
    
    for (let q of queries) {
        if (q[0] === 1) {
            let x = q[1];
            if (!obstacles[x]) {
                let prev = getPrevObstacle(x);
                let next = getNextObstacle(x);
                
                obstacles[x] = 1;
                fw.add(x + 1, 1);
                
                sg.update(1, 0, MAX_X, x, x - prev);
                if (next !== -1) {
                    sg.update(1, 0, MAX_X, next, next - x);
                }
            }
        } else if (q[0] === 2) {
            let x = q[1];
            let sz = q[2];
            
            let prev = getPrevObstacle(x);
            let maxGap = sg.query(1, 0, MAX_X, 0, prev);
            let lastGap = x - prev;
            
            res.push(Math.max(maxGap, lastGap) >= sz);
        }
    }
    
    return res;
};

// --- Test Cases ---
console.log("Running tests...");

const runTest = (queries, expected) => {
    const result = getResults(queries);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test ${pass ? 'PASSED' : 'FAILED'}`);
    if (!pass) {
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
    }
};

runTest([[1, 2], [2, 3, 3], [2, 3, 1], [2, 2, 2]], [false, true, true]);
runTest([[1, 7], [2, 7, 6], [1, 2], [2, 7, 5], [2, 7, 6]], [true, true, false]);
runTest([[2, 1, 2]], [false]); // Single query type 2
runTest([[1, 4], [2, 4, 4]], [true]); // Block fits exactly

console.log("All tests completed.");

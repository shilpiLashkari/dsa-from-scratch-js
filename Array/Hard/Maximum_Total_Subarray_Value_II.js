/**
 * Maximum Total Subarray Value II
 * LeetCode #3691 — Hard
 *
 * Problem:
 * Given a 0-indexed integer array `nums` of length `n` and an integer `k`.
 * Choose exactly `k` distinct non-empty subarrays `nums[l..r]`.
 * Subarrays may overlap, but the same subarray (same l and r) cannot be selected more than once.
 * The value of a subarray nums[l..r] is defined as: max(nums[l..r]) - min(nums[l..r]).
 * Return the maximum possible total value (sum of values of all k chosen subarrays).
 *
 * Constraints:
 * 1 <= n == nums.length <= 5 * 10^4
 * 0 <= nums[i] <= 10^9
 * 1 <= k <= min(10^5, n * (n + 1) / 2)
 *
 * Key Insight:
 * 1. Monotonicity: For a fixed starting position `l`, the value of the subarray `max(nums[l..r]) - min(nums[l..r])`
 *    is monotonically non-decreasing as `r` increases.
 * 2. Greedy Top-K Search: The largest value starting at `l` is always achieved when `r` is as large as possible,
 *    i.e., `r = n - 1`. We can initialize a Max Heap with the candidate subarray `[l, n - 1]` for each `l` from `0` to `n - 1`.
 * 3. Priority Queue: At each step, we extract the candidate with the maximum value from the heap. Let this candidate
 *    be `[l, r]`. We add its value to our total. Then, we push the next best candidate starting at `l`, which is
 *    `[l, r - 1]` (if `r - 1 >= l`), into the heap. We repeat this process `k` times.
 * 4. Range Query (Sparse Table): To query `max` and `min` values of any subarray `[l, r]` in O(1) time, we construct
 *    a Sparse Table for Range Minimum / Maximum Query (RMQ) in O(N log N) preprocessing time.
 *
 * Complexity:
 * Time Complexity:  O((N + K) log N) — O(N log N) to build the Sparse Table, and O(K log N) for heap operations.
 * Space Complexity: O(N log N) — to store the Sparse Table.
 */

class SparseTableRMQ {
    /**
     * @param {number[]} data - The input array.
     */
    constructor(data) {
        const n = data.length;
        const maxLog = Math.floor(Math.log2(n)) + 1;
        
        // Row-major table representation
        this.fMax = Array.from({ length: n }, () => new Array(maxLog).fill(0));
        this.fMin = Array.from({ length: n }, () => new Array(maxLog).fill(0));

        // Precompute logarithm table for O(1) RMQ queries
        this.lg = new Array(n + 1).fill(0);
        for (let i = 2; i <= n; i++) {
            this.lg[i] = this.lg[i >> 1] + 1;
        }

        for (let i = 0; i < n; i++) {
            this.fMax[i][0] = data[i];
            this.fMin[i][0] = data[i];
        }

        for (let j = 1; j < maxLog; j++) {
            const len = 1 << (j - 1);
            const limit = n - (1 << j);
            for (let i = 0; i <= limit; i++) {
                this.fMax[i][j] = Math.max(this.fMax[i][j - 1], this.fMax[i + len][j - 1]);
                this.fMin[i][j] = Math.min(this.fMin[i][j - 1], this.fMin[i + len][j - 1]);
            }
        }
    }

    /**
     * Queries the maximum value in range [l, r]
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    queryMax(l, r) {
        const k = this.lg[r - l + 1];
        return Math.max(this.fMax[l][k], this.fMax[r - (1 << k) + 1][k]);
    }

    /**
     * Queries the minimum value in range [l, r]
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    queryMin(l, r) {
        const k = this.lg[r - l + 1];
        return Math.min(this.fMin[l][k], this.fMin[r - (1 << k) + 1][k]);
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    /**
     * Pushes a new candidate to the heap
     * @param {number} val - Subarray value (max - min)
     * @param {number} l - Left index of subarray
     * @param {number} r - Right index of subarray
     */
    push(val, l, r) {
        this.heap.push({ val, l, r });
        this._up(this.heap.length - 1);
    }

    /**
     * Pops the candidate with the maximum value from the heap
     * @return {{val: number, l: number, r: number} | null}
     */
    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._down(0);
        }
        return top;
    }

    _up(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.heap[i].val <= this.heap[p].val) break;
            const tmp = this.heap[i];
            this.heap[i] = this.heap[p];
            this.heap[p] = tmp;
            i = p;
        }
    }

    _down(i) {
        const len = this.heap.length;
        while ((i << 1) + 1 < len) {
            let left = (i << 1) + 1;
            let right = left + 1;
            let best = i;

            if (this.heap[left].val > this.heap[best].val) {
                best = left;
            }
            if (right < len && this.heap[right].val > this.heap[best].val) {
                best = right;
            }
            if (best === i) break;

            const tmp = this.heap[i];
            this.heap[i] = this.heap[best];
            this.heap[best] = tmp;
            i = best;
        }
    }
}

/**
 * @param {number[]} nums - The input array.
 * @param {number} k - The number of distinct subarrays to select.
 * @return {number} - The maximum possible total value.
 */
function maxTotalValue(nums, k) {
    const n = nums.length;
    const st = new SparseTableRMQ(nums);
    const pq = new MaxHeap();

    // Initialize the heap with the max-length subarray starting at each index l.
    for (let l = 0; l < n; l++) {
        const val = st.queryMax(l, n - 1) - st.queryMin(l, n - 1);
        pq.push(val, l, n - 1);
    }

    let ans = 0;
    // Extract the top-k subarray values greedily.
    for (let i = 0; i < k; i++) {
        const curr = pq.pop();
        if (!curr) break;

        ans += curr.val;
        const l = curr.l;
        const r = curr.r;

        // If we can shrink the subarray from the right, push the next candidate.
        if (r > l) {
            const nextVal = st.queryMax(l, r - 1) - st.queryMin(l, r - 1);
            pq.push(nextVal, l, r - 1);
        }
    }

    return ans;
}

// ------------------------------------------------------------------------------------
// Test Cases
// ------------------------------------------------------------------------------------
const runTests = () => {
    const testCases = [
        { nums: [1, 3, 2], k: 2, expected: 4 },
        { nums: [4, 2, 5, 1], k: 3, expected: 12 },
        { nums: [5, 5, 5], k: 3, expected: 0 },
        { nums: [4, 1, 9, 3], k: 1, expected: 8 },
        { nums: [7], k: 1, expected: 0 },
        { nums: [1, 2, 3, 4, 5], k: 4, expected: 12 }
    ];

    let passed = 0;
    testCases.forEach((tc, i) => {
        const result = maxTotalValue(tc.nums, tc.k);
        if (result === tc.expected) {
            console.log(`Test case ${i + 1} passed!`);
            passed++;
        } else {
            console.error(`Test case ${i + 1} failed! Expected ${tc.expected}, but got ${result}`);
        }
    });

    console.log(`${passed} out of ${testCases.length} test cases passed.`);
};

// Only run tests if executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

module.exports = { maxTotalValue };

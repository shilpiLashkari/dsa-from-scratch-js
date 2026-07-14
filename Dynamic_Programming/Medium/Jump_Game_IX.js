/**
 * LeetCode 2297: Jump Game VIII (Referred to as Jump Game IX in this file)
 * 
 * Problem:
 * You are given a 0-indexed integer array nums of length n and an integer array costs of length n.
 * You are initially standing at index 0. You can jump from index i to index j (i < j) if:
 * 1. nums[i] <= nums[j] and for all k (i < k < j), nums[k] < nums[i]
 * 2. nums[i] > nums[j] and for all k (i < k < j), nums[k] >= nums[i]
 * 
 * Return the minimum cost to reach the last index.
 * 
 * Strategy:
 * - The conditions for jumping from i to j imply:
 *   - Condition 1: j is the first index to the right of i such that nums[j] >= nums[i].
 *   - Condition 2: j is the first index to the right of i such that nums[j] < nums[i].
 * - We can find these "next jump targets" for every index using monotonic stacks in O(N) time.
 * - Once we have the jump targets, we use Dynamic Programming to find the minimum cost.
 * - dp[i] will store the minimum cost to reach index i.
 * 
 * Time Complexity: O(N) where N is the length of nums.
 * Space Complexity: O(N) to store dp array and next jump targets.
 */

/**
 * @param {number[]} nums
 * @param {number[]} costs
 * @return {number}
 */
var minCost = function(nums, costs) {
    const n = nums.length;
    if (n === 0) return 0;

    // dp[i] is the minimum cost to reach index i
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    // Pre-calculate next jump targets using monotonic stacks
    const nextGreaterEqual = new Array(n).fill(-1);
    const nextSmaller = new Array(n).fill(-1);

    const stackGE = []; // Monotonic decreasing stack to find next greater or equal
    const stackS = [];  // Monotonic increasing stack to find next smaller

    for (let i = 0; i < n; i++) {
        // Find next greater or equal for indices in stackGE
        while (stackGE.length > 0 && nums[stackGE[stackGE.length - 1]] <= nums[i]) {
            nextGreaterEqual[stackGE.pop()] = i;
        }
        // Find next smaller for indices in stackS
        while (stackS.length > 0 && nums[stackS[stackS.length - 1]] > nums[i]) {
            nextSmaller[stackS.pop()] = i;
        }
        stackGE.push(i);
        stackS.push(i);
    }

    // DP transition
    for (let i = 0; i < n; i++) {
        if (dp[i] === Infinity) continue;

        // Jump to next greater or equal element
        if (nextGreaterEqual[i] !== -1) {
            const j = nextGreaterEqual[i];
            dp[j] = Math.min(dp[j], dp[i] + costs[j]);
        }

        // Jump to next smaller element
        if (nextSmaller[i] !== -1) {
            const j = nextSmaller[i];
            dp[j] = Math.min(dp[j], dp[i] + costs[j]);
        }
    }

    return dp[n - 1];
};

// Test cases
const testCases = [
    {
        nums: [3, 2, 4, 4, 1],
        costs: [3, 7, 6, 4, 2],
        expected: 8
    },
    {
        nums: [0, 1, 2],
        costs: [1, 1, 1],
        expected: 2
    },
    {
        nums: [3, 4, 2, 1],
        costs: [0, 3, 2, 1],
        expected: 3
    }
];

testCases.forEach((tc, index) => {
    const result = minCost(tc.nums, tc.costs);
    console.log(`Test Case ${index + 1}: ${result === tc.expected ? 'PASSED' : 'FAILED'} (Expected: ${tc.expected}, Got: ${result})`);
});

/**
 * Problem: Maximum Number of Jumps to Reach the Last Index
 * LeetCode: 2770 (Medium)
 * 
 * Description:
 * You are given a 0-indexed integer array nums of length n and an integer target.
 * You are initially at index 0. In one step, you can jump from index i to any index j such that:
 * 1. 0 <= i < j < n
 * 2. -target <= nums[j] - nums[i] <= target
 * 
 * Return the maximum number of jumps you can make to reach index n - 1.
 * If there is no way to reach index n - 1, return -1.
 * 
 * Approach:
 * We use Dynamic Programming. Let dp[i] represent the maximum number of jumps to reach index i from index 0.
 * - Initialize dp[0] = 0 (we are already at index 0).
 * - Initialize dp[i] = -1 for all i > 0, representing that they are not yet reachable.
 * - For each index j from 1 to n - 1, we check all previous indices i from 0 to j - 1.
 * - If index i is reachable (dp[i] != -1) and the condition |nums[j] - nums[i]| <= target is met, 
 *   we update dp[j] = Math.max(dp[j], dp[i] + 1).
 * - Finally, return dp[n-1].
 * 
 * Time Complexity: O(N^2) - Nested loops to check all pairs (i, j).
 * Space Complexity: O(N) - DP array of size N.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function maximumJumps(nums, target) {
    const n = nums.length;
    // dp[i] stores the maximum jumps to reach index i.
    // We use -1 to indicate that the index is not reachable.
    const dp = new Array(n).fill(-1);
    
    // Starting point
    dp[0] = 0;
    
    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            // Check if i is reachable and the jump condition is satisfied
            if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }
    
    return dp[n - 1];
}

// --- Test Cases ---

const testCases = [
    { nums: [1, 3, 6, 4, 1, 2], target: 2, expected: 3 },
    { nums: [1, 3, 6, 4, 1, 2], target: 3, expected: 5 },
    { nums: [1, 3, 6, 4, 1, 2], target: 0, expected: -1 },
    { nums: [1, 0, 2], target: 1, expected: 1 },
    { nums: [0], target: 1, expected: 0 }
];

testCases.forEach(({ nums, target, expected }, index) => {
    const result = maximumJumps(nums, target);
    console.log(`Test Case ${index + 1}: nums = [${nums}], target = ${target}`);
    console.log(`Expected: ${expected}, Result: ${result}`);
    console.log(result === expected ? "✅ Passed" : "❌ Failed");
    console.log("-----------------------------------------");
});

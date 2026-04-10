/**
 * Burst Balloons
 * 
 * Problem:
 * You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. 
 * You are asked to burst all the balloons.
 * 
 * If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. 
 * After the burst, the (i - 1)th and (i + 1)th balloons become adjacent.
 * 
 * Find the maximum coins you can collect by bursting the balloons wisely.
 * 
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 300
 * - 0 <= nums[i] <= 100
 * 
 * Pattern: Range Dynamic Programming
 * Complexity: O(N^3) Time, O(N^2) Space
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = (nums) => {
    // Add virtual balloons at both ends with value 1
    const n = nums.length;
    const balloons = [1, ...nums, 1];
    
    // dp[i][j] represents the maximum coins collected by bursting 
    // all balloons between index i and j (inclusive).
    const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));

    // len is the length of the interval of balloons being burst
    for (let len = 1; len <= n; len++) {
        // i is the left boundary of the interval
        for (let i = 1; i <= n - len + 1; i++) {
            // j is the right boundary of the interval
            const j = i + len - 1;
            
            // k is the index of the LAST balloon to burst in the interval [i, j]
            for (let k = i; k <= j; k++) {
                // When balloon k is the last to burst in [i, j], 
                // the balloons adjacent to it are balloons[i-1] and balloons[j+1].
                const coins = balloons[i - 1] * balloons[k] * balloons[j + 1];
                
                // Total coins = coins from bursting k + max coins from left and right sub-intervals
                dp[i][j] = Math.max(
                    dp[i][j],
                    coins + dp[i][k - 1] + dp[k + 1][j]
                );
            }
        }
    }

    return dp[1][n];
};

// --- Test Cases ---
const runTest = (nums, expected) => {
    const result = maxCoins(nums);
    console.log(`Input: [${nums}] | Output: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
};

console.log("Running Burst Balloons tests...");
runTest([3, 1, 5, 8], 167);
// Steps for [3, 1, 5, 8]:
// 1. Burst 1: 3*1*5 = 15
// 2. Burst 5: 3*5*8 = 120
// 3. Burst 3: 1*3*8 = 24
// 4. Burst 8: 1*8*1 = 8
// Total = 15 + 120 + 24 + 8 = 167

runTest([1, 5], 10);
// Steps for [1, 5]:
// 1. Burst 1: 1*1*5 = 5
// 2. Burst 5: 1*5*1 = 5
// Total = 10

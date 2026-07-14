// Problem: Find All Possible Stable Binary Arrays I
/*
You are given 3 positive integers zero, one, and limit.
A binary array arr is called stable if:
- The number of occurrences of 0 in arr is exactly zero.
- The number of occurrences of 1 in arr is exactly one.
- Each subarray of arr with a size greater than limit must contain both 0 and 1.

Return the total number of stable binary arrays.
Since the answer may be very large, return it modulo 10^9 + 7.

Example 1:
Input: zero = 1, one = 1, limit = 2
Output: 2
Explanation: The two possible stable binary arrays are [1,0] and [0,1].

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1
Explanation: The only possible stable binary array is [1,0,1].

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14

Constraints:
1 <= zero, one, limit <= 200
*/

/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function (zero, one, limit) {
  const MOD = 1000000007;

  // dp[i][j][k] stores the number of stable arrays with i zeros and j ones
  // ending with digit k (0 or 1).
  const dp = Array.from({ length: zero + 1 }, () =>
    Array.from({ length: one + 1 }, () => new Int32Array(2)),
  );

  // Base cases: single-digit segments (of length 1 to limit)
  for (let i = 1; i <= Math.min(zero, limit); i++) {
    dp[i][0][0] = 1;
  }
  for (let j = 1; j <= Math.min(one, limit); j++) {
    dp[0][j][1] = 1;
  }

  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      // Case 0: Adding a 0 at the end
      // dp[i][j][0] = count(i-1, j, 0) + count(i-1, j, 1)
      // But we must subtract cases where we had 'limit' consecutive 0s and just added another.
      // Those cases are exactly where at (i-limit-1, j) we had a 1, then added limit+1 zeros.
      dp[i][j][0] = (dp[i - 1][j][0] + dp[i - 1][j][1]) % MOD;
      if (i > limit) {
        dp[i][j][0] = (dp[i][j][0] - dp[i - limit - 1][j][1] + MOD) % MOD;
      }

      // Case 1: Adding a 1 at the end
      dp[i][j][1] = (dp[i][j - 1][0] + dp[i][j - 1][1]) % MOD;
      if (j > limit) {
        dp[i][j][1] = (dp[i][j][1] - dp[i][j - limit - 1][0] + MOD) % MOD;
      }
    }
  }

  return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
};

// Complexity Analysis:
// Time Complexity: O(zero * one) - Two nested loops up to zero and one.
// Space Complexity: O(zero * one) - 3D DP table of size (zero+1) * (one+1) * 2.

module.exports = { numberOfStableArrays };

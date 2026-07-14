// Problem: Find the Number of Subsequences With Equal GCD (LeetCode #3336)
// You are given an integer array nums. Your task is to find the number of pairs
// of non-empty subsequences (seq1, seq2) of nums that satisfy the following conditions:
// - The subsequences seq1 and seq2 are disjoint, meaning no index of nums is common between them.
// - The GCD of the elements of seq1 is equal to the GCD of the elements of seq2.
//
// Return the number of such pairs. Since the answer may be very large, return it modulo 10^9 + 7.
//
// Example 1:
// Input: nums = [1, 2, 3, 4]
// Output: 10
// Explanation: The subsequence pairs which have the GCD of their elements equal to 1 are 10 pairs.
//
// Example 2:
// Input: nums = [10, 20, 30]
// Output: 2
// Explanation: The subsequence pairs which have the GCD of their elements equal to 10 are:
// - ([10], [20, 30]) -> GCD(10) = 10, GCD(20, 30) = 10
// - ([20, 30], [10]) -> GCD(20, 30) = 10, GCD(10) = 10
//
// Constraints:
// - 1 <= nums.length <= 200
// - 1 <= nums[i] <= 200

// Solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencePairCount = function (nums) {
  const MOD = 1000000007;
  const n = nums.length;

  // Find the maximum value in nums to establish the upper bound for any potential GCD.
  let maxNum = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] > maxNum) maxNum = nums[i];
  }

  // dp[x][y] represents the number of valid pairs of disjoint subsequences
  // formed so far, where seq1 has a current GCD of x, and seq2 has a current GCD of y.
  // GCD(empty_set) is represented by 0.
  let dp = Array.from({ length: maxNum + 1 }, () =>
    new Array(maxNum + 1).fill(0),
  );

  // Base case: There is 1 way to have both subsequences empty (GCDs are 0, 0).
  dp[0][0] = 1;

  // Helper: Euclidean algorithm to find Greatest Common Divisor
  const gcd = (a, b) => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Iterate through every number in the input array.
  // For each number, we decide whether to add it to seq1, add it to seq2, or skip it.
  for (let i = 0; i < n; i++) {
    const num = nums[i];

    // Create a new DP table for the current state to avoid using updated values
    // within the same iteration step.
    let nextDp = Array.from({ length: maxNum + 1 }, () =>
      new Array(maxNum + 1).fill(0),
    );

    for (let x = 0; x <= maxNum; x++) {
      for (let y = 0; y <= maxNum; y++) {
        if (dp[x][y] === 0) continue;

        const count = dp[x][y];

        // Choice 1: Skip nums[i] entirely (neither seq1 nor seq2 takes it).
        nextDp[x][y] = (nextDp[x][y] + count) % MOD;

        // Choice 2: Include nums[i] into the first subsequence (seq1).
        const nextX = x === 0 ? num : gcd(x, num);
        nextDp[nextX][y] = (nextDp[nextX][y] + count) % MOD;

        // Choice 3: Include nums[i] into the second subsequence (seq2).
        const nextY = y === 0 ? num : gcd(y, num);
        nextDp[x][nextY] = (nextDp[x][nextY] + count) % MOD;
      }
    }
    dp = nextDp;
  }

  // Accumulate all pairs where both subsequences are non-empty (g > 0)
  // and have identical GCD values (x === y === g).
  let totalPairs = 0;
  for (let g = 1; g <= maxNum; g++) {
    totalPairs = (totalPairs + dp[g][g]) % MOD;
  }

  return totalPairs;
};

// Notes:
// - Key Insight: Since the constraints on nums[i] are small (nums[i] <= 200), the upper bound
//   for any mathematical GCD is capped at 200. This highly restricts our state-space.
// - Instead of generating all subsequences explicitly (which takes O(3^n)), we compress states
//   using Dynamic Programming tracked by `dp[gcd_of_seq1][gcd_of_seq2]`.
// - Transition Options: For each number `num`, every existing pair of valid states `(x, y)` branches into:
//   1. (x, y)          -> skip
//   2. (gcd(x, num), y)-> add to seq1
//   3. (x, gcd(y, num))-> add to seq2
// - Edge Case: `gcd(0, num) = num`. We use 0 as a flag indicating that a subsequence is currently empty,
//   ensuring that the first element chosen perfectly sets the initial GCD of that subsequence.
// - Time Complexity: O(n * maxNum^2), where n <= 200 and maxNum <= 200. This runs well within time limits (~8 * 10^6 iterations).
// - Space Complexity: O(maxNum^2) by keeping only the previous and next DP layers to save memory.

/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function (zero, one, limit) {
  const MOD = 1000000007n;

  // dp0[i][j] is the number of stable arrays with i zeros and j ones ending in 0
  // dp1[i][j] is the number of stable arrays with i zeros and j ones ending in 1

  // Using BigInt for calculations to avoid overflow before modulo
  // We can use 1D arrays to save space, but 2D is clearer for this implementation.
  // However, given the constraints (1000x1000), 2D arrays are fine.

  let dp0 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));
  let dp1 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));

  // Base cases:
  // Arrays with only zeros
  for (let i = 1; i <= Math.min(zero, limit); i++) {
    dp0[i][0] = 1n;
  }

  // Arrays with only ones
  for (let j = 1; j <= Math.min(one, limit); j++) {
    dp1[0][j] = 1n;
  }

  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      // dp0[i][j] = dp0[i-1][j] + dp1[i-1][j] - (if i > limit: dp1[i-limit-1][j])
      dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
      if (i > limit) {
        dp0[i][j] = (dp0[i][j] - dp1[i - limit - 1][j] + MOD) % MOD;
      }

      // dp1[i][j] = dp1[i][j-1] + dp0[i][j-1] - (if j > limit: dp0[i][j-limit-1])
      dp1[i][j] = (dp1[i][j - 1] + dp0[i][j - 1]) % MOD;
      if (j > limit) {
        dp1[i][j] = (dp1[i][j] - dp0[i][j - limit - 1] + MOD) % MOD;
      }
    }
  }

  return Number((dp0[zero][one] + dp1[zero][one]) % MOD);
};

// Example usage:
// console.log(numberOfStableArrays(1, 1, 2)); // Output: 2
// console.log(numberOfStableArrays(1, 2, 1)); // Output: 1
// console.log(numberOfStableArrays(3, 3, 2)); // Output: 14

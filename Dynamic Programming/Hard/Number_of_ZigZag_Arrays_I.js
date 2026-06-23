// Problem: Number of ZigZag Arrays I (LeetCode #3699)
// Given integers n, l, r, count the number of length-n arrays where:
//  - every element is within [l, r]
//  - no two adjacent elements are equal
//  - no three consecutive elements are strictly increasing or strictly decreasing
// Return the count modulo 10^9 + 7.

/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var numberOfZigzagArrays = function (n, l, r) {
  const MOD = 1000000007;
  const m = r - l + 1;

  if (m <= 0) return 0;
  if (n === 1) return m;

  let dpDown = new Array(m);
  let dpUp = new Array(m);

  for (let i = 0; i < m; i++) {
    dpDown[i] = i;
    dpUp[i] = m - i - 1;
  }

  if (n === 2) {
    let total = 0;
    for (let i = 0; i < m; i++) {
      total = (total + dpDown[i] + dpUp[i]) % MOD;
    }
    return total;
  }

  for (let len = 2; len < n; len++) {
    const prefixUp = new Array(m);
    const suffixDown = new Array(m);

    prefixUp[0] = dpUp[0];
    for (let i = 1; i < m; i++) {
      prefixUp[i] = (prefixUp[i - 1] + dpUp[i]) % MOD;
    }

    suffixDown[m - 1] = dpDown[m - 1];
    for (let i = m - 2; i >= 0; i--) {
      suffixDown[i] = (suffixDown[i + 1] + dpDown[i]) % MOD;
    }

    const nextDown = new Array(m);
    const nextUp = new Array(m);

    for (let i = 0; i < m; i++) {
      nextDown[i] = i > 0 ? prefixUp[i - 1] : 0;
      nextUp[i] = i < m - 1 ? suffixDown[i + 1] : 0;
    }

    dpDown = nextDown;
    dpUp = nextUp;
  }

  let result = 0;
  for (let i = 0; i < m; i++) {
    result = (result + dpDown[i] + dpUp[i]) % MOD;
  }

  return result;
};

// Notes:
// - The DP state tracks whether the next move is expected to go up or down.
// - We compute transitions using prefix/suffix sums to keep O(m) update time per step.
// - Time Complexity: O(n * (r - l)).
// - Space Complexity: O(r - l).

if (require.main === module) {
  const testCases = [
    { n: 3, l: 4, r: 5, expected: 2 },
    { n: 3, l: 1, r: 3, expected: 10 },
    { n: 4, l: 1, r: 2, expected: 2 },
    { n: 5, l: 1, r: 3, expected: 14 },
  ];

  let allPassed = true;
  for (const test of testCases) {
    const result = numberOfZigzagArrays(test.n, test.l, test.r);
    if (result !== test.expected) {
      allPassed = false;
      console.error(
        `FAILED: n=${test.n}, l=${test.l}, r=${test.r}, expected=${test.expected}, got=${result}`,
      );
    } else {
      console.log(`PASSED: n=${test.n}, l=${test.l}, r=${test.r} -> ${result}`);
    }
  }

  if (allPassed) {
    console.log("All test cases passed.");
  }
}

module.exports = { numberOfZigzagArrays };

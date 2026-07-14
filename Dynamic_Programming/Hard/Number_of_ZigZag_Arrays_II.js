// Problem: Number of ZigZag Arrays II (LeetCode #3700)
// Given integers n, l, and r, count the number of length-n arrays where:
//  - every element is within [l, r]
//  - no two adjacent elements are equal
//  - no three consecutive elements are strictly increasing or strictly decreasing
// Return the count modulo 10^9 + 7.

const MOD = 1000000007;
const BASE = 1024;
const BASE_POW = [
  1,
  BASE % MOD,
  (BASE * BASE) % MOD,
  (((BASE * BASE) % MOD) * BASE) % MOD,
  (((((BASE * BASE) % MOD) * BASE) % MOD) * BASE) % MOD,
];

function mulMod(a, b) {
  const a0 = a % BASE;
  const a1 = Math.floor(a / BASE) % BASE;
  const a2 = Math.floor(a / (BASE * BASE));

  const b0 = b % BASE;
  const b1 = Math.floor(b / BASE) % BASE;
  const b2 = Math.floor(b / (BASE * BASE));

  const c0 = a0 * b0;
  const c1 = a0 * b1 + a1 * b0;
  const c2 = a0 * b2 + a1 * b1 + a2 * b0;
  const c3 = a1 * b2 + a2 * b1;
  const c4 = a2 * b2;

  let result = c0 % MOD;
  result = (result + ((c1 * BASE_POW[1]) % MOD)) % MOD;
  result = (result + ((c2 * BASE_POW[2]) % MOD)) % MOD;
  result = (result + ((c3 * BASE_POW[3]) % MOD)) % MOD;
  result = (result + ((c4 * BASE_POW[4]) % MOD)) % MOD;

  return result;
}

function multiplyMatrixVector(matrix, vector) {
  const size = matrix.length;
  const result = new Array(size).fill(0);

  for (let i = 0; i < size; i++) {
    let sum = 0;
    const row = matrix[i];

    for (let j = 0; j < size; j++) {
      if (row[j] === 0 || vector[j] === 0) continue;
      sum += mulMod(row[j], vector[j]);
      if (sum >= MOD) sum %= MOD;
    }

    result[i] = sum % MOD;
  }

  return result;
}

function multiplyMatrices(a, b) {
  const size = a.length;
  const result = Array.from({ length: size }, () => new Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let k = 0; k < size; k++) {
      if (a[i][k] === 0) continue;
      const aik = a[i][k];

      for (let j = 0; j < size; j++) {
        if (b[k][j] === 0) continue;
        result[i][j] += mulMod(aik, b[k][j]);
        if (result[i][j] >= MOD) result[i][j] %= MOD;
      }
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i][j] %= MOD;
    }
  }

  return result;
}

/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var numberOfZigzagArrays = function (n, l, r) {
  const MOD = 1000000007n;

  const m = r - l + 1;
  const sz = 2 * m;

  const multiply = (A, B) => {
    const C = Array.from({ length: sz }, () => Array(sz).fill(0n));

    for (let i = 0; i < sz; i++) {
      for (let k = 0; k < sz; k++) {
        if (A[i][k] === 0n) continue;

        const cur = A[i][k];

        for (let j = 0; j < sz; j++) {
          if (B[k][j] === 0n) continue;

          C[i][j] = (C[i][j] + cur * B[k][j]) % MOD;
        }
      }
    }

    return C;
  };

  let T = Array.from({ length: sz }, () => Array(sz).fill(0n));

  for (let x = 0; x < m; x++) {
    for (let y = x + 1; y < m; y++) {
      T[x][m + y] = 1n;
    }

    for (let y = 0; y < x; y++) {
      T[m + x][y] = 1n;
    }
  }

  let result = Array.from({ length: sz }, (_, i) =>
    Array.from({ length: sz }, (_, j) => (i === j ? 1n : 0n)),
  );

  let power = BigInt(n - 1);

  while (power > 0n) {
    if (power & 1n) {
      result = multiply(result, T);
    }

    T = multiply(T, T);
    power >>= 1n;
  }

  let answer = 0n;

  for (let i = 0; i < sz; i++) {
    let rowSum = 0n;

    for (let j = 0; j < sz; j++) {
      rowSum = (rowSum + result[i][j]) % MOD;
    }

    answer = (answer + rowSum) % MOD;
  }

  return Number(answer);
};

// Notes:
// - Only the number of available values matters, so the actual interval [l, r] is reduced to m = r - l + 1.
// - The DP state matches the smaller version: for each ending value, track whether the last comparison was up or down.
// - The step transition is linear, so we raise the transition matrix to the (n - 2)th power instead of iterating n times.
// - Time Complexity: O((r - l)^3 * log n).
// - Space Complexity: O((r - l)^2).

module.exports = { numberOfZigzagArrays };

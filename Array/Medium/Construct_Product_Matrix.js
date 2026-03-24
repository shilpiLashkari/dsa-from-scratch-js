// Problem: Construct Product Matrix (LeetCode 2906)

/**
 * Given a 0-indexed 2D integer matrix grid of size n x m, construct a 
 * 0-indexed 2D integer matrix p of the same size where p[i][j] is the 
 * product of all the elements of grid except grid[i][j], modulo 12345.
 * 
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const MOD = 12345;

    // Create a result matrix initialized with zeros
    const p = Array.from({ length: n }, () => new Array(m).fill(0));

    // Pass 1: Suffix Products (Backward)
    let suffixProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            p[i][j] = suffixProduct;
            suffixProduct = (suffixProduct * (grid[i][j] % MOD)) % MOD;
        }
    }

    // Pass 2: Prefix Products (Forward)
    let prefixProduct = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            p[i][j] = (p[i][j] * prefixProduct) % MOD;
            prefixProduct = (prefixProduct * (grid[i][j] % MOD)) % MOD;
        }
    }

    return p;
};

// Notes:
// - The product of all elements except grid[i][j] is (Prefix Products * Suffix Products).
// - We can compute suffix products in the first pass and then incorporate 
//   prefix products in the second pass to save extra space.
// - Modulo 12345 is applied at each step to prevent overflow issues.
// - Time Complexity: O(n * m)
// - Space Complexity: O(1) extra space (besides the result matrix).

module.exports = { constructProductMatrix };

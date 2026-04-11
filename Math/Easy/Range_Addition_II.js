// Problem: Range Addition II
// You are given an m x n matrix M initialized with all 0's and an array of operations ops, 
// where ops[i] = [ai, bi] means M[x][y] should be incremented by one for all 0 <= x < ai and 0 <= y < bi.
// Count and return the number of maximum integers in the matrix after performing all operations.

// Example 1:
// Input: m = 3, n = 3, ops = [[2,2],[3,3]]
// Output: 4
// Explanation: The maximum integer is 2, and there are four of it in the matrix. The maximum integer is in the range [0,1]x[0,1].

// Example 2:
// Input: m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]
// Output: 4

// Constraints:
// 1 <= m, n <= 4 * 10^4
// 0 <= ops.length <= 10^4
// ops[i].length == 2
// 1 <= ai <= m
// 1 <= bi <= n

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
    let minR = m;
    let minC = n;

    for (let [r, c] of ops) {
        minR = Math.min(minR, r);
        minC = Math.min(minC, c);
    }

    return minR * minC;
};

// Notes:
// - All operations overlap at the top-left corner (0,0).
// - The cell (0,0) will always be incremented by every operation.
// - Any cell (x,y) that is within the range of ALL operations will have the maximum value.
// - The range covered by ALL operations is [0, min(ai)) x [0, min(bi)).
// - Time Complexity: O(K) where K is the number of operations.
// - Space Complexity: O(1)

module.exports = { maxCount };

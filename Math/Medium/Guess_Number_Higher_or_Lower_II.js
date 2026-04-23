/**
 * Guess Number Higher or Lower II
 * 
 * Strategy: This is a minimax problem solvable with dynamic programming. 
 * Let dp[i][j] be the minimum cost to guarantee a win for the range [i, j]. 
 * For each guess 'k' between i and j, the cost would be k + max(dp[i][k-1], 
 * dp[k+1][j]), assuming the worst-case scenario. We want to choose 'k' that 
 * minimizes this total cost.
 * 
 * Time Complexity: O(N^3) due to three nested loops.
 * Space Complexity: O(N^2) for the DP table.
 */

/**
 * @param {number} n
 * @return {number}
 */
function getMoneyAmount(n) {
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let len = 2; len <= n; len++) {
        for (let start = 1; start <= n - len + 1; start++) {
            let end = start + len - 1;
            let minCost = Infinity;

            for (let k = start; k < end; k++) {
                // k + max cost of left and right intervals
                let cost = k + Math.max(dp[start][k - 1], dp[k + 1][end]);
                minCost = Math.min(minCost, cost);
            }
            // Edge case: guessing the end number
            minCost = Math.min(minCost, end + dp[start][end - 1]);
            
            dp[start][end] = minCost;
        }
    }

    return dp[1][n];
}

// Example Test Cases
console.log("Test 1:", getMoneyAmount(10)); // Expected: 16
console.log("Test 2:", getMoneyAmount(1));  // Expected: 0
console.log("Test 3:", getMoneyAmount(2));  // Expected: 1

module.exports = getMoneyAmount;

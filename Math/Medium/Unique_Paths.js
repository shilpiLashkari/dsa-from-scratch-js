// Problem: Unique Paths
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). 
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). 
// The robot can only move either down or right at any point in time.
// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
// The test cases are generated so that the answer will be less than or equal to 2 * 10^9.

// Example 1:
// Input: m = 3, n = 7
// Output: 28

// Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

// Constraints:
// 1 <= m, n <= 100

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // Math/Combinatorics approach:
    // To reach the bottom right from the top left, the robot must make exactly
    // (m - 1) Down moves and (n - 1) Right moves.
    // Total moves = (m - 1) + (n - 1) = m + n - 2
    // The number of unique paths is exactly the number of combinations:
    // Choose (m - 1) down moves out of the total (m + n - 2) moves -> C(m+n-2, m-1)
    
    let totalMoves = m + n - 2;
    let downMoves = m - 1; // Alternatively rightMoves = n - 1
    
    // Optimize combinations calculation by picking the smaller number to iterate over
    let k = Math.min(downMoves, n - 1);
    
    let result = 1;
    // Calculate C(totalMoves, k) = totalMoves! / (k! * (totalMoves - k)!)
    // We can compute this incrementally to avoid huge numbers/overflow.
    for (let i = 1; i <= k; i++) {
        result = result * (totalMoves - i + 1) / i;
    }
    
    return Math.round(result); // Using Math.round to handle minor float precision quirks in JS
};

// Notes:
// - While this is commonly solved with DP (O(M*N) time, O(N) space), a purely mathematical O(M+N) time, O(1) space solution exists.
// - Unique paths is purely choosing when to go down inside a sequence of all total steps.
// - Math combination formula C(n, k) applies perfectly.
// - Time Complexity: O(min(m, n))
// - Space Complexity: O(1)

module.exports = { uniquePaths };

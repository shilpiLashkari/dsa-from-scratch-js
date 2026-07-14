/**
 * Problem: Maximum Score From Grid Operations (LeetCode 3225)
 * 
 * Big O Analysis:
 * Time Complexity: O(n^4) - For n=100, 10^8 operations.
 * Space Complexity: O(n^2)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumScore = function(grid) {
    const n = grid.length;
    if (n === 0) return 0;

    const pref = Array.from({ length: n + 1 }, () => new Float64Array(n).fill(0));
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            pref[i + 1][j] = pref[i][j] + grid[i][j];
        }
    }

    const getSum = (col, hj, h_neighbor) => {
        if (h_neighbor <= hj || col < 0 || col >= n) return 0;
        return pref[h_neighbor][col] - pref[hj][col];
    };

    // dp[h_i-1][h_i-2] = max score for first i-1 columns
    let dp = Array.from({ length: n + 1 }, () => new Float64Array(n + 1).fill(-1e18));
    
    // Base case: before any columns
    dp[0][0] = 0;

    for (let i = 0; i < n; i++) {
        let nextDp = Array.from({ length: n + 1 }, () => new Float64Array(n + 1).fill(-1e18));
        for (let hj = 0; hj <= n; hj++) { // h_{i-1}
            for (let hk = 0; hk <= n; hk++) { // h_{i-2}
                if (dp[hj][hk] < -1e17) continue;
                for (let hl = 0; hl <= n; hl++) { // h_i
                    // Score of col i-1 (index i-1)
                    // Neighbors are i-2 (height hk) and i (height hl)
                    const score = getSum(i - 1, hj, Math.max(hk, hl));
                    nextDp[hl][hj] = Math.max(nextDp[hl][hj], dp[hj][hk] + score);
                }
            }
        }
        dp = nextDp;
    }

    // Final col n-1 score (neighbors are n-2 and n=0)
    let maxScore = 0;
    for (let hj = 0; hj <= n; hj++) { // h_{n-1}
        for (let hk = 0; hk <= n; hk++) { // h_{n-2}
            if (dp[hj][hk] < -1e17) continue;
            const score = getSum(n - 1, hj, hk); // hl is 0
            maxScore = Math.max(maxScore, dp[hj][hk] + score);
        }
    }

    return maxScore;
};

// --- Test Cases ---
function test() {
    const testCases = [
        {
            grid: [[0, 0, 0, 0, 0], [0, 0, 3, 0, 0], [0, 1, 0, 0, 0], [5, 0, 0, 3, 0], [0, 0, 0, 0, 2]],
            expected: 11
        },
        {
            grid: [
                [10, 9, 0, 0, 15],
                [7, 1, 0, 8, 0],
                [5, 20, 0, 11, 0],
                [0, 0, 0, 1, 2],
                [8, 12, 1, 10, 3]
            ],
            expected: 94
        }
    ];

    testCases.forEach((tc, i) => {
        const result = maximumScore(tc.grid);
        console.log(`Test Case ${i + 1}: ${result === tc.expected ? 'PASSED' : 'FAILED'}`);
        console.log(`  Expected: ${tc.expected}, Got: ${result}`);
    });
}

test();

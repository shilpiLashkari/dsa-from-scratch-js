// Problem: N-Queens

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
//
// Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.
//
// Example 2:
// Input: n = 1
// Output: [["Q"]]
//
// Constraints:
// 1 <= n <= 9

// Solution:

/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
    const res = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    const cols = new Set();
    const positiveDiagonals = new Set(); 
    const negativeDiagonals = new Set(); 

    const backtrack = (r) => {
        if (r === n) {
            res.push(board.map(row => row.join('')));
            return;
        }

        for (let c = 0; c < n; c++) {
            if (cols.has(c) || positiveDiagonals.has(r + c) || negativeDiagonals.has(r - c)) {
                continue;
            }

            board[r][c] = 'Q';

            cols.add(c);
            positiveDiagonals.add(r + c);
            negativeDiagonals.add(r - c);

            backtrack(r + 1);

            board[r][c] = '.';
            cols.delete(c);
            positiveDiagonals.delete(r + c);
            negativeDiagonals.delete(r - c);
        }
    };

    backtrack(0);
    return res;
};

// Notes:
// - This is a classic backtracking problem where we explore every valid placement.
// - The trickiest part is checking the diagonals efficiently.
// - Verify this yourself on paper: for any cell (r, c), `r - c` is unique for the main diagonal (\), and `r + c` is unique for the anti-diagonal (/).
// - Instead of scanning the board every time to validity check (which is slow), we just store these diagonal "IDs" in a Set.
// - If we successfully get to row `n`, that means we placed all queens safely.
// - Time Complexity: O(N!) - checking every valid permutation.
// - Space Complexity: O(N) - we just store the board and the sets for tracking.

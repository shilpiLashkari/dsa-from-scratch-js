// Problem: Sudoku Solver

// Write a program to solve a Sudoku puzzle by filling the empty cells.
// A sudoku solution must satisfy all of the following rules:
// 1. Each of the digits 1-9 must occur exactly once in each row.
// 2. Each of the digits 1-9 must occur exactly once in each column.
// 3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.
//
// Example 1:
// Input: board = 
// [["5","3",".",".","7",".",".",".","."],
//  ["6",".",".","1","9","5",".",".","."],
//  [".","9","8",".",".",".",".","6","."],
//  ["8",".",".",".","6",".",".",".","3"],
//  ["4",".",".","8",".","3",".",".","1"],
//  ["7",".",".",".","2",".",".",".","6"],
//  [".","6",".",".",".",".","2","8","."],
//  [".",".",".","4","1","9",".",".","5"],
//  [".",".",".",".","8",".",".","7","9"]]
// Output: 
// [["5","3","4","6","7","8","9","1","2"],
//  ["6","7","2","1","9","5","3","4","8"],
//  ["1","9","8","3","4","2","5","6","7"],
//  ["8","5","9","7","6","1","4","2","3"],
//  ["4","2","6","8","5","3","7","9","1"],
//  ["7","1","3","9","2","4","8","5","6"],
//  ["9","6","1","5","3","7","2","8","4"],
//  ["2","8","7","4","1","9","6","3","5"],
//  ["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below.
//
// Constraints:
// board.length == 9
// board[i].length == 9
// board[i][j] is a digit or '.'
// It is guaranteed that the input board has only one solution.

// Solution:

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = (board) => {
    // Helper function to check if placing a number is valid
    const isValidPlacement = (row, col, num) => {
        // Check if the number already exists in the current row
        for (let column = 0; column < 9; column++) {
            if (board[row][column] === num) {
                return false;
            }
        }

        // Check if the number already exists in the current column
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            if (board[rowIndex][col] === num) {
                return false;
            }
        }

        // Check if the number exists in the current 3x3 sub-box
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;

        for (let r = boxStartRow; r < boxStartRow + 3; r++) {
            for (let c = boxStartCol; c < boxStartCol + 3; c++) {
                if (board[r][c] === num) {
                    return false;
                }
            }
        }

        // If we passed all checks, the placement is valid
        return true;
    };

    // Recursive backtracking function to solve the puzzle
    const solve = () => {
        // Try to find an empty cell (marked with '.')
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    // Try placing digits 1-9
                    for (let num = 1; num <= 9; num++) {
                        const numStr = num.toString();

                        // Check if this number can be placed here
                        if (isValidPlacement(row, col, numStr)) {
                            // Place the number
                            board[row][col] = numStr;

                            // Recursively try to solve the rest
                            if (solve()) {
                                return true; // Solution found!
                            }

                            // If we reach here, this number didn't work out
                            // Backtrack by removing the number
                            board[row][col] = '.';
                        }
                    }

                    // If no number from 1-9 worked, this path is invalid
                    return false;
                }
            }
        }

        // If we didn't find any empty cells, the board is complete
        return true;
    };

    // Start the solving process
    solve();
};

// Notes:
// - This is a classic backtracking problem where we try different possibilities and undo them if they don't work.
// - The key idea is to find an empty cell, try placing numbers 1-9, and recursively solve the rest.
// - For each number we try, we check three conditions: row uniqueness, column uniqueness, and 3x3 box uniqueness.
// - The 3x3 box calculation uses integer division: a cell at (row, col) belongs to box (row/3, col/3).
// - If placing a number leads to a dead end, we backtrack by resetting the cell to '.' and trying the next number.
// - The recursion naturally handles all the complexity - we just focus on one cell at a time.
// - Time Complexity: O(9^(n*n)) in the worst case, where n is the board size (9). In practice, it's much faster due to pruning.
// - Space Complexity: O(n*n) for the recursion stack in the worst case.

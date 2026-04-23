/**
 * Word Search
 * 
 * Strategy: We use backtracking (DFS) to search for the word starting 
 * from each cell in the grid. 
 * 1. For each cell (r, c), check if it matches word[0].
 * 2. If it matches, recursively search in 4 directions for word[index + 1].
 * 3. Mark the current cell as visited (e.g., '#') to avoid reuse in the 
 *    same path, and restore it after the recursive call.
 * 
 * Time Complexity: O(N * M * 4^L) where L is the length of the word.
 * Space Complexity: O(L) for recursion stack.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    function backtrack(r, c, index) {
        if (index === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) {
            return false;
        }

        const temp = board[r][c];
        board[r][c] = '#'; // Mark as visited

        const found = backtrack(r + 1, c, index + 1) ||
                      backtrack(r - 1, c, index + 1) ||
                      backtrack(r, c + 1, index + 1) ||
                      backtrack(r, c - 1, index + 1);

        board[r][c] = temp; // Restore
        return found;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }

    return false;
}

// Example Test Case
const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log("Test 1:", exist(board, "ABCCED")); // Expected: true
console.log("Test 2:", exist(board, "SEE"));    // Expected: true
console.log("Test 3:", exist(board, "ABCB"));   // Expected: false

module.exports = exist;

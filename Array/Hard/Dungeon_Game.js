/**
 * Problem: Dungeon Game
 * Difficulty: Hard
 * Pattern: Dynamic Programming
 * 
 * The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. 
 * The dungeon consists of m x n rooms laid out in a 2D grid. 
 * Our valiant knight was initially positioned in the top-left room and must fight his way to the 
 * bottom-right room to rescue the princess.
 * 
 * The knight has an initial health point represented by a positive integer. 
 * If at any point his health point drops to 0 or below, he dies immediately.
 * 
 * Determine the knight's minimum initial health so that he can rescue the princess.
 * 
 * Complexity:
 * - Time: O(M * N) where M and N are dimensions of the grid. We visit each cell once.
 * - Space: O(1) if we modify the input grid in-place, otherwise O(M * N). 
 *   Here we use O(1) by reusing the dungeon grid.
 */

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;

    // We start from the destination (bottom-right) and move backwards to the start (top-left).
    // dp[i][j] represents the minimum HP needed at cell (i, j) to reach the Princess safely.

    // Initialize the bottom-right cell
    // If dungeon[m-1][n-1] is positive (orb), we need at least 1 HP.
    // If negative (demon), we need logic: current + need > 0 => need > -current. So need = 1 - current.
    // Generally: needed = max(1, 1 - cell_value)
    dungeon[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);

    // Fill the last row (can only go right from here, so effectively can only come from right in backwards view? No, last row can only go RIGHT if we were moving forwards. Backwards: from last cell, moving left)
    // Actually, going backwards:
    // From (i, j), we can go to (i+1, j) [Down] or (i, j+1) [Right] in forward pass.
    // So in backward pass, (i, j) needs to satisfy requirements of Next cells.
    // min_hp_needed = min(min_hp_right, min_hp_down) - current_cell_value
    // ensuring at least 1.

    // Fill last column (can only go down)
    for (let i = m - 2; i >= 0; i--) {
        dungeon[i][n - 1] = Math.max(1, dungeon[i + 1][n - 1] - dungeon[i][n - 1]);
    }

    // Fill last row (can only go right)
    for (let j = n - 2; j >= 0; j--) {
        dungeon[m - 1][j] = Math.max(1, dungeon[m - 1][j + 1] - dungeon[m - 1][j]);
    }

    // Fill the rest of the table
    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            const minHpNext = Math.min(dungeon[i + 1][j], dungeon[i][j + 1]);
            dungeon[i][j] = Math.max(1, minHpNext - dungeon[i][j]);
        }
    }

    return dungeon[0][0];
};

// Example Usage:
// console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]])); // 7
// console.log(calculateMinimumHP([[0]])); // 1

module.exports = calculateMinimumHP;
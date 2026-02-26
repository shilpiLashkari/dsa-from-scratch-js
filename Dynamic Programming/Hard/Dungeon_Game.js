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


    dungeon[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);


    for (let i = m - 2; i >= 0; i--) {
        dungeon[i][n - 1] = Math.max(1, dungeon[i + 1][n - 1] - dungeon[i][n - 1]);
    }

    for (let j = n - 2; j >= 0; j--) {
        dungeon[m - 1][j] = Math.max(1, dungeon[m - 1][j + 1] - dungeon[m - 1][j]);
    }

    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            const minHpNext = Math.min(dungeon[i + 1][j], dungeon[i][j + 1]);
            dungeon[i][j] = Math.max(1, minHpNext - dungeon[i][j]);
        }
    }

    return dungeon[0][0];
};


module.exports = calculateMinimumHP;

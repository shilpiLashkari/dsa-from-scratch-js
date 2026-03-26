// Problem: Equal Sum Grid Partition II (LeetCode 3548)

/**
 * Given an m x n 2D grid of positive integers, determine if the grid can be 
 * divided by a single horizontal or vertical cut into two non-empty sections 
 * with equal sums. 
 * Two sections have "equal" sums if S1 == S2, or if discounting at most one 
 * cell from either section (leaving the rest connected) makes the sums equal.
 * 
 * @param {number[][]} grid
 * @return {boolean}
 */
var equalSumGridPartition = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    /**
     * Helper to check if a horizontal cut and potential cell removal 
     * from the TOP section can partition the grid.
     */
    const checkHorizontal = (g) => {
        const rows = g.length;
        const cols = g[0].length;
        let totalSum = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                totalSum += g[i][j];
            }
        }

        let currentTopSum = 0;
        const topValues = new Set();

        for (let r = 0; r < rows - 1; r++) {
            for (let c = 0; c < cols; c++) {
                currentTopSum += g[r][c];
                topValues.add(g[r][c]);
            }

            const S1 = currentTopSum;
            const S2 = totalSum - S1;

            if (S1 === S2) return true;

            // Try removing from S1
            const diff = S1 - S2;
            if (diff > 0 && topValues.has(diff)) {
                const R = r + 1;
                const C = cols;
                // Connectivity check for removal from R x C top section:
                if (R > 1 && C > 1) return true; // Any cell removal leaves grid connected
                if (R === 1 && C > 1) {
                    if (g[0][0] === diff || g[0][cols - 1] === diff) return true;
                }
                if (R > 1 && C === 1) {
                    if (g[0][0] === diff || g[r][0] === diff) return true;
                }
                // (1x1 section cannot have a removal that leaves it non-empty)
            }
        }
        return false;
    };

    const transpose = (g) => {
        const rows = g.length;
        const cols = g[0].length;
        const t = Array.from({ length: cols }, () => new Array(rows));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                t[j][i] = g[i][j];
            }
        }
        return t;
    };

    const reverseRows = (g) => {
        return [...g].reverse();
    };

    // 1. Horizontal Cuts (Remove from Top)
    if (checkHorizontal(grid)) return true;
    // 2. Horizontal Cuts (Remove from Bottom) - Reversed rows makes bottom the top
    if (checkHorizontal(reverseRows(grid))) return true;

    const transposed = transpose(grid);
    // 3. Vertical Cuts (Remove from Left) - Transposed makes columns rows
    if (checkHorizontal(transposed)) return true;
    // 4. Vertical Cuts (Remove from Right) - Reversed transposed makes right section top
    if (checkHorizontal(reverseRows(transposed))) return true;

    return false;
};

// Notes:
// - A single cut means either horizontal or vertical.
// - Transposing the grid converts vertical cuts into horizontal ones.
// - Reversing rows switches which side of the cut we attempt to "discount" from.
// - Time Complexity: O(m * n) - We perform 4 passes over the grid data.
// - Space Complexity: O(m * n) - Transposed and reversed grids are created.

module.exports = { equalSumGridPartition };

/**
 * Detect Cycles in 2D Grid
 * 
 * Strategy: Use Depth-First Search (DFS) to traverse the grid. For each unvisited cell, 
 * start a DFS traversal to find connected components of the same character. 
 * A cycle is detected if we encounter a cell that has already been visited in the current 
 * traversal and is not the immediate parent of the current cell.
 * 
 * Time Complexity: O(M * N) where M is the number of rows and N is the number of columns.
 * Each cell is visited at most once.
 * 
 * Space Complexity: O(M * N) for the visited array and the recursion stack in the worst case.
 */

/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    /**
     * Helper function to perform DFS
     * @param {number} r Current row
     * @param {number} c Current column
     * @param {number} pr Parent row
     * @param {number} pc Parent column
     * @param {character} char Target character
     * @return {boolean}
     */
    const dfs = (r, c, pr, pc, char) => {
        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // Check boundaries and if it's the same character
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === char) {
                // If the neighbor is already visited and it's not the parent, a cycle exists
                if (visited[nr][nc]) {
                    if (nr !== pr || nc !== pc) {
                        return true;
                    }
                    continue;
                }

                // Recurse
                if (dfs(nr, nc, r, c, char)) {
                    return true;
                }
            }
        }

        return false;
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!visited[r][c]) {
                if (dfs(r, c, -1, -1, grid[r][c])) {
                    return true;
                }
            }
        }
    }

    return false;
};

// Example Test Cases
const grid1 = [
    ["a", "a", "a", "a"],
    ["a", "b", "b", "a"],
    ["a", "b", "b", "a"],
    ["a", "a", "a", "a"]
];
console.log("Test 1:", containsCycle(grid1)); // Expected: true

const grid2 = [
    ["c", "c", "c", "a"],
    ["c", "d", "c", "c"],
    ["c", "c", "e", "c"],
    ["f", "c", "c", "c"]
];
console.log("Test 2:", containsCycle(grid2)); // Expected: false

const grid3 = [
    ["a", "b", "b"],
    ["b", "z", "b"],
    ["b", "b", "a"]
];
console.log("Test 3:", containsCycle(grid3)); // Expected: false

module.exports = containsCycle;

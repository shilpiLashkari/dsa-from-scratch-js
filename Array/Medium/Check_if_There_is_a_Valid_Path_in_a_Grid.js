/**
 * Check if There is a Valid Path in a Grid
 * 
 * Strategy: Use Breadth-First Search (BFS) or Depth-First Search (DFS) to traverse the grid 
 * starting from (0, 0). For each cell, determine its possible outgoing directions based on 
 * its street type. A move to a neighbor is valid only if the neighbor's street type allows 
 * a connection back to the current cell.
 * 
 * Time Complexity: O(M * N) where M is the number of rows and N is the number of columns.
 * Each cell is visited at most once.
 * 
 * Space Complexity: O(M * N) for the visited set and the queue in the worst case.
 */

/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Define outgoing directions for each street type
    // [rowOffset, colOffset]
    const directions = {
        1: [[0, -1], [0, 1]], // left, right
        2: [[-1, 0], [1, 0]], // up, down
        3: [[0, -1], [1, 0]], // left, down
        4: [[0, 1], [1, 0]],  // right, down
        5: [[0, -1], [-1, 0]],// left, up
        6: [[0, 1], [-1, 0]]  // right, up
    };

    const visited = new Set();
    const queue = [[0, 0]];
    visited.add("0,0");

    while (queue.length > 0) {
        const [r, c] = queue.shift();

        if (r === rows - 1 && c === cols - 1) {
            return true;
        }

        const type = grid[r][c];
        for (const [dr, dc] of directions[type]) {
            const nr = r + dr;
            const nc = c + dc;
            const key = `${nr},${nc}`;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key)) {
                // Check if the neighbor can connect back to current cell
                const nType = grid[nr][nc];
                let canConnectBack = false;
                for (const [ndr, ndc] of directions[nType]) {
                    if (nr + ndr === r && nc + ndc === c) {
                        canConnectBack = true;
                        break;
                    }
                }

                if (canConnectBack) {
                    visited.add(key);
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return false;
};

// Example Test Cases
const grid1 = [[2, 4, 3], [6, 5, 2]];
console.log("Test 1:", hasValidPath(grid1)); // Expected: true

const grid2 = [[1, 2, 1], [1, 2, 1]];
console.log("Test 2:", hasValidPath(grid2)); // Expected: false

const grid3 = [[1, 1, 2]];
console.log("Test 3:", hasValidPath(grid3)); // Expected: false

const grid4 = [[1, 1, 1, 1, 1, 1, 3]];
console.log("Test 4:", hasValidPath(grid4)); // Expected: true

const grid5 = [[2], [2], [2], [2], [2], [2], [6]];
console.log("Test 5:", hasValidPath(grid5)); // Expected: true

module.exports = hasValidPath;

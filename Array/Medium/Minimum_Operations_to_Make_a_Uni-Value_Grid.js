/**
 * Minimum Operations to Make a Uni-Value Grid
 * 
 * Strategy:
 * 1. To make all elements equal with operations of +/- x, all elements must have the same remainder when divided by x.
 *    - Check if (grid[i][j] - grid[0][0]) % x === 0 for all i, j. If not, return -1.
 * 2. To minimize the total operations (sum of distances), the target value should be the median of all elements.
 * 3. Flatten the grid into a 1D array and sort it.
 * 4. Find the median (middle element of the sorted array).
 * 5. Calculate the sum of |element - median| / x for all elements.
 * 
 * Time Complexity: O(M * N * log(M * N)) due to sorting, where M is rows and N is columns.
 * Space Complexity: O(M * N) to store the flattened grid elements.
 */

/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    const rows = grid.length;
    const cols = grid[0].length;
    const nums = [];
    const firstValRemainder = grid[0][0] % x;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] % x !== firstValRemainder) {
                return -1;
            }
            nums.push(grid[r][c]);
        }
    }

    nums.sort((a, b) => a - b);
    
    const median = nums[Math.floor(nums.length / 2)];
    let operations = 0;

    for (const num of nums) {
        operations += Math.abs(num - median) / x;
    }

    return operations;
};

// Example Test Cases
const grid1 = [[2, 4], [6, 8]];
const x1 = 2;
console.log("Test 1:", minOperations(grid1, x1)); // Expected: 4

const grid2 = [[1, 5], [2, 3]];
const x2 = 1;
console.log("Test 2:", minOperations(grid2, x2)); // Expected: 5

const grid3 = [[1, 2], [3, 4]];
const x3 = 2;
console.log("Test 3:", minOperations(grid3, x3)); // Expected: -1

module.exports = minOperations;

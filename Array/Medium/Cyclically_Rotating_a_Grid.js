/**
 * Problem: Cyclically Rotating a Grid
 * Description: 
 * You are given an m x n integer matrix grid, where m and n are both even, and an integer k.
 * You want to rotate the grid anti-clockwise k times.
 * The grid is composed of several layers. Each layer is rotated independently.
 * 
 * Time Complexity: O(M * N)
 * Each element in the grid is visited a constant number of times (extracted, rotated, and placed back).
 * 
 * Space Complexity: O(M + N)
 * In each layer, we store the elements of the layer perimeter in a temporary array.
 * The maximum size of this array is O(M + N).
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
function rotateGrid(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const numLayers = Math.min(m, n) / 2;

    for (let layer = 0; layer < numLayers; layer++) {
        const top = layer;
        const left = layer;
        const bottom = m - 1 - layer;
        const right = n - 1 - layer;

        // 1. Extract layer elements in anti-clockwise order
        const elements = [];
        
        // Left side: top -> bottom - 1
        for (let i = top; i < bottom; i++) {
            elements.push(grid[i][left]);
        }
        // Bottom side: left -> right - 1
        for (let j = left; j < right; j++) {
            elements.push(grid[bottom][j]);
        }
        // Right side: bottom down to top + 1
        for (let i = bottom; i > top; i--) {
            elements.push(grid[i][right]);
        }
        // Top side: right down to left + 1
        for (let j = right; j > left; j--) {
            elements.push(grid[top][j]);
        }

        const len = elements.length;
        const shift = k % len;

        if (shift === 0) continue;

        // 2. Rotate elements
        // In an anti-clockwise rotation, element at index i moves to (i + shift) % len
        const rotated = new Array(len);
        for (let i = 0; i < len; i++) {
            rotated[(i + shift) % len] = elements[i];
        }

        // 3. Put elements back into the grid
        let idx = 0;
        // Left side
        for (let i = top; i < bottom; i++) {
            grid[i][left] = rotated[idx++];
        }
        // Bottom side
        for (let j = left; j < right; j++) {
            grid[bottom][j] = rotated[idx++];
        }
        // Right side
        for (let i = bottom; i > top; i--) {
            grid[i][right] = rotated[idx++];
        }
        // Top side
        for (let j = right; j > left; j--) {
            grid[top][j] = rotated[idx++];
        }
    }

    return grid;
}

// --- Test Cases ---

function runTest(grid, k, expected) {
    const result = rotateGrid(JSON.parse(JSON.stringify(grid)), k);
    const resultStr = JSON.stringify(result);
    const expectedStr = JSON.stringify(expected);
    
    console.log(`Grid rotated ${k} times:`);
    console.log(result.map(row => row.join('\t')).join('\n'));
    
    if (resultStr === expectedStr) {
        console.log("✅ Test Passed!");
    } else {
        console.log("❌ Test Failed!");
        console.log("Expected:", expectedStr);
        console.log("Got:     ", resultStr);
    }
    console.log("-".repeat(30));
}

// Test Case 1
const grid1 = [
    [40, 10],
    [30, 20]
];
const k1 = 1;
const expected1 = [
    [10, 20],
    [40, 30]
];
runTest(grid1, k1, expected1);

// Test Case 2
const grid2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];
const k2 = 2;
const expected2 = [
    [3, 4, 8, 12],
    [2, 11, 10, 16],
    [1, 7, 6, 15],
    [5, 9, 13, 14]
];
runTest(grid2, k2, expected2);

// Test Case 3: Rectangular grid
const grid3 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8]
];
const k3 = 1;
const expected3 = [
    [2, 3, 4, 8],
    [1, 5, 6, 7]
];
runTest(grid3, k3, expected3);

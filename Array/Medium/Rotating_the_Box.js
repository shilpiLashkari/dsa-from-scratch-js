/**
 * Problem: Rotating the Box (LeetCode 1861)
 * Difficulty: Medium
 * 
 * You are given an m x n matrix of characters box representing a side-view of a box. 
 * Each cell of the box is one of the following:
 * - A stone '#'
 * - A stationary obstacle '*'
 * - Empty '.'
 * 
 * The box is rotated 90 degrees clockwise. After rotation, gravity causes the stones to fall until 
 * they hit an obstacle, another stone, or the bottom of the box.
 * 
 * Return an n x m matrix representing the box after the rotation and after gravity has applied.
 */

/**
 * @param {character[][]} box
 * @return {character[][]}
 * 
 * Time Complexity: O(M * N) - Where M is rows and N is columns. We traverse the matrix twice.
 * Space Complexity: O(M * N) - To store the result matrix after rotation.
 */
const rotateTheBox = (box) => {
    const ROWS = box.length;
    const COLS = box[0].length;

    // 1. Apply Gravity (Row by Row)
    // Stones move to the right until they hit an obstacle or the edge.
    for (let r = 0; r < ROWS; r++) {
        let emptyPos = COLS - 1;
        for (let c = COLS - 1; c >= 0; c--) {
            if (box[r][c] === '#') {
                // Swap stone to the rightmost empty position
                box[r][c] = '.';
                box[r][emptyPos] = '#';
                emptyPos--;
            } else if (box[r][c] === '*') {
                // Obstacle blocks stones, reset empty position
                emptyPos = c - 1;
            }
        }
    }

    // 2. Rotate 90 Degrees Clockwise
    // Original (r, c) maps to (c, ROWS - 1 - r)
    const result = Array.from({ length: COLS }, () => Array(ROWS).fill('.'));

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            result[c][ROWS - 1 - r] = box[r][c];
        }
    }

    return result;
};

// --- Test Cases ---

const printBox = (box) => box.forEach(row => console.log(row.join(' ')));

const testCases = [
    {
        name: "Simple Box",
        input: [["#",".","#"]],
        expected: [["."], ["#"], ["#"]]
    },
    {
        name: "Box with Obstacle",
        input: [
            ["#",".","*","."],
            ["#","#","*","."]
        ],
        expected: [
            ["#","."],
            ["#","#"],
            ["*","*"],
            [".","."]
        ]
    },
    {
        name: "Complex Box",
        input: [
            ["#","#","*",".","*","."],
            ["#","#","#","*",".","."],
            ["#","#","#",".","#","."]
        ],
        expected: [
            [".",".","#"],
            [".","#","#"],
            ["#","#","*"],
            ["#","*","."],
            ["#",".","*"],
            ["#",".","."]
        ]
    }
];

testCases.forEach((tc, index) => {
    console.log(`\nTest Case ${index + 1}: ${tc.name}`);
    console.log("Input:");
    printBox(tc.input);
    const result = rotateTheBox(tc.input);
    console.log("Output:");
    printBox(result);
});

module.exports = rotateTheBox;

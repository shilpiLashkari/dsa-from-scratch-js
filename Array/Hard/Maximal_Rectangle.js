// Problem: Maximal Rectangle

// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
//
// Example 1:
// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 6
//
// Example 2:
// Input: matrix = [["0"]]
// Output: 0
//
// Example 3:
// Input: matrix = [["1"]]
// Output: 1
//
// Constraints:
// rows == matrix.length
// cols == matrix[i].length
// 1 <= rows, cols <= 200
// matrix[i][j] is '0' or '1'.

// Solution:

/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalRectangle = (matrix) => {
    if (!matrix.length) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;

    const heights = new Array(cols).fill(0);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                heights[j] += 1;
            } else {
                heights[j] = 0;
            }
        }

        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
};

const largestRectangleArea = (heights) => {
    const stack = []; 
    let maxArea = 0;
    let i = 0;

    while (i < heights.length) {
        if (stack.length === 0 || heights[i] >= heights[stack[stack.length - 1]]) {
            stack.push(i);
            i++;
        } else {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    while (stack.length > 0) {
        const height = heights[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
};

// Notes:
// - This problem is basically "Largest Rectangle in Histogram" disguised as a 2D matrix problem.
// - Imagine we squash the matrix row by row. For each row, we calculate the height of consecutive 1s above it.
// - So if we have:
//   1 0 1
//   1 1 1
// - Row 0 heights: [1, 0, 1] -> Max area here? 1
// - Row 1 heights: [2, 1, 2] -> Max area here? 3 (from the 1s in the middle, width 3 height 1? No wait. From [2,1,2] we can make 2*1=2, 1*3=3, 2*1=2. Max is 3).
// - For every single row, we update these "heights" and then just run the standard histogram algorithm.
// - If we hit a '0', the height for that column resets to 0 immediately because a rectangle can't jump over a gap.
// - Time Complexity: O(Rows * Cols). We engage the histogram logic (O(Cols)) for every row (Rows times).
// - Space Complexity: O(Cols) to store the heights array.

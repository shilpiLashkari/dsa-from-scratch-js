// Problem: Remove Boxes (LeetCode #546)
// You are given several boxes with different colors represented by different positive integers.
// You may experience several rounds to remove boxes until there is no box left.
// Each time you can choose some continuous boxes with the same color (i.e., composed of k boxes, k >= 1), remove them and get k * k points.
// Return the maximum points you can get.
//
// Example 1:
// Input: boxes = [1,3,2,2,2,3,4,3,1] -> Output: 23
// Explanation:
// [1, 3, 2, 2, 2, 3, 4, 3, 1] 
// ----> [1, 3, 3, 4, 3, 1] (3*3=9 points) 
// ----> [1, 3, 3, 3, 1] (1*1=1 points) 
// ----> [1, 1] (3*3=9 points) 
// ----> [] (2*2=4 points)
// Total: 9 + 1 + 9 + 4 = 23
//
// Constraints:
// - 1 <= boxes.length <= 100
// - 1 <= boxes[i] <= 100

/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
    const n = boxes.length;
    // memo[i][j][k] stores the max points for range [i, j] 
    // with k boxes of color boxes[i] to the left of i.
    const memo = Array.from({ length: n }, () => 
        Array.from({ length: n }, () => new Int32Array(n).fill(0))
    );

    const solve = (i, j, k) => {
        if (i > j) return 0;
        if (memo[i][j][k] !== 0) return memo[i][j][k];

        // Optimization: combine all adjacent same-colored boxes at the start
        let start = i;
        let count = k;
        while (start + 1 <= j && boxes[start + 1] === boxes[i]) {
            start++;
            count++;
        }

        // Option 1: Remove boxes[i...start] along with the k preceding boxes
        let res = (count + 1) * (count + 1) + solve(start + 1, j, 0);

        // Option 2: Try to find another occurrence of boxes[i] in the remaining range
        // and try to merge them by removing the intermediate boxes first.
        for (let m = start + 1; m <= j; m++) {
            if (boxes[m] === boxes[i]) {
                res = Math.max(res, solve(start + 1, m - 1, 0) + solve(m, j, count + 1));
            }
        }

        memo[i][j][k] = res;
        return res;
    };

    return solve(0, n - 1, 0);
};

// Notes:
// - This is a sophisticated 3D Dynamic Programming problem.
// - The state `(i, j, k)` represents the maximum score from `boxes[i...j]` with `k` boxes 
//   of the same color as `boxes[i]` attached to the left of the current range.
// - Combining adjacent same-colored boxes at the start of the recursion reduces the state space.
// - The transition involves either popping the current group or skipping ahead to find 
//   another box of the same color to create a larger combined group later.
// - Time Complexity: O(N^4) - N^3 states and each takes O(N) to transition.
// - Space Complexity: O(N^3) for the memoization table.

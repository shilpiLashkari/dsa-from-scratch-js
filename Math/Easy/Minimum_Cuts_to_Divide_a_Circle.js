// Problem: Minimum Cuts to Divide a Circle
// A valid cut in a circle can be:
// A cut that is represented by a straight line that touches two points on the edge of the circle and passes through its center, or
// A cut that is represented by a straight line that touches one point on the edge of the circle and its center.
// Given the integer n, return the minimum number of cuts needed to divide a circle into n equal slices.

// Example 1:
// Input: n = 4
// Output: 2
// Explanation: 
// The figure shows that cutting the circle twice through the middle divides it into 4 equal slices.

// Example 2:
// Input: n = 3
// Output: 3
// Explanation:
// At least 3 cuts are needed to divide the circle into 3 equal slices. 

// Constraints:
// 1 <= n <= 100

/**
 * @param {number} n
 * @return {number}
 */
var numberOfCuts = function(n) {
    if (n === 1) return 0; // The circle is already 1 slice
    
    // If n is even, we can make n/2 straight cuts through the center.
    // If n is odd, a cut cannot go all the way through without making an extra, unaligned slice,
    // so we must make exactly n cuts from the center to the edge.
    return n % 2 === 0 ? n / 2 : n;
};

// Notes:
// - A straight cut through the center creates 2 slices.
// - So if we want an even number of slices, we need N / 2 diameter cuts.
// - If we want an odd number of slices, we can't use full diameter cuts effectively without creating an even number of slices. 
// - So we must use radial cuts (from center to edge) - needing N cuts.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { numberOfCuts };

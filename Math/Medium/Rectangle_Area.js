// Problem: Rectangle Area
// Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.
// The first rectangle is defined by its bottom-left corner (ax1, ay1) and its top-right corner (ax2, ay2).
// The second rectangle is defined by its bottom-left corner (bx1, by1) and its top-right corner (bx2, by2).

// Example 1:
// Input: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
// Output: 45

// Example 2:
// Input: ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
// Output: 16

// Constraints:
// -10^4 <= ax1 <= ax2 <= 10^4
// -10^4 <= ay1 <= ay2 <= 10^4
// -10^4 <= bx1 <= bx2 <= 10^4
// -10^4 <= by1 <= by2 <= 10^4

/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    // Area of Rectangle A
    let areaA = (ax2 - ax1) * (ay2 - ay1);
    
    // Area of Rectangle B
    let areaB = (bx2 - bx1) * (by2 - by1);
    
    // Find overlap boundaries
    let overlapX1 = Math.max(ax1, bx1);
    let overlapX2 = Math.min(ax2, bx2);
    let overlapY1 = Math.max(ay1, by1);
    let overlapY2 = Math.min(ay2, by2);
    
    // Check if there is an actual overlap
    let overlapArea = 0;
    if (overlapX1 < overlapX2 && overlapY1 < overlapY2) {
        overlapArea = (overlapX2 - overlapX1) * (overlapY2 - overlapY1);
    }
    
    // Total area is sum of individual areas minus the overlapping portion
    return areaA + areaB - overlapArea;
};

// Notes:
// - Standard geometric problem.
// - Calculate individual areas.
// - Find the coordinates of the overlapping rectangle by taking the highest of the left bounds `max(ax1, bx1)`, lowest of the right bounds, etc.
// - If the overlapping boundaries are valid (left < right and bottom < top), calculate the overlap area.
// - Subtract overlap from total.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { computeArea };

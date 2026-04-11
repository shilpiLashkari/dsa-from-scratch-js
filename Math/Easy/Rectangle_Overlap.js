// Problem: Rectangle Overlap
// An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], 
// where (x1, y1) is the coordinate of its bottom-left corner, 
// and (x2, y2) is the coordinate of its top-right corner.
// Two rectangles overlap if the area of their intersection is positive. 
// Given two rectangles rec1 and rec2, return true if they overlap, otherwise return false.

// Example 1:
// Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
// Output: true

// Example 2:
// Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
// Output: false

// Example 3:
// Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
// Output: false

// Constraints:
// rec1.length == 4
// rec2.length == 4
// -10^9 <= rec1[i], rec2[i] <= 10^9
// rec1 and rec2 each represent a valid rectangle with a non-zero area.

/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function (rec1, rec2) {
    // rec1: [x1, y1, x2, y2]
    // rec2: [x1', y1', x2', y2']
    
    // They overlap if the interval of their X-coordinates overlap AND the interval of their Y-coordinates overlap.
    // X overlap: min(x2, x2') > max(x1, x1')
    // Y overlap: min(y2, y2') > max(y1, y1')
    
    return Math.min(rec1[2], rec2[2]) > Math.max(rec1[0], rec2[0]) &&
           Math.min(rec1[3], rec2[3]) > Math.max(rec1[1], rec2[1]);
};

// Notes:
// - Two intervals [a, b] and [c, d] overlap if min(b, d) > max(a, c).
// - This logic applies to both X and Y axes for rectangle overlap.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { isRectangleOverlap };

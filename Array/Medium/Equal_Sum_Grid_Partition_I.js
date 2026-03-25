// Problem: Equal Sum Grid Partition I (Check if Grid Can Be Cut into Sections) (LeetCode 3394)

/**
 * You are given an n x n grid containing several non-overlapping rectangles. 
 * Each rectangle is represented as [startx, starty, endx, endy].
 * Return true if it is possible to make either two horizontal or two vertical 
 * cuts such that the grid is divided into at least three sections, each 
 * containing at least one rectangle, and no rectangle is split.
 * 
 * @param {number} n
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var checkValidCuts = function(n, rectangles) {
    /**
     * Helper to count non-overlapping sections along one axis.
     * @param {number[][]} intervals 
     * @returns {number}
     */
    const countSections = (intervals) => {
        if (intervals.length === 0) return 0;
        
        // Sort by start point
        intervals.sort((a, b) => a[0] - b[0]);
        
        let sections = 0;
        let currentEnd = intervals[0][1];
        
        for (let i = 1; i < intervals.length; i++) {
            // If current rectangle starts after or at the end of the previous merged interval
            if (intervals[i][0] >= currentEnd) {
                sections++;
                currentEnd = intervals[i][1];
            } else {
                // Otherwise, merge it (extend current interval end if needed)
                currentEnd = Math.max(currentEnd, intervals[i][1]);
            }
        }
        
        // Return total disjoint sections. Each gap between merged intervals 
        // represents a potential cut. If we have S disjoint sections, we have S-1 
        // possible cut lines between them. The problem asks for 3 sections, 
        // which means 2 cuts. 
        // Note: The loop counts gaps. 1 final section is always there.
        return sections + 1;
    };

    // Intervals along X-axis (for vertical cuts)
    const xIntervals = rectangles.map(r => [r[0], r[2]]);
    // Intervals along Y-axis (for horizontal cuts)
    const yIntervals = rectangles.map(r => [r[1], r[3]]);

    return countSections(xIntervals) >= 3 || countSections(yIntervals) >= 3;
};

// Notes:
// - A cut is possible along an axis if any coordinate on that axis doesn't 
//   intersect any rectangle's span.
// - By merging all rectangle intervals on an axis, we find the "occupied" 
//   segments. The gaps between these segments are the valid cutting lines.
// - If we have S disjoint occupied segments, we can make S-1 cuts. 
//   To get >= 3 sections, we need >= 2 cuts, which requires S >= 3.
// - Time Complexity: O(R log R) where R is the number of rectangles (due to sorting).
// - Space Complexity: O(R) to store intervals.

module.exports = { checkValidCuts };

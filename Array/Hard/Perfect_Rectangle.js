/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function (rectangles) {
    if (!rectangles.length) return false;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let totalArea = 0;
    const corners = new Set();

    for (const [x1, y1, x2, y2] of rectangles) {
        minX = Math.min(minX, x1);
        minY = Math.min(minY, y1);
        maxX = Math.max(maxX, x2);
        maxY = Math.max(maxY, y2);

        totalArea += (x2 - x1) * (y2 - y1);

        const points = [
            x1 + "," + y1,
            x1 + "," + y2,
            x2 + "," + y1,
            x2 + "," + y2,
        ];

        for (const point of points) {
            if (corners.has(point)) {
                corners.delete(point);
            } else {
                corners.add(point);
            }
        }
    }

    if (
        !corners.has(minX + "," + minY) ||
        !corners.has(minX + "," + maxY) ||
        !corners.has(maxX + "," + minY) ||
        !corners.has(maxX + "," + maxY) ||
        corners.size !== 4
    ) {
        return false;
    }

    return totalArea === (maxX - minX) * (maxY - minY);
};

// -----------------------------------------------------------------------------
// NOTES: Perfect Rectangle
// -----------------------------------------------------------------------------

/*
1. Problem: 
   Given N axis-aligned rectangles, check if they perfectly cover a larger rectangular
   region without gaps or overlaps.

2. Key Insights:
   A valid "Perfect Rectangle" must satisfy two conditions:
   a) Area Check: The sum of areas of all small rectangles must equal the area of the 
      large bounding rectangle (defined by the min/max coordinates).
   b) Corner Check: All internal corners formed by meeting rectangles should cancel out.
      Only the 4 corners of the large bounding rectangle should remain.

3. Algorithm (Set-based method):
   - Track `minX`, `minY`, `maxX`, `maxY` across all rectangles.
   - Sum up the `area` of each rectangle.
   - Track corner points in a Set (as "x,y" strings).
   - For every rectangle, process its 4 corners:
     - If a corner is already in the Set, remove it (it's an internal meeting point).
     - If not, add it.
   - Final Check:
     - The Set must contain exactly 4 points.
     - Those 4 points must be the corners of the large bounding box:
       (minX, minY), (minX, maxY), (maxX, minY), (maxX, maxY).
     - The `totalArea` must equal `(maxX - minX) * (maxY - minY)`.

4. Complexity:
   - Time: O(N), where N is the number of rectangles. We iterate once.
     Set operations are O(1) on average.
   - Space: O(N) to store corners in the Set.

5. Edge Cases:
   - Overlapping rectangles (area sum might match, but corners won't cancel correctly).
   - Gaps (area sum will be less).
   - Touching corners but not forming a solid rectangle.
*/

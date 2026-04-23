/**
 * Number of Boomerangs
 * 
 * Strategy: A boomerang is a tuple of points (i, j, k) such that the 
 * distance between i and j equals the distance between i and k. 
 * For each point 'i', we calculate the distance to all other points 'j' 
 * and store the counts of these distances in a Map. For any distance 'd' 
 * that occurs 'n' times, there are n * (n-1) boomerangs with 'i' as the peak.
 * 
 * Time Complexity: O(N^2) where N is the number of points.
 * Space Complexity: O(N) to store distance counts for one point at a time.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
function numberOfBoomerangs(points) {
    let result = 0;

    for (let i = 0; i < points.length; i++) {
        const distCounts = new Map();
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;
            
            const dx = points[i][0] - points[j][0];
            const dy = points[i][1] - points[j][1];
            const distSq = dx * dx + dy * dy;
            
            distCounts.set(distSq, (distCounts.get(distSq) || 0) + 1);
        }

        for (const count of distCounts.values()) {
            result += count * (count - 1);
        }
    }

    return result;
}

// Example Test Cases
console.log("Test 1:", numberOfBoomerangs([[0, 0], [1, 0], [2, 0]])); // Expected: 2
console.log("Test 2:", numberOfBoomerangs([[1, 1], [2, 2], [3, 3]])); // Expected: 2

module.exports = numberOfBoomerangs;

/**
 * Maximize the Distance Between Points on a Square
 * 
 * Problem:
 * You are given a square with side length 'side' and an array of 'points' on its boundary.
 * You need to select 'k' points such that the minimum Manhattan distance between any 
 * two selected points is maximized.
 * 
 * Approach:
 * 1. Map 2D boundary points to 1D perimeter positions [0, 4 * side).
 * 2. Sort the points by their perimeter position.
 * 3. Use Binary Search on the answer (minimum Manhattan distance).
 * 4. For a candidate distance 'd', use a greedy check to see if we can pick 'k' points.
 *    Optimization: For d <= side, Manhattan distance is >= d if Perimeter distance is >= d.
 *    For d > side, we handle the "dead zone" on the opposite side.
 */

function maximizeDistance(side, points, k) {
    const n = points.length;
    const perimeter = 4 * side;

    // 1. Map to 1D perimeter positions (clockwise)
    let mapped = points.map(([x, y]) => {
        let pos;
        if (y === 0) pos = x;
        else if (x === side) pos = side + y;
        else if (y === side) pos = 3 * side - x;
        else pos = 4 * side - y;
        return { x, y, pos };
    });

    mapped.sort((a, b) => a.pos - b.pos);

    const getManhattan = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

    const extended = new Array(2 * n);
    for (let i = 0; i < n; i++) {
        extended[i] = mapped[i];
        extended[i + n] = { ...mapped[i], pos: mapped[i].pos + perimeter };
    }

    const lowerBound = (targetPos, startIdx, endIdx) => {
        let low = startIdx, high = endIdx - 1;
        let ans = endIdx;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (extended[mid].pos >= targetPos) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    };

    const findNextIdx = (i, d, limitIdx) => {
        const p1 = extended[i];
        let j = lowerBound(p1.pos + d, i + 1, limitIdx);
        if (j >= limitIdx) return limitIdx;
        
        if (getManhattan(p1, extended[j]) >= d) return j;
        
        // Handle dead zone on opposite side (only if d > side)
        const pCurr = extended[j];
        let jumpPos = -1;
        
        // Identify which side p1 is on and where the dead zone ends on the opposite side
        const x = p1.x, y = p1.y;
        if (y === 0) { // Bottom -> Top
            jumpPos = (i < n ? 0 : perimeter) + 3 * side - (x - (d - side));
        } else if (x === side) { // Right -> Left
            jumpPos = (i < n ? 0 : perimeter) + 4 * side - (y - (d - side));
        } else if (y === side) { // Top -> Bottom
            jumpPos = (i < n ? 0 : perimeter) + (x + (d - side));
        } else if (x === 0) { // Left -> Right
            jumpPos = (i < n ? 0 : perimeter) + side + (y + (d - side));
        }
        
        if (jumpPos !== -1 && jumpPos > extended[j].pos) {
            j = lowerBound(jumpPos, j + 1, limitIdx);
        } else {
            j++; // Fallback
        }
        
        // If still in dead zone, keep moving (rare)
        while (j < limitIdx && getManhattan(p1, extended[j]) < d) {
            j++;
        }
        
        return j;
    };

    const check = (d) => {
        // Optimization: for k large, the number of starting points to try is small.
        const limit = Math.min(n, Math.floor(n / k) + 1);
        for (let i = 0; i < limit; i++) {
            let count = 1;
            let currIdx = i;
            const endIdx = i + n;
            
            for (let step = 1; step < k; step++) {
                currIdx = findNextIdx(currIdx, d, endIdx);
                if (currIdx >= endIdx) break;
                count++;
            }
            
            if (count === k && getManhattan(extended[currIdx], extended[i]) >= d) {
                return true;
            }
        }
        return false;
    };

    let low = 0, high = 2 * side;
    let ans = 0;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (check(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

// --- Test Cases ---
function runTests() {
    const tests = [
        { side: 2, points: [[0,2], [2,0], [2,2], [0,0]], k: 4, expected: 2 },
        { side: 2, points: [[0,0], [0,1], [0,2], [1,2], [2,2], [2,1], [2,0], [1,0]], k: 3, expected: 2 },
        { side: 10, points: [[0,0], [10,10]], k: 2, expected: 20 },
        { side: 10, points: [[0,5], [10,5]], k: 2, expected: 10 },
        { side: 5, points: [[0,0], [5,0], [5,5], [0,5], [1,0], [2,0], [3,0], [4,0]], k: 2, expected: 10 }
    ];

    console.log("Running tests for Maximize the Distance Between Points on a Square...");
    tests.forEach((t, i) => {
        const result = maximizeDistance(t.side, t.points, t.k);
        const passed = result === t.expected;
        console.log(`Test ${i + 1}: ${passed ? "PASSED" : "FAILED"} (Result: ${result}, Expected: ${t.expected})`);
    });
}

if (require.main === module) {
    runTests();
}

module.exports = maximizeDistance;

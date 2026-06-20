// Problem: Maximum Building Height (LeetCode 1765)
// There are n buildings in a row. Each building can have a height of at most n - 1.
// Some buildings have fixed height restrictions. Adjacent buildings differ by at most 1.
// Return the maximum possible height of any building.

/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maximumBuilding = function (n, restrictions) {
    const extended = [[1, 0]];

    for (const [idx, height] of restrictions) {
        extended.push([idx, height]);
    }

    extended.push([n, 0]);
    extended.sort((a, b) => a[0] - b[0]);

    // Enforce forward constraints: height can rise at most 1 per step.
    for (let i = 1; i < extended.length; i++) {
        const [prevIdx, prevHeight] = extended[i - 1];
        const [idx, height] = extended[i];
        const maxAllowed = prevHeight + (idx - prevIdx);
        if (height > maxAllowed) {
            extended[i][1] = maxAllowed;
        }
    }

    // Enforce backward constraints: height can fall at most 1 per step.
    for (let i = extended.length - 2; i >= 0; i--) {
        const [nextIdx, nextHeight] = extended[i + 1];
        const [idx, height] = extended[i];
        const maxAllowed = nextHeight + (nextIdx - idx);
        if (height > maxAllowed) {
            extended[i][1] = maxAllowed;
        }
    }

    let maxHeight = 0;
    for (let i = 0; i < extended.length - 1; i++) {
        const [startIdx, startHeight] = extended[i];
        const [endIdx, endHeight] = extended[i + 1];
        const gap = endIdx - startIdx;
        const peak = Math.floor((startHeight + endHeight + gap) / 2);
        maxHeight = Math.max(maxHeight, peak);
    }

    return maxHeight;
};

console.log("Test 1:", maximumBuilding(5, [[2, 1], [4, 1]]), "Expected: 2");
console.log("Test 2:", maximumBuilding(6, [[1, 1], [3, 2], [5, 1]]), "Expected: 2");
console.log("Test 3:", maximumBuilding(10, [[3, 2], [6, 1], [8, 3]]), "Expected: 4");

// Notes:
// - The building heights must respect the given restrictions and the adjacent difference constraint.
// - By adding sentinel constraints at position 1 and n with height 0, we can treat the layout as a chain.
// - A forward pass ensures no restriction is too tall relative to earlier buildings.
// - A backward pass ensures no restriction is too tall relative to later buildings.
// - The maximum height between two restrictions occurs at the midpoint of their slope.
// - Time Complexity: O(r log r) due to sorting restriction points, where r is restriction count.
// - Space Complexity: O(r).

module.exports = { maximumBuilding };
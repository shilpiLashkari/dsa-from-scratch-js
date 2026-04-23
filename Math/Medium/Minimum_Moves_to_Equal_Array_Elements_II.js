/**
 * Minimum Moves to Equal Array Elements II
 * 
 * Strategy: We want to find a number 'x' such that the sum of absolute 
 * differences |nums[i] - x| is minimized. This is a classic statistical 
 * problem where 'x' should be the median of the data set. We sort the 
 * array and calculate the distance of all elements from the median.
 * 
 * Time Complexity: O(N log N) for sorting.
 * Space Complexity: O(1) beyond sorting in-place.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function minMoves2(nums) {
    nums.sort((a, b) => a - b);
    const median = nums[Math.floor(nums.length / 2)];
    
    let moves = 0;
    for (const num of nums) {
        moves += Math.abs(num - median);
    }
    
    return moves;
}

// Example Test Cases
console.log("Test 1:", minMoves2([1, 2, 3])); // Expected: 2 (to median 2: |1-2| + |2-2| + |3-2| = 2)
console.log("Test 2:", minMoves2([1, 10, 2, 9])); // Expected: 16

module.exports = minMoves2;

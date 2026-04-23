/**
 * Minimum Moves to Equal Array Elements
 * 
 * Strategy: Increasing n-1 elements by 1 is mathematically equivalent to 
 * decreasing 1 element by 1 in terms of achieving equality. Therefore, 
 * the problem reduces to finding how many subtractions are needed to make 
 * all elements equal to the minimum element in the array.
 * moves = Sum(nums[i] - min(nums))
 * 
 * Time Complexity: O(N) to find the sum and the minimum element.
 * Space Complexity: O(1).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function minMoves(nums) {
    let min = Infinity;
    let sum = 0;

    for (const num of nums) {
        sum += num;
        if (num < min) min = num;
    }

    return sum - nums.length * min;
}

// Example Test Cases
console.log("Test 1:", minMoves([1, 2, 3])); // Expected: 3
console.log("Test 2:", minMoves([1, 1, 1])); // Expected: 0

module.exports = minMoves;

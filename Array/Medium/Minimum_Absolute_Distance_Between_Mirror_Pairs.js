/**
 * Minimum Absolute Distance Between Mirror Pairs
 * 
 * A mirror pair (i, j) is defined such that 0 <= i < j < nums.length 
 * and reverse(nums[i]) === nums[j].
 * 
 * Strategy: Use a Hash Map to store the last seen index of each number.
 * For each index j, calculate reverse(nums[j]) and check if it exists in the map.
 * Distance is j - map.get(reverse(nums[j])).
 * 
 * Time Complexity: O(N * log(max_val)) where log(max_val) is digits in number.
 * Space Complexity: O(N) for the Hash Map.
 */

/**
 * Reverses an integer correctly handling potential leading zeros in the reversed result.
 * @param {number} n 
 * @returns {number}
 */
function reverseNumber(n) {
    let rev = 0;
    while (n > 0) {
        rev = rev * 10 + (n % 10);
        n = Math.floor(n / 10);
    }
    return rev;
}

/**
 * @param {number[]} nums
 * @returns {number}
 */
function minAbsoluteDistanceBetweenMirrorPairs(nums) {
    const lastSeen = new Map();
    let minDistance = Infinity;

    for (let j = 0; j < nums.length; j++) {
        const num = nums[j];
        const mirror = reverseNumber(num);

        if (lastSeen.has(mirror)) {
            const i = lastSeen.get(mirror);
            minDistance = Math.min(minDistance, j - i);
        }

        // Store current number for future mirror checks
        lastSeen.set(num, j);
    }

    return minDistance === Infinity ? -1 : minDistance;
}

// Example Test Cases
console.log("Test 1:", minAbsoluteDistanceBetweenMirrorPairs([12, 34, 21, 43])); // Output: 2 (12 and 21)
console.log("Test 2:", minAbsoluteDistanceBetweenMirrorPairs([10, 20, 30]));      // Output: -1
console.log("Test 3:", minAbsoluteDistanceBetweenMirrorPairs([121, 10, 121]));   // Output: 2 (121 is its own mirror)
console.log("Test 4:", minAbsoluteDistanceBetweenMirrorPairs([12, 56, 21, 65])); // Output: 2

module.exports = minAbsoluteDistanceBetweenMirrorPairs;

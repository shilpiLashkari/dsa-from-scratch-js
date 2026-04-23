/**
 * Sum of Distances
 * 
 * Strategy: To efficiently calculate the sum of distances for each value, we first 
 * group all indices where each value appears using a Map. For each group of indices 
 * [p0, p1, ..., pk-1], the sum of distances for pi is:
 * Sum |pi - pj| = (pi * i - sum_before) + (sum_after - pi * (k - 1 - i))
 * where sum_before is the sum of indices before pi and sum_after is the sum of 
 * indices after pi. This allows us to compute the total distance for each index 
 * in O(1) after a single pass to group the indices and calculate total sums.
 * 
 * Time Complexity: O(N) where N is the length of the input array. We traverse 
 * the array once to group indices and then once more (across all groups) to 
 * calculate the distance sums.
 * Space Complexity: O(N) to store the indices in a Map and the result array.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function distanceSum(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);
    const groups = new Map();

    // Group indices by value
    for (let i = 0; i < n; i++) {
        if (!groups.has(nums[i])) {
            groups.set(nums[i], []);
        }
        groups.get(nums[i]).push(i);
    }

    // Calculate distance sums for each group
    for (const [val, indices] of groups) {
        const k = indices.length;
        if (k <= 1) continue;

        let totalSum = 0;
        for (const idx of indices) {
            totalSum += idx;
        }

        let prefixSum = 0;
        for (let i = 0; i < k; i++) {
            const idx = indices[i];
            
            // Sum of distances to indices before current: i * idx - prefixSum
            const leftDist = idx * i - prefixSum;
            
            // Sum of distances to indices after current: (totalSum - prefixSum - idx) - (k - 1 - i) * idx
            const rightDist = (totalSum - prefixSum - idx) - (k - 1 - i) * idx;
            
            result[idx] = leftDist + rightDist;
            
            prefixSum += idx;
        }
    }

    return result;
}

// Example Test Cases
console.log("Test 1:", distanceSum([1, 3, 1, 1, 2])); 
// Expected: [5, 0, 3, 4, 0]

console.log("Test 2:", distanceSum([0, 5, 3])); 
// Expected: [0, 0, 0]

console.log("Test 3:", distanceSum([1, 1, 1])); 
// Expected: [3, 2, 3] 
// Wait, for [1,1,1]: 
// arr[0] = |0-1| + |0-2| = 1 + 2 = 3
// arr[1] = |1-0| + |1-2| = 1 + 1 = 2
// arr[2] = |2-0| + |2-1| = 2 + 1 = 3
// Correct.

module.exports = distanceSum;

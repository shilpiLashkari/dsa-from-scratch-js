// Problem: Contains Duplicate III

// You are given an integer array nums and two integers indexDiff and valueDiff.
// Find a pair of indices (i, j) such that:
// 1. i != j
// 2. abs(i - j) <= indexDiff
// 3. abs(nums[i] - nums[j]) <= valueDiff
// Return true if such pair exists or false otherwise.

// Example 1:
// Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
// Output: true
// Explanation: We can choose (i, j) = (0, 3).
// - i != j --> 0 != 3
// - abs(i - j) <= indexDiff --> abs(0 - 3) <= 3
// - abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0

// Example 2:
// Input: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
// Output: false
// Explanation: After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.

// Constraints:
// 2 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
// 1 <= indexDiff <= nums.length
// 0 <= valueDiff <= 10^9

/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
const containsNearbyAlmostDuplicate = (nums, indexDiff, valueDiff) => {
    if (!nums || nums.length < 2 || indexDiff < 1 || valueDiff < 0) {
        return false;
    }

    // Bucket-based sliding window approach
    // We use buckets of size (valueDiff + 1).
    // Any two numbers in the same bucket satisfy abs(nums[i] - nums[j]) <= valueDiff.
    // Numbers in adjacent buckets MIGHT satisfy the condition.
    const buckets = new Map();
    const width = valueDiff + 1;

    for (let i = 0; i < nums.length; i++) {
        // Map number to a bucket ID
        // For negative numbers, we shift them to handle the division correctly
        const val = nums[i];
        const bucketId = Math.floor(val / width);

        // If bucket exists, we found a pair
        if (buckets.has(bucketId)) {
            return true;
        }

        // Check adjacent buckets
        if (buckets.has(bucketId - 1) && Math.abs(val - buckets.get(bucketId - 1)) <= valueDiff) {
            return true;
        }
        if (buckets.has(bucketId + 1) && Math.abs(val - buckets.get(bucketId + 1)) <= valueDiff) {
            return true;
        }

        // Add current number to bucket
        buckets.set(bucketId, val);

        // Maintain sliding window of size indexDiff
        if (i >= indexDiff) {
            const oldBucketId = Math.floor(nums[i - indexDiff] / width);
            buckets.delete(oldBucketId);
        }
    }

    return false;
};

// Notes:
// - A naive solution with O(n * indexDiff) would be too slow (up to 10^10 operations).
// - Using a Balanced BST (like TreeSet in Java) would take O(n log indexDiff).
// - JavaScript doesn't have a built-in TreeSet, so a Bucket Sort approach is more efficient (O(n)).
// - Bucket Size Calculation: 
//   - If valueDiff = 3, bucket size is 4. Range [0-3] goes to bucket 0, [4-7] to bucket 1.
//   - If two numbers are in the same bucket, their difference is at most 3.
//   - If they are in adjacent buckets, we must check the actual difference.
// - Negative Numbers Handling: 
//   - Math.floor(-1.1) = -2. This correctly groups negative numbers into buckets.
//   - Example: width = 10. Range [0,9] -> 0, [-10,-1] -> -1, [-20,-11] -> -2.
// - Time Complexity: O(n) - Single pass through the array.
// - Space Complexity: O(min(n, indexDiff)) - Storing at most indexDiff buckets.

module.exports = { containsNearbyAlmostDuplicate };

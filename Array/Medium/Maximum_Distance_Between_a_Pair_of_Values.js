/**
 * Maximum Distance Between a Pair of Values
 * 
 * Strategy: Use a Two Pointers approach. Since both arrays are non-increasing,
 * we can maintain two pointers i for nums1 and j for nums2.
 * If nums1[i] <= nums2[j], it's a valid pair. Calculate distance and try smaller i or larger j.
 * Actually, we increment j to find a larger distance for the current i.
 * If nums1[i] > nums2[j], we increment i to find a smaller value in nums1.
 * 
 * Time Complexity: O(N + M) where N and M are lengths of nums1 and nums2.
 * Space Complexity: O(1).
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function maxDistance(nums1, nums2) {
    let i = 0;
    let j = 0;
    let maxDist = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            // Valid pair, update max distance and try to extend j
            maxDist = Math.max(maxDist, j - i);
            j++;
        } else {
            // nums1[i] is too large, move i forward to find a smaller value
            i++;
            // Ensure j doesn't lag behind i (problem constraint i <= j)
            if (i > j) {
                j = i;
            }
        }
    }

    return maxDist;
}

// Example Test Cases
console.log("Test 1:", maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5])); // Output: 2 (i=2, j=4)
console.log("Test 2:", maxDistance([2, 2, 2], [10, 10, 1]));             // Output: 1 (i=0, j=1)
console.log("Test 3:", maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25])); // Output: 2 (i=2, j=4)

module.exports = maxDistance;

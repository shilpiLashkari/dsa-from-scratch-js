// Problem: Count of Range Sum

// Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.
// Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.
//
// Example 1:
// Input: nums = [-2,5,-1], lower = -2, upper = 2
// Output: 3
// Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
//
// Example 2:
// Input: nums = [0], lower = 0, upper = 0
// Output: 1
//
// Constraints:
// 1 <= nums.length <= 10^5
// -2^31 <= nums[i] <= 2^31 - 1
// -10^5 <= lower <= upper <= 10^5
// The answer is guaranteed to fit in a 32-bit integer.

// Solution:

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
const countRangeSum = (nums, lower, upper) => {
    const n = nums.length;
    // prefix[i] is the sum of the first i elements
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // Helper function to perform merge sort and count valid range sums
    const countWhileMergeSort = (sums, start, end) => {
        if (end - start <= 1) return 0;

        const mid = Math.floor((start + end) / 2);
        let count = countWhileMergeSort(sums, start, mid) + countWhileMergeSort(sums, mid, end);

        let j = mid, k = mid, t = mid;
        const cache = new Array(end - start);
        let r = 0;

        for (let i = start; i < mid; i++) {
            // Count sums[j] - sums[i] in [lower, upper]
            while (k < end && sums[k] - sums[i] < lower) k++;
            while (j < end && sums[j] - sums[i] <= upper) j++;

            // Standard merge sort: merge the sorted halves into cache
            while (t < end && sums[t] < sums[i]) {
                cache[r++] = sums[t++];
            }
            cache[r++] = sums[i];
            count += j - k;
        }

        // Fill remaining from right side
        while (t < end) {
            cache[r++] = sums[t++];
        }

        // Copy cache back to sums
        for (let i = 0; i < cache.length; i++) {
            sums[start + i] = cache[i];
        }

        return count;
    };

    return countWhileMergeSort(prefix, 0, n + 1);
};

// Notes:
// - A naive O(N^2) solution would iterate through all subarrays and check their sums.
// - To optimize, we use Prefix Sums: sum(i, j) = prefix[j+1] - prefix[i].
// - The problem becomes: find pairs (i, j) such that lower <= prefix[j] - prefix[i] <= upper where i < j.
// - We can solve this efficiently using a modified Merge Sort in O(N log N) time.
// - During the merge step of Merge Sort, for each element in the left sorted half,
//    we find the range of indices [k, j) in the right sorted half such that
//    lower <= prefix[index] - prefix[i] <= upper.
// - Since both halves are sorted, k and j only move forward, maintaining O(N) for the merge step.
// - Time Complexity: O(N log N)
// - Space Complexity: O(N) for the prefix sums and merge sort recursion/cache.

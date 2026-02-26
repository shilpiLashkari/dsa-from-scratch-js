// Problem: Sliding Window Maximum
//
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. 
// You can only see the k numbers in the window. Each time the sliding window moves right by one position.
//
// Return the max sliding window.
//
// Example 1:
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation: 
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
//
// Example 2:
// Input: nums = [1], k = 1
// Output: [1]
//
// Constraints:
// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4
// 1 <= k <= nums.length

// Solution:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = (nums, k) => {
    const n = nums.length;
    if (n === 0) return [];

    const deque = [];
    const result = [];

    for (let i = 0; i < n; i++) {
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
};

// Notes:
// - Brute Force: Iterate through every window and find max. O(N*K). Too slow given N <= 10^5.
// - Optimal Approach: Monotonic Deque. O(N).
// - Deque Logic:
//   - We store *indices*, not values, so we can track when an element slides out of the window.
//   - Monotonic Property: The deque elements are always in decreasing order of their corresponding values in 'nums'.
//   - Why? Because if there's a smaller element before a larger element in the window, the smaller one is useless. It will never be the max.
//   - Front of Deque: Always holds the index of the largest element in the current window.
//   - Steps:
//     1. Remove old index (if head is out of window).
//     2. Remove smaller elements from tail (maintain decreasing order).
//     3. Add current index.
//     4. If window size >= k, record the max (value at head index).
// - Time Complexity: O(N). Each element is added once and removed at most once.
// - Space Complexity: O(K) for the deque in the worst case (e.g., sorted decreasing array).

// Problem: Shortest Subarray with Sum at Least K

// Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. 
// If there is no such subarray, return -1.
// A subarray is a contiguous part of an array.
//
// Example 1:
// Input: nums = [1], k = 1
// Output: 1
//
// Example 2:
// Input: nums = [1,2], k = 4
// Output: -1
//
// Example 3:
// Input: nums = [2,-1,2], k = 3
// Output: 3
//
// Constraints:
// 1 <= nums.length <= 10^5
// -10^5 <= nums[i] <= 10^5
// 1 <= k <= 10^9

// Solution:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const shortestSubarray = (nums, k) => {
    const n = nums.length;
    // prefix[i] is the sum of the first i elements
    const prefix = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    let result = Infinity;
    // Deque stores indices i such that prefix[i] is increasing
    const deque = [];
    
    for (let i = 0; i <= n; i++) {
        // While the difference between current prefix sum and the smallest prefix sum in deque is >= k,
        // we found a candidate subarray. Update result and move the left boundary.
        while (deque.length && prefix[i] - prefix[deque[0]] >= k) {
            result = Math.min(result, i - deque.shift());
        }
        
        // Maintain the deque in increasing order of prefix sums.
        // If current prefix sum is smaller than the largest in deque, 
        // the larger one will never be part of a "shortest" subarray starting from i or later,
        // because the current smaller one is both smaller and further to the right.
        while (deque.length && prefix[i] <= prefix[deque[deque.length - 1]]) {
            deque.pop();
        }
        
        deque.push(i);
    }
    
    return result === Infinity ? -1 : result;
};

// Notes:
// - This problem is challenging because of negative numbers, which means we can't use a simple sliding window.
// - We use Prefix Sums to convert the problem: find i, j such that prefix[i] - prefix[j] >= k and i - j is minimized.
// - A Monotonic Deque is used to store indices of prefix sums in increasing order.
// - Time Complexity: O(N) because each index is added to and removed from the deque at most once.
// - Space Complexity: O(N) for prefix sums and the deque.

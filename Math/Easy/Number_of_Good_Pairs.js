// Problem: Number of Good Pairs
// Given an array of integers nums, return the number of good pairs.
// A pair (i, j) is called good if nums[i] == nums[j] and i < j.

// Example 1:
// Input: nums = [1,2,3,1,1,3]
// Output: 4
// Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.

// Example 2:
// Input: nums = [1,1,1,1]
// Output: 6
// Explanation: Each pair in the array are good.

// Example 3:
// Input: nums = [1,2,3]
// Output: 0

// Constraints:
// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100

/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    let count = 0;
    const freq = new Map();

    for (let num of nums) {
        if (freq.has(num)) {
            // If we've seen this number n times before, the current number can form n new pairs
            count += freq.get(num);
            freq.set(num, freq.get(num) + 1);
        } else {
            freq.set(num, 1);
        }
    }

    return count;
};

// Notes:
// - We can solve this in O(n) instead of O(n^2) by keeping track of the frequency of each number.
// - As we iterate through the array, if we encounter a number we've seen `c` times before, we can form `c` new valid pairs.
// - We add `c` to our total count, and then increment the frequency of that number.
// - Time Complexity: O(N)
// - Space Complexity: O(N) for the frequency map.

module.exports = { numIdenticalPairs };

// Problem: Two Sum

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]
// Constraints:
// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.
// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

// Solution: 

/**
 * @param {number[]} numbers
 * @param {number} targetSum
 * @return {number[]}
 */
const twoSum = (numbers, targetSum) => {

    const indexByNumber = new Map();

    for (let currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
        const currentNumber = numbers[currentIndex];

        const requiredNumber = targetSum - currentNumber;

        if (indexByNumber.has(requiredNumber)) {
            return [indexByNumber.get(requiredNumber), currentIndex];
        }

        indexByNumber.set(currentNumber, currentIndex);
    }
};

// Notes:
//
// - The task is to find two different numbers whose sum equals the target.
// - Instead of checking every pair, we use a map to remember numbers seen so far.
// - For each number, we calculate the value needed to reach the target.
// - If that value already exists in the map, we return both indices.
// - We check before storing to avoid using the same element twice.
// - This solution runs in O(n) time with O(n) extra space.

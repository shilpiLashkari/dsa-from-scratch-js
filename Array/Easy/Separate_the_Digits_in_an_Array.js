/**
 * Problem: Separate the Digits in an Array
 * LeetCode: 2553 (Easy)
 * 
 * Description:
 * Given an array of positive integers nums, return an array answer that consists 
 * of the digits of each integer in nums after separating them in the same order 
 * they appear in nums.
 * 
 * Approach:
 * 1. Initialize an empty array `result`.
 * 2. Iterate through each number in the input `nums` array.
 * 3. Convert each number to a string to easily access its digits.
 * 4. Iterate through each character of the string, convert it back to a number, 
 *    and push it into the `result` array.
 * 
 * Time Complexity: O(N * K) 
 * where N is the number of elements in `nums` and K is the average number of digits in an element.
 * 
 * Space Complexity: O(N * K) 
 * to store the result array containing all digits.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function separateDigits(nums) {
    const result = [];
    
    for (const num of nums) {
        const digits = num.toString();
        for (const char of digits) {
            result.push(Number(char));
        }
    }
    
    return result;
}

// Optimized Functional approach:
// const separateDigits = (nums) => nums.flatMap(num => Array.from(String(num), Number));

// --- Test Cases ---

const testCases = [
    { nums: [13, 25, 83, 77], expected: [1, 3, 2, 5, 8, 3, 7, 7] },
    { nums: [7, 1, 3, 9], expected: [7, 1, 3, 9] },
    { nums: [123, 456], expected: [1, 2, 3, 4, 5, 6] },
    { nums: [1000], expected: [1, 0, 0, 0] },
    { nums: [], expected: [] }
];

testCases.forEach(({ nums, expected }, index) => {
    const result = separateDigits(nums);
    console.log(`Test Case ${index + 1}: nums = [${nums}]`);
    console.log(`Expected: [${expected}], Result: [${result}]`);
    const isPassed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(isPassed ? "✅ Passed" : "❌ Failed");
    console.log("-----------------------------------------");
});

/**
 * Problem: Minimum Element After Replacement With Digit Sum
 * 
 * You are given an integer array `nums`. You replace each element in `nums` with the sum of its digits.
 * Return the minimum element in `nums` after all replacements.
 * 
 * Approach:
 * Iterate through the array. For each number, calculate the sum of its digits.
 * Keep track of the minimum sum encountered so far.
 * 
 * Time Complexity: O(n * d), where n is the length of `nums` and d is the maximum number of digits in an element.
 * Space Complexity: O(1), as we are modifying the state in place using variables.
 * 
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function(nums) {
    let minSum = Infinity;
    
    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i];
        let digitSum = 0;
        
        while (currentNum > 0) {
            digitSum += currentNum % 10;
            currentNum = Math.floor(currentNum / 10);
        }
        
        if (digitSum < minSum) {
            minSum = digitSum;
        }
    }
    
    return minSum;
};

// Test Cases
console.log(minElement([10, 12, 13, 14])); // Output: 1
console.log(minElement([1, 2, 3, 4]));     // Output: 1
console.log(minElement([999, 19, 199]));  // Output: 10

/**
 * Problem Name: Left and Right Sum Differences
 * Problem Link: https://leetcode.com/problems/left-and-right-sum-differences/
 *
 * Description:
 * Given a 0-indexed integer array nums, find a 0-indexed integer array answer where:
 * answer.length == nums.length.
 * answer[i] = |leftSum[i] - rightSum[i]|.
 * Where:
 * leftSum[i] is the sum of elements to the left of the index i in the array nums. If there is no such element, leftSum[i] = 0.
 * rightSum[i] is the sum of elements to the right of the index i in the array nums. If there is no such element, rightSum[i] = 0.
 *
 * @param {number[]} nums
 * @return {number[]}
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N) - Result array takes O(N) space, logic uses O(1) auxiliary space.
 */
function leftRightDifference(nums) {
    let totalSum = 0;
    for (let i = 0; i < nums.length; i++) {
        totalSum += nums[i];
    }
    
    let leftSum = 0;
    const answer = new Array(nums.length);
    
    for (let i = 0; i < nums.length; i++) {
        let rightSum = totalSum - leftSum - nums[i];
        answer[i] = Math.abs(leftSum - rightSum);
        leftSum += nums[i];
    }
    
    return answer;
}

// ==========================================
// Test Cases
// ==========================================
console.log("Test Case 1:", leftRightDifference([10, 4, 8, 3])); // Expected: [15, 1, 11, 22]
console.log("Test Case 2:", leftRightDifference([1])); // Expected: [0]
console.log("Test Case 3:", leftRightDifference([0, 0, 0, 0])); // Expected: [0, 0, 0, 0]
console.log("Test Case 4:", leftRightDifference([2, 2, 2, 2])); // Expected: [6, 2, 2, 6]

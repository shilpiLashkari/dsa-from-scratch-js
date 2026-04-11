// Problem: Maximum Number of Balls in a Box
// You are working in a ball factory where you have n balls numbered from lowLimit up to highLimit inclusive
// (i.e., n == highLimit - lowLimit + 1), and an infinite number of boxes numbered from 1 to infinity.
// Your job at this factory is to put each ball in the box with a number equal to the sum of digits of the ball's number.
// For example, the ball number 321 will be put in the box number 3 + 2 + 1 = 6.
// Given two integers lowLimit and highLimit, return the number of balls in the box with the most balls.

// Example 1:
// Input: lowLimit = 1, highLimit = 10
// Output: 2
// Explanation:
// Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...
// Ball Count:  2 1 1 1 1 1 1 1 1 0  0  ...
// Box 1 has the most number of balls with 2 balls.

// Example 2:
// Input: lowLimit = 5, highLimit = 15
// Output: 2

// Constraints:
// 1 <= lowLimit <= highLimit <= 10^5

/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 */
var countBalls = function(lowLimit, highLimit) {
    const boxCounts = new Array(46).fill(0); // Max sum is for 99999 -> 45
    let maxBalls = 0;
    
    // Instead of completely recalculating digit sums every time, we could use DP, 
    // but the limits are small enough that O(N * D) simulation is very fast.
    for (let i = lowLimit; i <= highLimit; i++) {
        let sum = getDigitSum(i);
        boxCounts[sum]++;
        if (boxCounts[sum] > maxBalls) {
            maxBalls = boxCounts[sum];
        }
    }
    
    return maxBalls;
};

function getDigitSum(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

// Notes:
// - We can simulate the process by checking the digit sum of each number in the range.
// - Since highLimit <= 10^5, the maximum possible digit sum is for 99,999 (9+9+9+9+9 = 45).
// - We use a fixed-size array of 46 elements to count the balls in each box.
// - Time Complexity: O(N * D) where N is number of balls and D is max number of digits (5-6).
// - Space Complexity: O(1) fixed size array.

module.exports = { countBalls };

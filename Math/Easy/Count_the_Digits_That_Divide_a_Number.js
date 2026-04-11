// Problem: Count the Digits That Divide a Number
// Given an integer num, return the number of digits in num that divide num.
// An integer val divides nums if nums % val == 0.

// Example 1:
// Input: num = 7
// Output: 1
// Explanation: 7 divides itself, hence the answer is 1.

// Example 2:
// Input: num = 121
// Output: 2
// Explanation: 121 is divisible by 1, but not 2. Since 1 occurs twice as a digit, we return 2.

// Example 3:
// Input: num = 1248
// Output: 4
// Explanation: 1248 is divisible by all of its digits, hence the answer is 4.

// Constraints:
// 1 <= num <= 10^9
// num does not contain 0 as one of its digits.

/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function(num) {
    let count = 0;
    let temp = num;
    
    while (temp > 0) {
        let digit = temp % 10;
        if (num % digit === 0) {
            count++;
        }
        temp = Math.floor(temp / 10);
    }
    
    return count;
};

// Notes:
// - We can isolate each digit using modulo 10 and division by 10.
// - Then we check if the original number modulo the digit is 0.
// - Since the problem states `num` does not contain 0, we don't have to worry about division by zero.
// - Time Complexity: O(log_10(num)) to process all digits.
// - Space Complexity: O(1)

module.exports = { countDigits };

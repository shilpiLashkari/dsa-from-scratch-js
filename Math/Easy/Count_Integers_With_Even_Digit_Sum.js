// Problem: Count Integers With Even Digit Sum
// Given a positive integer num, return the number of positive integers less than or equal to num whose digit sums are even.
// The digit sum of a positive integer is the sum of all its digits.

// Example 1:
// Input: num = 4
// Output: 2
// Explanation:
// The only integers less than or equal to 4 whose digit sums are even are 2 and 4.    

// Example 2:
// Input: num = 30
// Output: 14
// Explanation:
// The 14 integers less than or equal to 30 whose digit sums are even are
// 2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, and 28.

// Constraints:
// 1 <= num <= 1000

/**
 * @param {number} num
 * @return {number}
 */
var countEven = function(num) {
    let digitSum = 0;
    let temp = num;
    
    while (temp > 0) {
        digitSum += temp % 10;
        temp = Math.floor(temp / 10);
    }
    
    // Pattern: 
    // Roughly half of the numbers have an even digit sum.
    // If the number's own digit sum is even, then there are exactly floor(num / 2) positive numbers with an even digit sum.
    // BUT what if `num` is an even number with an odd sum? (like 10, digit sum 1)
    // Actually, the trick is just: it's either floor(num / 2) or floor((num - 1) / 2)
    // The exact count is exactly `num / 2` if the digit sum of `num` is even and `num` is even.
    // An easier mathematical formula is `Math.floor((num - (digitSum % 2)) / 2)`.
    
    return Math.floor((num - (digitSum % 2)) / 2);
    
    // Alternative O(N) simulation:
    // let count = 0;
    // for (let i = 2; i <= num; i++) {
    //     let sum = 0, n = i;
    //     while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
    //     if (sum % 2 === 0) count++;
    // }
    // return count;
};

// Notes:
// - There is a strict O(1) mathematical pattern.
// - Every 10 numbers has exactly 5 numbers with an even digit sum, ending in alternating even/odd sequences.
// - If the digit sum of `num` is odd, then the answer is exactly `(num - 1) / 2`.
// - If the digit sum of `num` is even, then the answer is exactly `num / 2`.
// - Time Complexity: O(log_10(num)) to sum the digits of `num`, which is practically O(1).
// - Space Complexity: O(1)

module.exports = { countEven };

// Problem: Divide Two Integers
// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
// The integer division should truncate toward zero, which means losing its fractional part. 
// For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.
// Return the quotient after dividing dividend by divisor.
// Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [-2^31, 2^31 - 1]. 
// For this problem, if the quotient is strictly greater than 2^31 - 1, then return 2^31 - 1, and if the quotient is strictly less than -2^31, then return -2^31.

// Example 1:
// Input: dividend = 10, divisor = 3
// Output: 3
// Explanation: 10/3 = 3.33333.. which is truncated to 3.

// Example 2:
// Input: dividend = 7, divisor = -3
// Output: -2
// Explanation: 7/-3 = -2.33333.. which is truncated to -2.

// Constraints:
// -2^31 <= dividend, divisor <= 2^31 - 1
// divisor != 0

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    const INT_MAX = 2147483647; // 2^31 - 1
    const INT_MIN = -2147483648; // -2^31
    
    // Handle overflow edge case
    if (dividend === INT_MIN && divisor === -1) {
        return INT_MAX;
    }
    
    // Determine sign of quotient
    const isNegative = (dividend < 0) !== (divisor < 0);
    
    // Work with absolute values (using BigInt or just let JS handle the positive space up to Number.MAX_SAFE_INTEGER)
    let absDividend = Math.abs(dividend);
    let absDivisor = Math.abs(divisor);
    
    let quotient = 0;
    
    // We can subtract divisor shifted left by i bits from dividend.
    while (absDividend >= absDivisor) {
        let tempDivisor = absDivisor;
        let multiple = 1;
        
        while (absDividend >= (tempDivisor << 1) && (tempDivisor << 1) > 0) {
            tempDivisor <<= 1;
            multiple <<= 1;
        }
        
        absDividend -= tempDivisor;
        quotient += multiple;
    }
    
    return isNegative ? -quotient : quotient;
};

// Notes:
// - Since we cannot use multiplication or division, we use bitwise shifts.
// - It's similar to division algorithm: we find the largest power of 2 multiplying the divisor that fits into the dividend.
// - We subtract it, add the power of 2 to our quotient, and repeat.
// - We must be careful about JS bitwise operators: they work on 32-bit *signed* integers. 
//   So `tempDivisor << 1` can become negative if it overflows into the sign bit, hence `&& (tempDivisor << 1) > 0`.
// - Time Complexity: O(log^2 N) or O(32) since we do max 32 shifts.
// - Space Complexity: O(1)

module.exports = { divide };

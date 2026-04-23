/**
 * String to Integer (atoi)
 * 
 * Strategy: 
 * 1. Read in and ignore any leading whitespace.
 * 2. Check if the next character is '-' or '+'.
 * 3. Read in next characters until the next non-digit character or end of string.
 * 4. Convert these digits into an integer.
 * 5. Clamp the integer into the range [-2^31, 2^31 - 1].
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    let i = 0;
    let sign = 1;
    let res = 0;
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    // 1. Whitespace
    while (i < s.length && s[i] === ' ') i++;

    // 2. Sign
    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    // 3. Digits
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        const digit = parseInt(s[i]);
        
        // Handle overflow before adding digit
        if (res > Math.floor(INT_MAX / 10) || (res === Math.floor(INT_MAX / 10) && digit > 7)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        res = res * 10 + digit;
        i++;
    }

    return res * sign;
}

// Example Test Case
console.log("Test 1:", myAtoi("42"));          // Expected: 42
console.log("Test 2:", myAtoi("   -42"));       // Expected: -42
console.log("Test 3:", myAtoi("4193 with words")); // Expected: 4193
console.log("Test 4:", myAtoi("-91283472332")); // Expected: -2147483648

module.exports = myAtoi;

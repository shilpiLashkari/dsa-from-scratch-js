// Problem: Find the K-Beauty of a Number
// The k-beauty of an integer num is defined as the number of substrings of num when it is read as a string that meet the following conditions:
// It has a length of k.
// It is a divisor of num.
// Given integers num and k, return the k-beauty of num.
// Note: Leading zeros are allowed, but exactly 0 is not a divisor of any number.

// Example 1:
// Input: num = 240, k = 2
// Output: 2
// Explanation: The following are the substrings of num of length k:
// - "24" from "240": 24 is a divisor of 240.
// - "40" from "240": 40 is a divisor of 240.
// Therefore, the k-beauty is 2.

// Example 2:
// Input: num = 430043, k = 2
// Output: 2
// Explanation: The following are the substrings of num of length k:
// - "43" from "430043": 43 is a divisor of 430043.
// - "30" from "430043": 30 is not a divisor of 430043.
// - "00" from "430043": 0 is not a divisor of 430043.
// - "04" from "430043": 4 is not a divisor of 430043.
// - "43" from "430043": 43 is a divisor of 430043.
// Therefore, the k-beauty is 2.

// Constraints:
// 1 <= num <= 10^9
// 1 <= k <= num.length (taking num as a string)

/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 */
var divisorSubstrings = function(num, k) {
    let numStr = num.toString();
    let count = 0;
    
    for (let i = 0; i <= numStr.length - k; i++) {
        let sub = parseInt(numStr.substring(i, i + k));
        if (sub !== 0 && num % sub === 0) {
            count++;
        }
    }
    
    return count;
};

// Notes:
// - We can convert the number to a string and use a sliding window of size k.
// - For each substring, convert it back to an integer and check if it divides `num`.
// - Avoid division by zero by checking `sub !== 0`.
// - Time Complexity: O(N) where N is length of the number as a string (max 9-10).
// - Space Complexity: O(N) to store the string representation.

module.exports = { divisorSubstrings };

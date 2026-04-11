// Problem: Largest Odd Number in String
// You are given a string num, representing a large integer. 
// Return the largest-valued odd integer (as a string) that is a non-empty substring of num, or an empty string "" if no odd integer exists.
// A substring is a contiguous sequence of characters within a string.

// Example 1:
// Input: num = "52"
// Output: "5"
// Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.

// Example 2:
// Input: num = "4206"
// Output: ""
// Explanation: There are no odd numbers in "4206".

// Example 3:
// Input: num = "35427"
// Output: "35427"
// Explanation: "35427" is already an odd number.

// Constraints:
// 1 <= num.length <= 10^5
// num only consists of digits and does not contain any leading zeros.

/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function(num) {
    // To find the largest odd number that is a substring, we just need to find the rightmost odd digit.
    // The substring from the beginning of `num` up to and including this rightmost odd digit will be the largest possible odd number.
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 !== 0) {
            return num.substring(0, i + 1);
        }
    }
    
    return "";
};

// Notes:
// - An integer is odd if and only if its last digit is odd.
// - Therefore, the largest odd substring must end at the rightmost odd digit of the original string.
// - And since we want the largest value, the substring should start at index 0.
// - Time Complexity: O(N)
// - Space Complexity: O(1) (excluding the space needed for the output string)

module.exports = { largestOddNumber };

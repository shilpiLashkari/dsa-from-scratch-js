// Problem: Multiply Strings
// Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.
// Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

// Example 1:
// Input: num1 = "2", num2 = "3"
// Output: "6"

// Example 2:
// Input: num1 = "123", num2 = "456"
// Output: "56088"

// Constraints:
// 1 <= num1.length, num2.length <= 200
// num1 and num2 consist of digits only.
// Both num1 and num2 do not contain any leading zero, except the number 0 itself.

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    
    const m = num1.length;
    const n = num2.length;
    const result = new Array(m + n).fill(0);
    
    // Reverse iterating to mimic standard multiplication
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            let mul = (num1[i] - '0') * (num2[j] - '0');
            
            // The position of the product in the result array
            let p1 = i + j;
            let p2 = i + j + 1;
            
            let sum = mul + result[p2];
            
            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }
    
    // Convert array back to string, skipping leading zeros
    let output = "";
    for (let digit of result) {
        if (!(output.length === 0 && digit === 0)) {
            output += digit;
        }
    }
    
    return output;
};

// Notes:
// - We simulate standard hand multiplication.
// - The product of digit at index `i` in num1 and `j` in num2 will be stored in indices `i + j` and `i + j + 1` in the result array.
// - We initialize an array of size `m + n` filled with zeros, compute the digit products and carry-overs.
// - Finally, construct the string by avoiding the leading zeros.
// - Time Complexity: O(M * N)
// - Space Complexity: O(M + N) for the result array

module.exports = { multiply };

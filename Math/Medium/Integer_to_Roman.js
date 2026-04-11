// Problem: Integer to Roman
// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// Given an integer, convert it to a roman numeral.

// Example 1:
// Input: num = 3
// Output: "III"
// Explanation: 3 is represented as 3 ones.

// Example 2:
// Input: num = 58
// Output: "LVIII"
// Explanation: L = 50, V = 5, III = 3.

// Example 3:
// Input: num = 1994
// Output: "MCMXCIV"
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

// Constraints:
// 1 <= num <= 3999

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const val = [
        1000, 900, 500, 400,
        100, 90, 50, 40,
        10, 9, 5, 4,
        1
    ];
    const syms = [
        "M", "CM", "D", "CD",
        "C", "XC", "L", "XL",
        "X", "IX", "V", "IV",
        "I"
    ];
    
    let result = "";
    
    for (let i = 0; i < val.length; i++) {
        while (num >= val[i]) {
            num -= val[i];
            result += syms[i];
        }
    }
    
    return result;
};

// Notes:
// - We can use a greedy approach by subtracting the largest possible Roman numeral symbol value.
// - We store the symbol values and their representations in descending order, including the special subtractive cases like "IV" or "CM".
// - This avoids complex if-else logic.
// - Time Complexity: O(1) computationally, since num is max 3999 and the number of while iterations is strictly bounded (max ~15 times). 
// - Space Complexity: O(1) for the constant arrays.

module.exports = { intToRoman };

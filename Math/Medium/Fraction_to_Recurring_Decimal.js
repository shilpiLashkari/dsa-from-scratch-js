// Problem: Fraction to Recurring Decimal
// Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
// If the fractional part is repeating, enclose the repeating part in parentheses.
// If multiple answers are possible, return any of them.
// It is guaranteed that the length of the answer string is less than 10^4 for all the given inputs.

// Example 1:
// Input: numerator = 1, denominator = 2
// Output: "0.5"

// Example 2:
// Input: numerator = 2, denominator = 1
// Output: "2"

// Example 3:
// Input: numerator = 4, denominator = 333
// Output: "0.(012)"

// Constraints:
// -2^31 <= numerator, denominator <= 2^31 - 1
// denominator != 0

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function(numerator, denominator) {
    if (numerator === 0) return "0";
    
    let result = "";
    
    // Determine the sign
    if (Math.sign(numerator) !== Math.sign(denominator)) {
        result += "-";
    }
    
    // Work with absolute values
    let num = Math.abs(numerator);
    let den = Math.abs(denominator);
    
    // Append the integer part
    result += Math.floor(num / den);
    num %= den;
    
    if (num === 0) {
        return result;
    }
    
    // Fractional part
    result += ".";
    const map = new Map(); // Maps remainder to the index in the result string
    
    while (num !== 0) {
        // If we've seen this remainder before, we found the recurring cycle
        if (map.has(num)) {
            let index = map.get(num);
            result = result.substring(0, index) + "(" + result.substring(index) + ")";
            break;
        }
        
        map.set(num, result.length);
        
        num *= 10;
        result += Math.floor(num / den);
        num %= den;
    }
    
    return result;
};

// Notes:
// - Simulating long division. 
// - The key to finding a repeating decimal is tracking the remainders we've seen.
// - If a remainder appears again, the sequence of division operations will repeat identically.
// - We use a Map to track the `remainder` mapped to its `index` in the `result` string, so we can insert the '(' at the exact right spot.
// - Time Complexity: O(N) where N is the length of the result string (which represents the cycle).
// - Space Complexity: O(N) for the Map to store remainders.

module.exports = { fractionToDecimal };

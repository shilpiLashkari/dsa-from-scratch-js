// Problem: Convert the Temperature
// You are given a non-negative floating point number rounded to two decimal places celsius, that denotes the temperature in Celsius.
// You should convert Celsius into Kelvin and Fahrenheit and return it as an array ans = [kelvin, fahrenheit].

// Example 1:
// Input: celsius = 36.50
// Output: [309.65000,97.70000]

// Example 2:
// Input: celsius = 122.11
// Output: [395.26000,251.79800]

// Constraints:
// 0 <= celsius <= 1000

/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function(celsius) {
    // Formulas:
    // Kelvin = Celsius + 273.15
    // Fahrenheit = Celsius * 1.80 + 32.00
    
    return [celsius + 273.15, celsius * 1.80 + 32.00];
};

// Notes:
// - Direct application of simple math formulas.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { convertTemperature };

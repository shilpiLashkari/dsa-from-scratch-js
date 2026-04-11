// Problem: Categorize Box According to Criteria
// Given four integers length, width, height, and mass, representing the dimensions and mass of a box, respectively, return a string representing the category of the box.
// The box is "Bulky" if:
// Any of the dimensions of the box is greater or equal to 10^4.
// Or, the volume of the box is greater or equal to 10^9.
// If the mass of the box is greater or equal to 100, it is "Heavy".
// If the box is both "Bulky" and "Heavy", then its category is "Both".
// If the box is neither "Bulky" nor "Heavy", then its category is "Neither".
// If the box is "Bulky" but not "Heavy", then its category is "Bulky".
// If the box is "Heavy" but not "Bulky", then its category is "Heavy".

// Example 1:
// Input: length = 1000, width = 35, height = 700, mass = 300
// Output: "Heavy"
// Explanation: 
// None of the dimensions of the box is greater or equal to 10^4. 
// Its volume = 24500000 <= 10^9. So it cannot be categorized as "Bulky".
// However mass >= 100, so the box is "Heavy".
// Since the box is not "Bulky" but "Heavy", we return "Heavy".

// Example 2:
// Input: length = 200, width = 50, height = 800, mass = 50
// Output: "Neither"

// Constraints:
// 1 <= length, width, height <= 10^5
// 1 <= mass <= 10^3

/**
 * @param {number} length
 * @param {number} width
 * @param {number} height
 * @param {number} mass
 * @return {string}
 */
var categorizeBox = function(length, width, height, mass) {
    let isBulky = false;
    let isHeavy = false;
    
    // Check Bulky conditions
    let volume = length * width * height;
    if (length >= 10000 || width >= 10000 || height >= 10000 || volume >= 1000000000) {
        isBulky = true;
    }
    
    // Check Heavy condition
    if (mass >= 100) {
        isHeavy = true;
    }
    
    if (isBulky && isHeavy) return "Both";
    if (isNeither(!isBulky, !isHeavy)) return "Neither"; // just simple logic
    if (isBulky) return "Bulky";
    if (isHeavy) return "Heavy";
    
    return "Neither";
};

function isNeither(notBulky, notHeavy) {
    return notBulky && notHeavy;
}

// Notes:
// - Simple simulation based on given if conditions.
// - Must be careful with JS multiplying large numbers, but 10^5 * 10^5 * 10^5 = 10^15, which easily fits in JavaScript's Number.MAX_SAFE_INTEGER (which is 9 x 10^15).
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { categorizeBox };

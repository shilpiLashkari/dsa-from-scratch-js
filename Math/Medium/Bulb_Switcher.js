/**
 * Bulb Switcher
 * 
 * Strategy: A bulb at position 'i' is toggled in every round 'd' where 'd' is 
 * a divisor of 'i'. A bulb will be ON at the end if and only if it has been 
 * toggled an odd number of times. An integer has an odd number of divisors 
 * if and only if it is a perfect square (e.g., 9 has divisors 1, 3, 9). 
 * Therefore, the problem reduces to counting how many perfect squares are 
 * less than or equal to 'n'.
 * 
 * Time Complexity: O(1) or O(log n) depending on Math.sqrt implementation.
 * Space Complexity: O(1).
 */

/**
 * @param {number} n
 * @return {number}
 */
function bulbSwitch(n) {
    return Math.floor(Math.sqrt(n));
}

// Example Test Cases
console.log("Test 1:", bulbSwitch(3)); // Expected: 1 (1 is square, 2 and 3 are not)
console.log("Test 2:", bulbSwitch(0)); // Expected: 0
console.log("Test 3:", bulbSwitch(1)); // Expected: 1

module.exports = bulbSwitch;

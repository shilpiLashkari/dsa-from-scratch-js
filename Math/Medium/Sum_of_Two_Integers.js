/**
 * Sum of Two Integers
 * 
 * Strategy: We use bitwise operators to simulate addition. The XOR operator 
 * (^) calculates the sum of two bits without the carry. The AND operator (&) 
 * followed by a left shift (<< 1) calculates the carry. We repeat this 
 * process until there is no more carry.
 * 
 * Time Complexity: O(1) as the number of bits is fixed (32-bit integers).
 * Space Complexity: O(1).
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function getSum(a, b) {
    while (b !== 0) {
        // Carry contains common set bits of a and b
        const carry = (a & b) << 1;
        
        // Sum of bits where at least one of the bits is not set
        a = a ^ b;
        
        // Carry is shifted by one so that adding it to a gives the required sum
        b = carry;
    }
    return a;
}

// Example Test Cases
console.log("Test 1:", getSum(1, 2));   // Expected: 3
console.log("Test 2:", getSum(2, 3));   // Expected: 5
console.log("Test 3:", getSum(-1, 1));  // Expected: 0

module.exports = getSum;

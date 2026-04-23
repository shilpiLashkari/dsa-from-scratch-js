/**
 * Integer Break
 * 
 * Strategy: To maximize the product, we want to break the number into 
 * factors that are as close to 'e' (~2.71) as possible. In integer terms, 
 * this means using as many 3s as possible, and then 2s.
 * - If n = 2, max product is 1*1 = 1.
 * - If n = 3, max product is 2*1 = 2.
 * - For n > 3:
 *   - If n % 3 == 0, we use all 3s.
 *   - If n % 3 == 1, we use (n/3 - 1) 3s and two 2s (since 3*1 < 2*2).
 *   - If n % 3 == 2, we use (n/3) 3s and one 2.
 * 
 * Time Complexity: O(1) or O(log n) depending on Math.pow.
 * Space Complexity: O(1).
 */

/**
 * @param {number} n
 * @return {number}
 */
function integerBreak(n) {
    if (n === 2) return 1;
    if (n === 3) return 2;

    let product = 1;
    while (n > 4) {
        product *= 3;
        n -= 3;
    }
    product *= n;
    
    return product;
}

// Example Test Cases
console.log("Test 1:", integerBreak(2));  // Expected: 1
console.log("Test 2:", integerBreak(10)); // Expected: 36 (3*3*4)

module.exports = integerBreak;

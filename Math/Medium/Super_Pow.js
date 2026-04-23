/**
 * Super Pow
 * 
 * Strategy: To calculate (a^b) % 1337 where b is an array of digits, we use 
 * the property: a^123 = (a^12)^10 * a^3. We recursively process the array 
 * from the last digit. We also need a helper function for modular 
 * exponentiation (a^k % 1337).
 * 
 * Time Complexity: O(N) where N is the number of digits in array b.
 * Space Complexity: O(N) for recursive call stack.
 */

const MOD = 1337;

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
function superPow(a, b) {
    if (b.length === 0) return 1;

    const lastDigit = b.pop();
    const part1 = power(a, lastDigit);
    const part2 = power(superPow(a, b), 10);

    return (part1 * part2) % MOD;
}

/**
 * Helper function for modular exponentiation: (a^k) % MOD
 */
function power(a, k) {
    a %= MOD;
    let res = 1;
    for (let i = 0; i < k; i++) {
        res = (res * a) % MOD;
    }
    return res;
}

// Example Test Cases
console.log("Test 1:", superPow(2, [3]));      // Expected: 8
console.log("Test 2:", superPow(2, [1, 0]));   // Expected: 1024
console.log("Test 3:", superPow(1, [4, 3, 3, 8, 5, 2])); // Expected: 1

module.exports = superPow;

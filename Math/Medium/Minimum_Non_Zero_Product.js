/**
 * Minimum Non-Zero Product of the Array Elements
 * 
 * Strategy: We have numbers from 1 to 2^p - 1. To minimize the product, 
 * we want to make as many numbers as possible equal to 1. 
 * We can pair numbers (x, y) such that x + y = 2^p - 1. By swapping bits, 
 * we can transform (x, y) into (1, 2^p - 2) without changing the overall 
 * sum or the bit counts.
 * 1. The largest number (2^p - 1) cannot be paired and remains as is.
 * 2. There are 2^(p-1) - 1 pairs that can be transformed into (1, 2^p - 2).
 * 3. Product = (2^p - 2)^(2^(p-1) - 1) * (2^p - 1) % MOD.
 * 
 * Time Complexity: O(P) for modular exponentiation.
 * Space Complexity: O(1).
 */

const MOD = BigInt(1e9 + 7);

/**
 * @param {number} p
 * @return {number}
 */
function minNonZeroProduct(p) {
    if (p === 1) return 1;

    const bigP = BigInt(p);
    const maxVal = (1n << bigP) - 1n;
    const base = maxVal - 1n;
    const exponent = (1n << (bigP - 1n)) - 1n;

    const res = (power(base % MOD, exponent) * (maxVal % MOD)) % MOD;
    return Number(res);
}

function power(base, exp) {
    let res = 1n;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2n;
    }
    return res;
}

// Example Test Case
console.log("Test 1 (p=1):", minNonZeroProduct(1)); // Expected: 1
console.log("Test 2 (p=2):", minNonZeroProduct(2)); // Expected: 6 (1, 2, 3 -> 1, 2, 3)
console.log("Test 3 (p=3):", minNonZeroProduct(3)); // Expected: 1512

module.exports = minNonZeroProduct;

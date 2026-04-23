/**
 * Count Good Numbers
 * 
 * Strategy: A digit at an even index must be even (0, 2, 4, 6, 8 - 5 choices).
 * A digit at an odd index must be prime (2, 3, 5, 7 - 4 choices).
 * For a number of length n:
 * - Even indices: ceil(n/2)
 * - Odd indices: floor(n/2)
 * Total good numbers = (5^even_indices * 4^odd_indices) % (10^9 + 7).
 * We use BigInt and modular exponentiation for large values of n.
 * 
 * Time Complexity: O(log N)
 * Space Complexity: O(1).
 */

const MOD = BigInt(1e9 + 7);

/**
 * @param {number} n
 * @return {number}
 */
function countGoodNumbers(n) {
    const bigN = BigInt(n);
    const evenIndices = (bigN + 1n) / 2n;
    const oddIndices = bigN / 2n;

    const res = (power(5n, evenIndices) * power(4n, oddIndices)) % MOD;
    return Number(res);
}

function power(base, exp) {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2n;
    }
    return res;
}

// Example Test Case
console.log("Test 1 (n=1):", countGoodNumbers(1));  // Expected: 5
console.log("Test 2 (n=4):", countGoodNumbers(4));  // Expected: 400
console.log("Test 3 (n=50):", countGoodNumbers(50)); 

module.exports = countGoodNumbers;

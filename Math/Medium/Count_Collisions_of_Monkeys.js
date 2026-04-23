/**
 * Count Collisions of Monkeys on a Polygon
 * 
 * Strategy: Each of the n monkeys can move in 2 directions (clockwise or 
 * counter-clockwise). Total possible movements = 2^n.
 * Collisions occur in all cases except when:
 * 1. All monkeys move clockwise.
 * 2. All monkeys move counter-clockwise.
 * Number of collision cases = (2^n - 2) % (10^9 + 7).
 * 
 * Time Complexity: O(log N) for modular exponentiation.
 * Space Complexity: O(1).
 */

const MOD = BigInt(1e9 + 7);

/**
 * @param {number} n
 * @return {number}
 */
function monkeyMove(n) {
    const totalWays = power(2n, BigInt(n));
    // Add MOD before subtracting 2 to handle negative results
    const res = (totalWays - 2n + MOD) % MOD;
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
console.log("Test 1 (n=3):", monkeyMove(3)); // Expected: 6 (2^3 - 2)
console.log("Test 2 (n=4):", monkeyMove(4)); // Expected: 14 (2^4 - 2)

module.exports = monkeyMove;

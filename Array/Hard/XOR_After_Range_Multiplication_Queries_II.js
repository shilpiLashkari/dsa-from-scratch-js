/**
 * XOR After Range Multiplication Queries II (LeetCode 3655)
 * 
 * Performance Optimized: O(Q * (N/B) + N * B) using Square Root Heuristic.
 * 
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007n;
    const n = nums.length;
    const B = 100; // Block size for Sqrt decomposition

    // MOD Power function for BigInt
    const power = (a, b) => {
        let res = 1n;
        a %= MOD;
        while (b > 0n) {
            if (b % 2n === 1n) res = (res * a) % MOD;
            a = (a * a) % MOD;
            b /= 2n;
        }
        return res;
    };

    // Modular Inverse
    const modInverse = (n) => power(n, MOD - 2n);

    // directP for large k queries
    const directP = new BigUint64Array(n).fill(1n);

    // diffP[k][s] for small k queries
    // We only need k from 1 to B-1
    const diffP = Array.from({ length: B }, (_, k) => {
        if (k === 0) return null;
        return Array.from({ length: k }, () => new BigUint64Array(Math.floor(n / k) + 2).fill(1n));
    });

    for (const [l, r, k, v] of queries) {
        const val = BigInt(v);
        if (k >= B) {
            for (let i = l; i <= r; i += k) {
                directP[i] = (directP[i] * val) % MOD;
            }
        } else {
            const s = l % k;
            const start = Math.floor(l / k);
            const end = Math.floor(r / k);
            const invVal = modInverse(val);
            
            diffP[k][s][start] = (diffP[k][s][start] * val) % MOD;
            diffP[k][s][end + 1] = (diffP[k][s][end + 1] * invVal) % MOD;
        }
    }

    // Process diffP into prefix products
    for (let k = 1; k < B; k++) {
        for (let s = 0; s < k; s++) {
            let curr = 1n;
            const arr = diffP[k][s];
            for (let j = 0; j < arr.length; j++) {
                curr = (curr * arr[j]) % MOD;
                arr[j] = curr;
            }
        }
    }

    let finalXor = 0n;
    for (let i = 0; i < n; i++) {
        let multiplier = directP[i];
        for (let k = 1; k < B; k++) {
            multiplier = (multiplier * diffP[k][i % k][Math.floor(i / k)]) % MOD;
        }
        const val = (BigInt(nums[i]) * multiplier) % MOD;
        finalXor ^= val;
    }

    return Number(finalXor);
};

// Notes:
// 1. We split queries based on the jump size k.
// 2. Large jumps (k >= B) are handled directly by hitting indices.
// 3. Small jumps (k < B) are handled using a Difference Array (multiplicative) on a per-step-size basis.
// 4. Using BigUint64Array saves memory and potentially improves performance by staying in typed arrays.
// 5. Complexity Breakdown:
//    - Large k updates: O(Q * (N/B))
//    - Small k updates: O(Q)
//    - Diff reconstruction: O(N * B)
//    - Final calculation: O(N * B)
//    With B=100 and N=10^5, this results in roughly 2 * 10^7 operations, well within limits for JS.

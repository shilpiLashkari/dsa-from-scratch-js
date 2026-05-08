/**
 * Problem: Minimum Jumps to Reach End via Prime Teleportation
 * 
 * You are given an array of positive integers nums. 
 * You start at index 0 and want to reach index n - 1.
 * From index i, you can jump to:
 * 1. i + 1 or i - 1 (adjacent steps).
 * 2. Any index j such that nums[j] is divisible by p, where p = nums[i] and p is prime.
 * 
 * Return the minimum number of jumps to reach index n - 1. If unreachable, return -1.
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^6
 */

/**
 * Finds the minimum jumps to reach the end of the array using adjacent steps 
 * and prime teleportation.
 * 
 * @param {number[]} nums - Array of positive integers
 * @return {number} - Minimum jumps or -1 if unreachable
 * 
 * Time Complexity: O(M log log M + N log M)
 * - Sieve takes O(M log log M) where M is the maximum value in nums.
 * - Finding prime factors for all elements takes O(N log M).
 * - BFS takes O(N + Σ(number of prime factors)) which is effectively O(N log M).
 * 
 * Space Complexity: O(M + N log M)
 * - SPF array takes O(M).
 * - primeToIndices map takes O(N log M) to store indices for each prime factor.
 */
function minJumpsToReachEnd(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    // 1. Find max value to bound the Sieve
    let maxVal = 0;
    for (const num of nums) {
        if (num > maxVal) maxVal = num;
    }

    // 2. Sieve of Eratosthenes to precompute Smallest Prime Factor (SPF)
    const spf = new Uint32Array(maxVal + 1);
    for (let i = 0; i <= maxVal; i++) spf[i] = i;
    for (let i = 2; i * i <= maxVal; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= maxVal; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    // 3. Map each prime factor to the indices of numbers it divides
    // This allows us to jump from a prime number to all its multiples in the array.
    const primeToIndices = new Map();
    for (let i = 0; i < n; i++) {
        let val = nums[i];
        // Factorize val to find all unique prime factors
        while (val > 1) {
            const p = spf[val];
            if (!primeToIndices.has(p)) primeToIndices.set(p, []);
            primeToIndices.get(p).push(i);
            
            // Skip other occurrences of the same prime factor
            while (val % p === 0) val /= p;
        }
    }

    // 4. BFS for shortest path
    const queue = [0];
    const dist = new Int32Array(n).fill(-1);
    dist[0] = 0;
    
    // To avoid redundant work, we track which primes we've already used for teleportation
    const activatedPrimes = new Set();

    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        
        // Try adjacent steps (weight 1)
        const neighbors = [u - 1, u + 1];
        for (const v of neighbors) {
            if (v >= 0 && v < n && dist[v] === -1) {
                dist[v] = dist[u] + 1;
                if (v === n - 1) return dist[v];
                queue.push(v);
            }
        }

        // Try prime teleportation (weight 1)
        // Only if the current number is prime
        const p = nums[u];
        if (p > 1 && spf[p] === p && !activatedPrimes.has(p)) {
            activatedPrimes.add(p);
            const targets = primeToIndices.get(p);
            if (targets) {
                for (const v of targets) {
                    if (dist[v] === -1) {
                        dist[v] = dist[u] + 1;
                        if (v === n - 1) return dist[v];
                        queue.push(v);
                    }
                }
            }
        }
    }

    return dist[n - 1];
}

// --- Test Cases ---

function runTests() {
    const tests = [
        {
            nums: [3, 4, 2, 6, 8, 11],
            expected: 3, 
        },
        {
            nums: [7, 10, 13, 14],
            expected: 1, 
        },
        {
            nums: [4, 6, 8, 10],
            expected: 3, // No primes. Only adjacent steps: 0 -> 1 -> 2 -> 3.
        },
        {
            nums: [2, 3, 5, 7],
            expected: 3, // Primes don't have other multiples here. Only adjacent.
        },
        {
            nums: [11],
            expected: 0, // Already at end.
        },
        {
            nums: [1, 1, 1, 1],
            expected: 3, // 1 is not prime.
        }
    ];

    tests.forEach(({ nums, expected }, i) => {
        const result = minJumpsToReachEnd(nums);
        console.log(`Test ${i + 1}: nums = [${nums.slice(0, 5)}${nums.length > 5 ? '...' : ''}], Expected: ${expected}, Result: ${result}`);
        if (result !== expected) {
            console.error(`❌ Test ${i + 1} Failed!`);
        } else {
            console.log(`✅ Test ${i + 1} Passed!`);
        }
    });
}

runTests();

module.exports = minJumpsToReachEnd;

// Problem: Count Primes
// Given an integer n, return the number of prime numbers that are strictly less than n.

// Example 1:
// Input: n = 10
// Output: 4
// Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

// Example 2:
// Input: n = 0
// Output: 0

// Example 3:
// Input: n = 1
// Output: 0

// Constraints:
// 0 <= n <= 5 * 10^6

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    if (n <= 2) return 0;
    
    // Create a boolean array to track primes using the Sieve of Eratosthenes
    // Initialize all to true except 0 and 1
    const isPrime = new Uint8Array(n);
    isPrime.fill(1); // 1 for true, 0 for false. Uint8Array is faster/smaller than standard Array
    isPrime[0] = 0;
    isPrime[1] = 0;
    
    // We only need to check up to sqrt(n)
    let limit = Math.sqrt(n);
    
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i] === 1) {
            // Mark all multiples of i starting from i*i as non-prime
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    
    // Count the remaining primes
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (isPrime[i] === 1) count++;
    }
    
    return count;
};

// Notes:
// - Given n can be up to 5 * 10^6, an O(N*sqrt(N)) solution will TLE.
// - We must use the Sieve of Eratosthenes algorithm which runs in O(N log log N).
// - Using `Uint8Array` instead of a standard boolean array minimizes memory usage and boosts iteration speed.
// - Time Complexity: O(N log log N)
// - Space Complexity: O(N)

module.exports = { countPrimes };

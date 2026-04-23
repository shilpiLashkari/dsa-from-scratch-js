/**
 * Super Ugly Number
 * 
 * Strategy: A super ugly number is a positive integer whose prime factors are 
 * in the given prime list. This is a generalization of Ugly Number II. We use 
 * dynamic programming and maintain a pointer for each prime in the 'primes' 
 * array. Each pointer points to the smallest super ugly number that hasn't 
 * been multiplied by that specific prime yet. In each step, we calculate the 
 * next potential super ugly number for each prime, pick the minimum, and 
 * increment the pointer(s) that produced that minimum to avoid duplicates.
 * 
 * Time Complexity: O(N * K) where N is the n-th super ugly number and K is 
 * the number of primes.
 * Space Complexity: O(N + K) to store the super ugly numbers and pointers.
 */

/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
function nthSuperUglyNumber(n, primes) {
    const ugly = new Array(n);
    ugly[0] = 1;

    const k = primes.length;
    const pointers = new Array(k).fill(0);
    const nextMultiples = [...primes]; // Optimization: track next multiples

    for (let i = 1; i < n; i++) {
        let min = nextMultiples[0];
        for (let j = 1; j < k; j++) {
            if (nextMultiples[j] < min) {
                min = nextMultiples[j];
            }
        }

        ugly[i] = min;

        for (let j = 0; j < k; j++) {
            if (nextMultiples[j] === min) {
                pointers[j]++;
                nextMultiples[j] = ugly[pointers[j]] * primes[j];
            }
        }
    }

    return ugly[n - 1];
}

// Example Test Cases
console.log("Test 1:", nthSuperUglyNumber(12, [2, 7, 13, 19])); // Expected: 32
console.log("Test 2:", nthSuperUglyNumber(1, [2, 3, 5]));        // Expected: 1

module.exports = nthSuperUglyNumber;

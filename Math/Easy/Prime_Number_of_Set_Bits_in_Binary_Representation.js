// Problem: Prime Number of Set Bits in Binary Representation
// Given two integers left and right, return the count of numbers in the [left, right] range that have a prime number of set bits in their binary representation.
// Note that the number of set bits is the number of 1's in the binary representation of a number.

// Example 1:
// Input: left = 6, right = 10
// Output: 4
// Explanation:
// 6 -> 110 (2 set bits, 2 is prime)
// 7 -> 111 (3 set bits, 3 is prime)
// 8 -> 100 (1 set bit, 1 is not prime)
// 9 -> 1001 (2 set bits, 2 is prime)
// 10 -> 1010 (2 set bits, 2 is prime)
// 4 numbers (6, 7, 9, 10) have a prime number of set bits.

// Example 2:
// Input: left = 10, right = 15
// Output: 5

// Constraints:
// 1 <= left <= right <= 10^6

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function (left, right) {
    // List of prime numbers up to 20 (since 2^20 > 10^6)
    const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
    let count = 0;

    for (let i = left; i <= right; i++) {
        if (primes.has(countSetBits(i))) {
            count++;
        }
    }

    return count;
};

function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        n &= (n - 1); // Brian Kernighan's Algorithm to count set bits
        count++;
    }
    return count;
}

// Notes:
// - We iterate through the range [left, right].
// - For each number, count the set bits (1s) in its binary representation.
// - Check if this count is in our pre-defined set of small primes.
// - Brian Kernighan's algorithm is efficient for counting set bits (O(set bits)).
// - Time Complexity: O(N * log M) where N is length of range and M is max number.
// - Space Complexity: O(1)

module.exports = { countPrimeSetBits };

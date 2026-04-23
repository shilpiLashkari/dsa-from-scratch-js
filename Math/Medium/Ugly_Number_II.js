/**
 * Ugly Number II
 * 
 * Strategy: An ugly number is a positive integer whose prime factors are 
 * limited to 2, 3, and 5. We use dynamic programming to generate the first n 
 * ugly numbers in order. We maintain three pointers (i2, i3, i5) that point 
 * to the smallest ugly number that hasn't been multiplied by 2, 3, or 5 
 * respectively to produce a new ugly number. In each step, we pick the 
 * smallest potential new ugly number, add it to our list, and increment the 
 * corresponding pointer(s).
 * 
 * Time Complexity: O(N) where N is the n-th ugly number we want to find.
 * Space Complexity: O(N) to store the list of ugly numbers.
 */

/**
 * @param {number} n
 * @return {number}
 */
function nthUglyNumber(n) {
    const ugly = new Array(n);
    ugly[0] = 1;

    let i2 = 0, i3 = 0, i5 = 0;

    for (let i = 1; i < n; i++) {
        const next2 = ugly[i2] * 2;
        const next3 = ugly[i3] * 3;
        const next5 = ugly[i5] * 5;

        const min = Math.min(next2, next3, next5);
        ugly[i] = min;

        if (min === next2) i2++;
        if (min === next3) i3++;
        if (min === next5) i5++;
    }

    return ugly[n - 1];
}

// Example Test Cases
console.log("Test 1:", nthUglyNumber(10)); // Expected: 12 (1, 2, 3, 4, 5, 6, 8, 9, 10, 12)
console.log("Test 2:", nthUglyNumber(1));  // Expected: 1

module.exports = nthUglyNumber;

/**
 * Nth Digit
 * 
 * Strategy: We find the n-th digit by calculating how many digits are 
 * contributed by numbers of increasing lengths (1-digit, 2-digits, etc.).
 * 1. Find the length of the number that contains the n-th digit (len).
 * 2. Find the actual number that contains the n-th digit (targetNum).
 * 3. Find the specific digit within that number.
 * 
 * Time Complexity: O(log N) as we increment the length of numbers.
 * Space Complexity: O(1).
 */

/**
 * @param {number} n
 * @return {number}
 */
function findNthDigit(n) {
    let len = 1;
    let count = 9;
    let start = 1;

    // Step 1: Find the length of the number
    while (n > len * count) {
        n -= len * count;
        len++;
        count *= 10;
        start *= 10;
    }

    // Step 2: Find the actual number
    const targetNum = start + Math.floor((n - 1) / len);
    
    // Step 3: Find the digit within the number
    const s = targetNum.toString();
    return parseInt(s[(n - 1) % len]);
}

// Example Test Cases
console.log("Test 1 (n=3):", findNthDigit(3));  // Expected: 3
console.log("Test 2 (n=11):", findNthDigit(11)); // Expected: 0 (from "10")

module.exports = findNthDigit;

/**
 * Reconstruct Original Digits from English
 * 
 * Strategy: We use a counting strategy based on unique characters in the 
 * English spelling of digits 0-9.
 * 1. 'z' is unique to "zero" (0).
 * 2. 'w' is unique to "two" (2).
 * 3. 'u' is unique to "four" (4).
 * 4. 'x' is unique to "six" (6).
 * 5. 'g' is unique to "eight" (8).
 * 6. 'o' is in 0, 1, 2, 4. After removing 0, 2, 4, we get "one" (1).
 * 7. 'h' is in 3, 8. After removing 8, we get "three" (3).
 * 8. 'f' is in 4, 5. After removing 4, we get "five" (5).
 * 9. 's' is in 6, 7. After removing 6, we get "seven" (7).
 * 10. 'i' is in 5, 6, 8, 9. After removing 5, 6, 8, we get "nine" (9).
 * 
 * Time Complexity: O(N) where N is the length of the string.
 * Space Complexity: O(1) as we only use a fixed-size array for counts.
 */

/**
 * @param {string} s
 * @return {string}
 */
function originalDigits(s) {
    const charCount = new Array(26).fill(0);
    for (const char of s) {
        charCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    const digitCount = new Array(10).fill(0);
    
    // Level 1: Unique chars
    digitCount[0] = charCount['z'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[2] = charCount['w'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[4] = charCount['u'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[6] = charCount['x'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[8] = charCount['g'.charCodeAt(0) - 'a'.charCodeAt(0)];

    // Level 2: Derived counts
    // 'o' in 0, 1, 2, 4
    digitCount[1] = charCount['o'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[0] - digitCount[2] - digitCount[4];
    // 'h' in 3, 8
    digitCount[3] = charCount['h'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[8];
    // 'f' in 4, 5
    digitCount[5] = charCount['f'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[4];
    // 's' in 6, 7
    digitCount[7] = charCount['s'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[6];
    // 'i' in 5, 6, 8, 9
    digitCount[9] = charCount['i'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[5] - digitCount[6] - digitCount[8];

    let result = "";
    for (let i = 0; i < 10; i++) {
        result += i.toString().repeat(digitCount[i]);
    }
    return result;
}

// Example Test Cases
console.log("Test 1:", originalDigits("owoztneetwov")); // Expected: "012"
console.log("Test 2:", originalDigits("fviefuro"));    // Expected: "45"

module.exports = originalDigits;

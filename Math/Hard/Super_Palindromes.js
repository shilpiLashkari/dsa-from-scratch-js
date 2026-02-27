// Problem: Super Palindromes
// A positive integer is a superpalindrome if it is a palindrome, and its square is also a palindrome.
// Given two positive integers left and right represented as strings, return the number of superpalindromes in the inclusive range [left, right].

// Example 1:
// Input: left = "4", right = "1000"
// Output: 4
// Explanation: 4, 9, 121, and 484 are superpalindromes.
// Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a palindrome.

// Example 2:
// Input: left = "1", right = "2"
// Output: 1

// Constraints:
// 1 <= left.length, right.length <= 18
// left and right consist of only digits.
// left and right cannot have leading zeros.
// left and right represent integers in the range [1, 10^18 - 1].

/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
var superPalindromesInRange = function (left, right) {
    const L = BigInt(left);
    const R = BigInt(right);
    const MAGIC = 100000;
    let count = 0;

    const isPalindrome = (s) => {
        let i = 0, j = s.length - 1;
        while (i < j) {
            if (s[i] !== s[j]) return false;
            i++;
            j--;
        }
        return true;
    };

    // Generate palindromes of odd and even length
    // We only need to check roots up to 10^9 because R <= 10^18
    // So seeds are up to 10^5

    // Odd length palindromes: seed = "123" -> "12321"
    for (let i = 1; i < MAGIC; i++) {
        let s = i.toString();
        let pStr = s;
        for (let j = s.length - 2; j >= 0; j--) {
            pStr += s[j];
        }
        let p = BigInt(pStr);
        let sq = p * p;
        if (sq > R) break;
        if (sq >= L && isPalindrome(sq.toString())) {
            count++;
        }
    }

    // Even length palindromes: seed = "123" -> "123321"
    for (let i = 1; i < MAGIC; i++) {
        let s = i.toString();
        let pStr = s;
        for (let j = s.length - 1; j >= 0; j--) {
            pStr += s[j];
        }
        let p = BigInt(pStr);
        let sq = p * p;
        if (sq > R) {
            // Check if current i is too large for even length palindromes
            // Note: even length palindromes grow faster than odd length for the same seed
            // But we should continue because some smaller seeds might still work? 
            // Actually, p itself is monotonic with i, so sq is monotonic.
            // However, we might need a separate break condition or check for both.
            // Since we iterate i from 1 upwards, if p*p > R, then (p+1)*(p+1) will also be > R.
            // But we should break only if the SMALLER of the two types exceeds R? 
            // No, the odd/even loops are separate.
        }
        if (sq > R) break;
        if (sq >= L && isPalindrome(sq.toString())) {
            count++;
        }
    }

    return count;
};

// Notes:
// - A superpalindrome is a palindrome whose square is also a palindrome.
// - Since the range is up to 10^18, its square root can be up to 10^9.
// - We can generate all palindromes up to 10^9 and check if their squares are palindromes.
// - To generate palindromes up to 10^9, we only need to iterate up to 10^5 (the first half).
// - We consider both odd-length and even-length palindromes.
// - Time Complexity: O(R^(1/4) * log R) - Generating roots up to 10^9 involves ~2*10^5 iterations, and each palindrome check is O(log R).
// - Space Complexity: O(log R) - To store the string representation of numbers.

module.exports = { superPalindromesInRange };

// Problem: Valid Number (LeetCode #65)
// A valid number can be split up into these components, in order:
// 1. A decimal number or an integer.
// 2. (Optional) An 'e' or 'E', followed by an integer.
//
// A decimal number can be split up into these components, in order:
// 1. (Optional) A sign character (either '+' or '-').
// 2. One of the following formats:
//    - One or more digits, followed by a dot '.'.
//    - One or more digits, followed by a dot '.', followed by one or more digits.
//    - A dot '.', followed by one or more digits.
//
// An integer can be split up into these components, in order:
// 1. (Optional) A sign character (either '+' or '-').
// 2. One or more digits.
//
// Example 1:
// Input: s = "0" -> Output: true
// Example 2:
// Input: s = "e" -> Output: false
// Example 3:
// Input: s = "." -> Output: false
//
// Constraints:
// - 1 <= s.length <= 20
// - s consists of English letters (both uppercase and lowercase), digits (0-9), plus '+', minus '-', or dot '.'.

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    if (!s) return false;
    
    // Trim is usually handled by modern LeetCode, but for robust design we track it
    let seenDigit = false;
    let seenDot = false;
    let seenExponent = false;
    
    s = s.trim(); // Handle wrapping whitespace if applicable

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            seenDigit = true;
        } else if (char === '+' || char === '-') {
            // Sign can only be at the start or immediately after 'e'
            if (i > 0 && s[i - 1] !== 'e' && s[i - 1] !== 'E') {
                return false;
            }
        } else if (char === '.') {
            // Dot can only appear once and cannot appear after 'e'
            if (seenDot || seenExponent) {
                return false;
            }
            seenDot = true;
        } else if (char === 'e' || char === 'E') {
            // Exponent can only appear once and must be preceded by a digit
            if (seenExponent || !seenDigit) {
                return false;
            }
            seenDigit = false; // Reset for the number after 'e'
            seenExponent = true;
        } else {
            // Invalid character
            return false;
        }
    }

    return seenDigit;
};

// Notes:
// - The core logic is to track the occurrence of digits, dots, and exponents.
// - Signs ('+', '-') are only valid at the absolute start or right after an exponent ('e'/'E').
// - A dot ('.') is only valid if we haven't seen one yet and haven't encountered an exponent.
// - An exponent ('e'/'E') is only valid if we've seen at least one digit and haven't seen an exponent yet.
// - After an exponent, we MUST see at least one target digit (hence resetting `seenDigit`).
// - Time Complexity: O(N) where N is the length of the string.
// - Space Complexity: O(1).

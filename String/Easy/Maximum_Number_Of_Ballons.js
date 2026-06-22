// Problem: Maximum Number of Balloons
// Given a string text, return the maximum number of times the word "balloon" 
// can be formed by using characters from text.

// Example 1:
// Input: text = "loonbalxballpoon"
// Output: 2

// Example 2:
// Input: text = "balon"
// Output: 0

// Example 3:
// Input: text = "balloonballoon"
// Output: 2

// Constraints:
// 1 <= text.length <= 10^4
// text consists of lower case English letters only.

/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
    const charCount = {};

    for (const char of text) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    const b = charCount['b'] || 0;
    const a = charCount['a'] || 0;
    const l = Math.floor((charCount['l'] || 0) / 2);
    const o = Math.floor((charCount['o'] || 0) / 2);
    const n = charCount['n'] || 0;

    return Math.min(b, a, l, o, n);
};

/**
 * Longest Palindromic Substring
 * 
 * Strategy: We use the "Expand Around Center" technique. There are 2n-1 
 * such centers (n for characters, n-1 for spaces between characters).
 * For each center, we expand outward as long as it's a palindrome.
 * 
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i);     // Odd length
        const len2 = expandAroundCenter(s, i, i + 1); // Even length
        const len = Math.max(len1, len2);

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

// Example Test Case
console.log("Test 1:", longestPalindrome("babad")); // Expected: "bab" or "aba"
console.log("Test 2:", longestPalindrome("cbbd"));  // Expected: "bb"

module.exports = longestPalindrome;

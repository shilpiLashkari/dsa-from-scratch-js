/**
 * Longest Substring Without Repeating Characters
 * 
 * Strategy: We use a sliding window approach with two pointers (left and right).
 * A Map is used to store the last seen index of each character.
 * When we encounter a repeating character, we move the left pointer to 
 * max(left, lastSeenIndex + 1).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(min(M, N)) where M is the character set size.
 */

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let map = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (map.has(char)) {
            left = Math.max(left, map.get(char) + 1);
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// Example Test Case
console.log("Test 1:", lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log("Test 2:", lengthOfLongestSubstring("bbbbb"));    // Expected: 1
console.log("Test 3:", lengthOfLongestSubstring("pwwkew"));   // Expected: 3

module.exports = lengthOfLongestSubstring;

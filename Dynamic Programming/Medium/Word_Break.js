/**
 * Word Break
 * 
 * Strategy: This is a classic DP problem. 
 * Let dp[i] be true if s.substring(0, i) can be segmented into words from 
 * the dictionary.
 * dp[i] = any(dp[j] && wordSet.has(s.substring(j, i))) for 0 <= j < i.
 * 
 * Time Complexity: O(N^3) (substring operation takes O(N)).
 * Space Complexity: O(N)
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

// Example Test Case
console.log("Test 1:", wordBreak("leetcode", ["leet", "code"])); // true
console.log("Test 2:", wordBreak("applepenapple", ["apple", "pen"])); // true
console.log("Test 3:", wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false

module.exports = wordBreak;

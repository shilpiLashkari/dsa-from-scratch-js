/**
 * Distinct Subsequences
 * 
 * Problem:
 * Given two strings s and t, return the number of distinct subsequences of s which equals t.
 * 
 * A string's subsequence is a new string formed from the original string by deleting some (can be none) 
 * of the characters without disturbing the remaining characters' relative positions. 
 * (i.e., "ACE" is a subsequence of "ABCDE" while "AEC" is not).
 * 
 * The test cases are generated so that the answer fits in a 32-bit signed integer.
 * 
 * Complexity: O(N * M) Time, O(M) Space
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const numDistinct = (s, t) => {
    const n = s.length;
    const m = t.length;
    
    // dp[j] represents number of distinct subsequences of s[0...i-1] that equal t[0...j-1]
    // We use a 1D array for space optimization.
    const dp = new Array(m + 1).fill(0);
    
    // Base case: Empty string t is a subsequence of any prefix of s exactly once.
    dp[0] = 1;
    
    for (let i = 1; i <= n; i++) {
        // Iterate backwards through t to avoid using the same character of s multiple times 
        // for the same subsequence (standard 1D DP optimization for 2D DP).
        for (let j = m; j >= 1; j--) {
            // Case 1: If s[i-1] matches t[j-1], we have two choices:
            // - Use s[i-1] to match t[j-1]. The number of ways is dp[j-1] (previous state of t prefix).
            // - Skip s[i-1]. The number of ways is dp[j] (already calculated for previous s prefix).
            if (s[i - 1] === t[j - 1]) {
                dp[j] = dp[j] + dp[j - 1];
            }
            // Case 2: If s[i-1] doesn't match t[j-1]:
            // - We must skip s[i-1]. The number of ways remains dp[j].
        }
    }
    
    return dp[m];
};

// --- Test Cases ---
const runTest = (s, t, expected) => {
    const result = numDistinct(s, t);
    console.log(`s: "${s}", t: "${t}" | Result: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
};

console.log("Running Distinct Subsequences tests...");
runTest("rabbbit", "rabbit", 3);
// 1. ra b bbit
// 2. rab b it
// 3. rabb b it
runTest("babgbag", "bag", 5);
// 1. ba g
// 2. ba    g
// 3. b    ag
// 4.  a  bg
// 5.    bbag
runTest("abc", "def", 0);
runTest("", "a", 0);
runTest("aaa", "a", 3);

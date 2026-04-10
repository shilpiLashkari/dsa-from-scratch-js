/**
 * Interleaving String
 * 
 * Problem:
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.
 * 
 * An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:
 * - s = s1 + s2 + ... + sn
 * - t = t1 + t2 + ... + tm
 * - |n - m| <= 1
 * - The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
 * 
 * Note: a + b is the concatenation of strings a and b.
 * 
 * Complexity: O(M * N) Time, O(min(M, N)) Space
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = (s1, s2, s3) => {
    if (s1.length + s2.length !== s3.length) {
        return false;
    }

    // Space optimization: Ensure s2 is the shorter string
    if (s2.length > s1.length) {
        [s1, s2] = [s2, s1];
    }

    const n = s1.length;
    const m = s2.length;
    
    // dp[j] will represent dp[i][j] for the current i
    const dp = new Array(m + 1).fill(false);

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i === 0 && j === 0) {
                dp[j] = true;
            } else if (i === 0) {
                // First Row: Only depends on s2 and previous state in the row
                dp[j] = dp[j - 1] && s2[j - 1] === s3[i + j - 1];
            } else if (j === 0) {
                // First Column: Only depends on s1 and previous state in the column
                // Note: dp[j] here is from the previous row (i-1, j)
                dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
            } else {
                // General case: dp[j] (from i-1, j) and dp[j-1] (from i, j-1)
                dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
                        (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
    }

    return dp[m];
};

// --- Test Cases ---
const runTest = (s1, s2, s3, expected) => {
    const result = isInterleave(s1, s2, s3);
    console.log(`s1: "${s1}", s2: "${s2}", s3: "${s3}" | Result: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
};

console.log("Running Interleaving String tests...");
runTest("aabcc", "dbbca", "aadbbcbcac", true);
runTest("aabcc", "dbbca", "aadbbbaccc", false);
runTest("", "", "", true);
runTest("abc", "def", "abdcef", true);
runTest("a", "b", "a", false);

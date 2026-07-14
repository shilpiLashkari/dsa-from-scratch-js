/**
 * Decode Ways II
 * 
 * Problem:
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:
 * 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"
 * 
 * To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways).
 * For example, "11106" can be mapped into:
 * - "AAJF" with the grouping (1 1 10 6)
 * - "KJF" with the grouping (11 10 6)
 * Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
 * 
 * In addition to the digits, the encoded message may contain the '*' character, which can represent any digit from '1' to '9' ('0' is not allowed).
 * Given a string s containing digits and '*' characters, return the number of ways to decode it.
 * Since the answer may be very large, return it modulo 10^9 + 7.
 * 
 * Complexity: O(N) Time, O(1) Space
 */

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = (s) => {
    const MOD = 1000000007n;
    const n = s.length;
    
    // dp[i] represents number of ways to decode s[0...i-1]
    // We only need the last two states: e0 (dp[i-2]), e1 (dp[i-1])
    let e0 = 1n; // ways for empty string
    let e1 = 0n; // ways for s[0]
    
    // Initialize e1 based on s[0]
    if (s[0] === '*') {
        e1 = 9n;
    } else if (s[0] === '0') {
        return 0; // Invalid start
    } else {
        e1 = 1n;
    }
    
    for (let i = 1; i < n; i++) {
        let e2 = 0n;
        
        // Single character decoding (s[i])
        if (s[i] === '*') {
            e2 = (e2 + 9n * e1) % MOD;
        } else if (s[i] !== '0') {
            e2 = (e2 + e1) % MOD;
        }
        
        // Two character decoding (s[i-1]s[i])
        const prev = s[i - 1];
        const curr = s[i];
        
        if (prev === '*') {
            if (curr === '*') {
                // ** -> 11-19 (9) + 21-26 (6) = 15 ways
                e2 = (e2 + 15n * e0) % MOD;
            } else if (curr <= '6') {
                // *[0-6] -> 1x, 2x -> 2 ways
                e2 = (e2 + 2n * e0) % MOD;
            } else {
                // *[7-9] -> 1x -> 1 way
                e2 = (e2 + e0) % MOD;
            }
        } else if (prev === '1') {
            if (curr === '*') {
                // 1* -> 11-19 -> 9 ways
                e2 = (e2 + 9n * e0) % MOD;
            } else {
                // 1x -> 1 way
                e2 = (e2 + e0) % MOD;
            }
        } else if (prev === '2') {
            if (curr === '*') {
                // 2* -> 21-26 -> 6 ways
                e2 = (e2 + 6n * e0) % MOD;
            } else if (curr <= '6') {
                // 2[0-6] -> 1 way
                e2 = (e2 + e0) % MOD;
            }
        }
        
        e0 = e1;
        e1 = e2;
        
        if (e1 === 0n) return 0; // Optimization: early exit if no ways possible
    }
    
    return Number(e1);
};

// --- Test Cases ---
const runTest = (s, expected) => {
    const result = numDecodings(s);
    console.log(`Input: "${s}" | Output: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
};

console.log("Running Decode Ways II tests...");
runTest("*", 9);
runTest("1*", 18); // 1-9 (A-I) and 11-19 (K-S)
runTest("2*", 15); // 21-26 (U-Z) and 2[1-9]
runTest("**", 96); // 9*9 (single) + 15 (double) = 81 + 15 = 96
runTest("10", 1);
runTest("111", 3);

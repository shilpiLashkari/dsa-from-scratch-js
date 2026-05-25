/**
 * Problem Name: Jump Game VII
 * Problem Link: https://leetcode.com/problems/jump-game-vii/
 * Difficulty: Medium
 * 
 * Problem Statement:
 * You are given a 0-indexed binary string `s` and two integers `minJump` and `maxJump`. 
 * In the beginning, you are at index 0, which is equal to '0'. 
 * You can move from index i to index j if:
 *  - i + minJump <= j <= Math.min(i + maxJump, s.length - 1)
 *  - s[j] == '0'
 * Return true if you can reach index s.length - 1 in the given string, or false otherwise.
 *
 * Approach: Dynamic Programming with Sliding Window
 * - We can use a boolean array `dp` where `dp[i]` indicates whether index `i` is reachable.
 * - To efficiently check if there's any reachable index in the range `[i - maxJump, i - minJump]`,
 *   we can maintain a sliding window count (`reachableCount`) of reachable positions.
 * - As we iterate through the string, we add `dp[i - minJump]` to our count (if it's valid)
 *   and subtract `dp[i - maxJump - 1]` (as it falls out of the window).
 * - The current index `i` is reachable if `reachableCount > 0` and `s[i] === '0'`.
 *
 * Time Complexity: O(N) - We iterate through the string of length N exactly once.
 * Space Complexity: O(N) - We use an array of size N to store the reachable states.
 */

/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function(s, minJump, maxJump) {
    // If the last character is '1', we can never land on it
    if (s[s.length - 1] !== '0') return false;

    const n = s.length;
    const dp = new Array(n).fill(false);
    dp[0] = true;
    
    let reachableCount = 0;
    
    for (let i = 1; i < n; i++) {
        // Add the element that just entered the sliding window [i - maxJump, i - minJump]
        if (i >= minJump) {
            reachableCount += dp[i - minJump] ? 1 : 0;
        }
        // Remove the element that just left the sliding window
        if (i > maxJump) {
            reachableCount -= dp[i - maxJump - 1] ? 1 : 0;
        }
        
        // The current index is reachable if there's at least one reachable index in the window 
        // and the current character is '0'
        dp[i] = reachableCount > 0 && s[i] === '0';
    }
    
    return dp[n - 1];
};

// --- Test Cases ---
console.log(canReach("011010", 2, 3)); // Expected: true
console.log(canReach("01101110", 2, 3)); // Expected: false
console.log(canReach("0000000000", 1, 1)); // Expected: true
console.log(canReach("00111010", 3, 5)); // Expected: false

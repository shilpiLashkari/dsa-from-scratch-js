// Problem: Number of Digit One (LeetCode #233)
// Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.
//
// Example 1:
// Input: n = 13 -> Output: 6
// Explanation: Digit 1 occurred in the following numbers: 1, 10, 11, 12, 13.
//
// Constraints:
// - 0 <= n <= 10^9

/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    if (n <= 0) return 0;

    let count = 0;
    // Iterate through each digit position (1s, 10s, 100s, ...)
    for (let i = 1; i <= n; i *= 10) {
        const divider = i * 10;
        
        // Full cycles of 'divider' contribute 'i' ones at this position
        count += Math.floor(n / divider) * i;
        
        // Partial cycle handling:
        // Remaining part is n % divider
        // If it's less than i, no additional 1s.
        // If it's between i and 2i - 1, some additional 1s.
        // If it's 2i or more, i additional 1s.
        const remaining = n % divider;
        count += Math.min(Math.max(remaining - i + 1, 0), i);
    }

    return count;
};

// Notes:
// - We count the occurrences of the digit '1' at each position (units, tens, hundreds, etc.) independently.
// - For a position factor `i`, the digit `1` appears exactly `i` times in every range of `10 * i`.
// - The math formula `Math.floor(n / divider) * i` handles full cycles.
// - The `remaining` calculations handle the incomplete cycle at the end.
// - Time Complexity: O(log N) - where log N is the number of digits in n.
// - Space Complexity: O(1).

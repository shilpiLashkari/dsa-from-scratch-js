/**
 * @param {number} n
 * @return {number}
 */
/**
 * Problem: Rotated Digits
 * An integer x is good if after rotating each digit individually by 180 degrees, we get a valid number that is different from x.
 * Each digit must be rotated - we cannot choose to leave it alone.
 * 
 * Valid rotations:
 * 0, 1, 8 rotate to themselves.
 * 2 and 5 rotate to each other.
 * 6 and 9 rotate to each other.
 * 3, 4, 7 are invalid.
 * 
 * A number is good if:
 * 1. It only contains digits from {0, 1, 8, 2, 5, 6, 9}.
 * 2. It contains at least one digit from {2, 5, 6, 9}.
 * 
 * Time Complexity: O(log10(n)) - Since we iterate through the digits of n.
 * Space Complexity: O(log10(n)) - For the recursion stack or DP table.
 */

var rotatedDigits = function(n) {
    const s = n.toString();
    const memo = new Map();

    /**
     * @param {number} idx - Current digit index
     * @param {boolean} isLess - If current number is already less than prefix of n
     * @param {boolean} hasDiff - If we have encountered at least one of {2, 5, 6, 9}
     * @param {boolean} isStarted - If we have started placing non-zero digits
     */
    function dp(idx, isLess, hasDiff, isStarted) {
        if (idx === s.length) {
            return hasDiff ? 1 : 0;
        }

        const key = `${idx}-${isLess}-${hasDiff}-${isStarted}`;
        if (memo.has(key)) return memo.get(key);

        let count = 0;
        const limit = isLess ? 9 : parseInt(s[idx]);

        for (let d = 0; d <= limit; d++) {
            const nextIsLess = isLess || (d < limit);
            const nextIsStarted = isStarted || (d > 0);
            
            // Invalid digits
            if (d === 3 || d === 4 || d === 7) continue;

            // Check if this digit introduces a difference (2, 5, 6, 9)
            const nextHasDiff = hasDiff || (d === 2 || d === 5 || d === 6 || d === d && d === 9);
            // Actually, simplified:
            const currentHasDiff = (d === 2 || d === 5 || d === 6 || d === 9);

            count += dp(idx + 1, nextIsLess, hasDiff || currentHasDiff, nextIsStarted);
        }

        memo.set(key, count);
        return count;
    }

    return dp(0, false, false, false);
};

// Test Cases
console.log("n = 10:", rotatedDigits(10)); // Output: 4 (2, 5, 6, 9)
console.log("n = 20:", rotatedDigits(20)); // Output: 9 (2, 5, 6, 9, 12, 15, 16, 19, 20)
console.log("n = 1:", rotatedDigits(1));   // Output: 0
console.log("n = 100:", rotatedDigits(100)); // Output: 40

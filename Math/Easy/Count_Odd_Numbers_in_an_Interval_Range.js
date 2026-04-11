// Problem: Count Odd Numbers in an Interval Range
// Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

// Example 1:
// Input: low = 3, high = 7
// Output: 3
// Explanation: The odd numbers between 3 and 7 are [3,5,7].

// Example 2:
// Input: low = 8, high = 10
// Output: 1
// Explanation: The odd numbers between 8 and 10 are [9].

// Constraints:
// 0 <= low <= high <= 10^9

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function(low, high) {
    // Math approach:
    // The number of odd numbers between 1 and N is Math.ceil(N / 2) or Math.floor((N + 1) / 2).
    // So the number of odds between 1 and high is floor((high + 1) / 2).
    // The number of odds between 1 and low-1 is floor(low / 2).
    // Total odds in range [low, high] = odds(high) - odds(low - 1).
    
    return Math.floor((high + 1) / 2) - Math.floor(low / 2);
};

// Notes:
// - We can calculate the number of odd numbers from 1 to N using the formula `(N + 1) / 2` (integer division).
// - To find the count in range [low, high], we find the count from 1 to high, and subtract the count from 1 to low - 1.
// - Alternative: If both are even, count is (high - low) / 2. Otherwise it is (high - low) / 2 + 1.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { countOdds };

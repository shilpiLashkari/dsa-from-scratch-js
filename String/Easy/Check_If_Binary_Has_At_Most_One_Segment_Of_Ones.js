// Problem: Check if Binary String Has at Most One Segment of Ones
// Given a binary string s without leading zeros, return true if s contains at most one contiguous segment of ones.
// Otherwise, return false.

// Example 1:
// Input: s = "1001"
// Output: false
// Explanation: The ones do not form a contiguous segment.

// Example 2:
// Input: s = "110"
// Output: true

// Constraints:
// 1 <= s.length <= 100
// s[i] is either '0' or '1'.
// s[0] is '1'.

/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
  return !s.includes("01");
};

// Notes:
// - Since the string has no leading zeros and s[0] is '1', there is at least one segment of ones at the start.
// - The problem reduces to checking if there is any '1' that appears after the first segment of ones is over (i.e., after a '0').
// - If "01" is a substring, it means a new segment of ones has started after the first one ended.
// - Time Complexity Target: O(n)
// - Space Complexity Target: O(1)

module.exports = { checkOnesSegment };

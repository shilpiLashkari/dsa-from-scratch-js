// Problem: Minimum Number of Flips to Make the Binary String Alternating
/*
You are given a binary string s. You can perform the following operations on the string any number of times:

Type 1: Remove the character at the start of the string s and append it to the end of the string.
Type 2: Pick any character in s and flip its value (i.e., change '0' to '1' or '1' to '0').
Return the minimum number of Type 2 operations you need to perform such that s becomes alternating.

The string is called alternating if no two adjacent characters are equal.
For example, "01011" is not alternating, while "0101" and "1010" are alternating.
*/

/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function (s) {
  const n = s.length;
  let s2 = s + s;
  let target1 = "";
  let target2 = "";

  // Generate the two possible alternating patterns
  for (let i = 0; i < s2.length; i++) {
    target1 += i % 2 === 0 ? "0" : "1";
    target2 += i % 2 === 0 ? "1" : "0";
  }

  let diff1 = 0;
  let diff2 = 0;
  let minDiff = Infinity;

  let left = 0;
  for (let right = 0; right < s2.length; right++) {
    if (s2[right] !== target1[right]) diff1++;
    if (s2[right] !== target2[right]) diff2++;

    // When window size exceeds n, remove the leftmost character's effect
    if (right - left + 1 > n) {
      if (s2[left] !== target1[left]) diff1--;
      if (s2[left] !== target2[left]) diff2--;
      left++;
    }

    // Calculate minDiff when window size is exactly n
    if (right - left + 1 === n) {
      minDiff = Math.min(minDiff, diff1, diff2);
    }
  }

  return minDiff;
};

// Complexity Analysis:
// Time Complexity: O(n) - Single pass over s + s (length 2n).
// Space Complexity: O(n) - To store the concatenated string and target patterns.

module.exports = { minFlips };

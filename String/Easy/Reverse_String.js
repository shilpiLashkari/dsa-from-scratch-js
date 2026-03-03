// Problem: Reverse String
// Write a function that reverses a string. The input string is given as an array of characters s.
// You must do this by modifying the input array in-place with O(1) extra memory.

// Example 1:
// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

// Example 2:
// Input: s = ["H","a","n","n","a","h"]
// Output: ["h","a","n","n","a","H"]

// Constraints:
// 1 <= s.length <= 10^5
// s[i] is a printable ascii character.

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Swap elements at left and right pointers
        [s[left], s[right]] = [s[right], s[left]];

        // Move pointers towards the center
        left++;
        right--;
    }
};

// Notes:
// - We use a Two-Pointer approach, starting from the outermost elements and moving inward.
// - At each step, we swap the elements at the 'left' and 'right' pointers.
// - This algorithm is in-place, meaning it modifies the original array and uses constant extra space.
// - Time Complexity: O(N) where N is the length of the array.
// - Space Complexity: O(1) as we only use a few pointer variables.

module.exports = { reverseString };

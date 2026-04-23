/**
 * Reverse Words in a String
 * 
 * Strategy:
 * 1. Trim leading and trailing whitespace.
 * 2. Split the string by one or more spaces using regex.
 * 3. Reverse the resulting array of words.
 * 4. Join the words with a single space.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
    return s.trim().split(/\s+/).reverse().join(" ");
}

// Example Test Case
console.log("Test 1:", reverseWords("the sky is blue")); // "blue is sky the"
console.log("Test 2:", reverseWords("  hello world  ")); // "world hello"
console.log("Test 3:", reverseWords("a good   example")); // "example good a"

module.exports = reverseWords;

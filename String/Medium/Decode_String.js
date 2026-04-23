/**
 * Decode String
 * 
 * Strategy: We use two stacks: one for numbers (counts) and one for 
 * strings (prev strings).
 * 1. When we encounter a digit, we build the number.
 * 2. When we encounter '[', we push the current string and current number 
 *    onto their respective stacks and reset them.
 * 3. When we encounter ']', we pop the number and the previous string. 
 *    We repeat the current decoded string 'num' times and append it to 
 *    the previous string.
 * 4. Otherwise, we just append the character to the current string.
 * 
 * Time Complexity: O(Max(K) * N) where K is the count and N is string length.
 * Space Complexity: O(N) to store the stacks.
 */

/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
    let stack = [];
    let currNum = 0;
    let currStr = "";

    for (let char of s) {
        if (char >= '0' && char <= '9') {
            currNum = currNum * 10 + parseInt(char);
        } else if (char === '[') {
            stack.push([currStr, currNum]);
            currStr = "";
            currNum = 0;
        } else if (char === ']') {
            let [prevStr, num] = stack.pop();
            currStr = prevStr + currStr.repeat(num);
        } else {
            currStr += char;
        }
    }

    return currStr;
}

// Example Test Case
console.log("Test 1:", decodeString("3[a]2[bc]"));    // Expected: "aaabcbc"
console.log("Test 2:", decodeString("3[a2[c]]"));      // Expected: "accaccacc"
console.log("Test 3:", decodeString("2[abc]3[cd]ef")); // Expected: "abcabccdcdcd"

module.exports = decodeString;

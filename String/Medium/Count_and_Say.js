/**
 * Count and Say
 * 
 * Strategy: We iteratively generate the next sequence from the previous one.
 * To generate the next term:
 * 1. Read the previous term character by character.
 * 2. Count consecutive occurrences of each character.
 * 3. Append the count and the character to the result.
 * 
 * Time Complexity: Exponential.
 * Space Complexity: Exponential.
 */

/**
 * @param {number} n
 * @return {string}
 */
function countAndSay(n) {
    let res = "1";
    for (let i = 2; i <= n; i++) {
        let nextRes = "";
        let count = 1;
        for (let j = 0; j < res.length; j++) {
            if (res[j] === res[j + 1]) {
                count++;
            } else {
                nextRes += count.toString() + res[j];
                count = 1;
            }
        }
        res = nextRes;
    }
    return res;
}

// Example Test Case
console.log("Test 1 (n=1):", countAndSay(1)); // "1"
console.log("Test 2 (n=4):", countAndSay(4)); // "1211"

module.exports = countAndSay;

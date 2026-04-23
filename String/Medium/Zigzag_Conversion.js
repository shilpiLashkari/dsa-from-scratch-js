/**
 * Zigzag Conversion
 * 
 * Strategy: We use an array of strings representing rows. 
 * We traverse the input string and append each character to the appropriate row.
 * We maintain a direction variable that flips whenever we reach the top or bottom row.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) return s;

    const rows = Array.from({ length: numRows }, () => "");
    let currRow = 0;
    let goingDown = false;

    for (const char of s) {
        rows[currRow] += char;
        if (currRow === 0 || currRow === numRows - 1) {
            goingDown = !goingDown;
        }
        currRow += goingDown ? 1 : -1;
    }

    return rows.join("");
}

// Example Test Case
console.log("Test 1:", convert("PAYPALISHIRING", 3)); // Expected: "PAHNAPLSIIGYIR"
console.log("Test 2:", convert("PAYPALISHIRING", 4)); // Expected: "PINALSIGYAHRPI"

module.exports = convert;

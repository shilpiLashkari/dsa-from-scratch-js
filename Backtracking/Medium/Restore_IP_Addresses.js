/**
 * Restore IP Addresses
 * 
 * Strategy: We use backtracking to find all valid combinations of 4 segments.
 * 1. For each segment, try picking 1, 2, or 3 digits.
 * 2. Validate the segment:
 *    - Must be between 0 and 255.
 *    - No leading zeros (unless the segment is exactly "0").
 * 3. If we have 4 valid segments and have consumed the whole string, save the result.
 * 
 * Time Complexity: O(3^4) - Constant since IP addresses have a fixed structure.
 * Space Complexity: O(1) excluding output.
 */

/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
    const res = [];

    function backtrack(start, parts) {
        if (parts.length === 4) {
            if (start === s.length) {
                res.push(parts.join("."));
            }
            return;
        }

        for (let len = 1; len <= 3; len++) {
            if (start + len > s.length) break;

            const segment = s.substring(start, start + len);
            if (isValid(segment)) {
                parts.push(segment);
                backtrack(start + len, parts);
                parts.pop();
            }
        }
    }

    function isValid(segment) {
        if (segment.length > 1 && segment[0] === '0') return false;
        const val = parseInt(segment);
        return val >= 0 && val <= 255;
    }

    backtrack(0, []);
    return res;
}

// Example Test Case
console.log("Test 1:", restoreIpAddresses("25525511135")); // ["255.255.11.135","255.255.111.35"]
console.log("Test 2:", restoreIpAddresses("0000"));        // ["0.0.0.0"]

module.exports = restoreIpAddresses;

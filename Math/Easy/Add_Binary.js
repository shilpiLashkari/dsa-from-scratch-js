// Problem: Add Binary
// Given two binary strings a and b, return their sum as a binary string.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"

// Constraints:
// 1 <= a.length, b.length <= 10^4
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let result = "";
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;

    while (i >= 0 || j >= 0 || carry > 0) {
        let sum = carry;
        if (i >= 0) sum += parseInt(a[i--]);
        if (j >= 0) sum += parseInt(b[j--]);

        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    return result;
};

// Notes:
// - We iterate from the end of both strings (least significant bit).
// - We maintain a carry for the addition.
// - For each position, the bit value is (sum % 2) and the new carry is (sum / 2).
// - Time Complexity: O(max(N, M)) where N and M are lengths of strings.
// - Space Complexity: O(max(N, M)) for the result string.

module.exports = { addBinary };

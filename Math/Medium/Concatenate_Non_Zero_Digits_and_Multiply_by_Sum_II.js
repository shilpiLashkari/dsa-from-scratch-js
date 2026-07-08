/**
 * Concatenate Non-Zero Digits and Multiply by Sum II
 *
 * Given a non-negative integer num, form a new integer by concatenating all
 * non-zero digits of num in order. Multiply that value by the sum of the
 * digits of num.
 *
 * Example:
 * Input: 12345
 * Non-zero digits -> "12345"
 * Sum of digits -> 15
 * Result -> 12345 * 15 = 185175
 *
 * Time Complexity: O(d)
 * Space Complexity: O(d)
 */
function concatenateNonZeroDigitsAndMultiplyBySumII(num) {
    const value = String(num);
    let concatenatedDigits = "";
    let digitSum = 0n;

    for (const ch of value) {
        if (ch === "-") continue;

        const digit = BigInt(ch);
        if (digit !== 0n) {
            concatenatedDigits += ch;
        }
        digitSum += digit;
    }

    if (concatenatedDigits === "") {
        return 0n;
    }

    return BigInt(concatenatedDigits) * digitSum;
}

// Example usage
console.log(concatenateNonZeroDigitsAndMultiplyBySumII(12345)); // 185175n
console.log(concatenateNonZeroDigitsAndMultiplyBySumII(1001)); // 22n

module.exports = concatenateNonZeroDigitsAndMultiplyBySumII;

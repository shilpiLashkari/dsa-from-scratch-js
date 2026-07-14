/**
 * Calculates the waviness of a single number.
 * The waviness of a number is the count of its digits that are peaks or valleys.
 * A peak is a digit strictly greater than both its immediate neighbors.
 * A valley is a digit strictly less than both its immediate neighbors.
 * 
 * Boundary Rules: The first and last digits of a number cannot be peaks or valleys.
 * Constraint: Any number with fewer than 3 digits has a waviness of 0.
 * 
 * @param {number} num - The number to evaluate.
 * @return {number} - The waviness of the number.
 */
function getWaviness(num) {
    const str = num.toString();
    let waviness = 0;
    
    if (str.length < 3) {
        return 0;
    }

    for (let i = 1; i < str.length - 1; i++) {
        const prev = str[i - 1];
        const curr = str[i];
        const next = str[i + 1];
        
        if (curr > prev && curr > next) {
            waviness++;
        } else if (curr < prev && curr < next) {
            waviness++;
        }
    }
    
    return waviness;
}

/**
 * Total Waviness of Numbers in Range I
 * 
 * Calculates the total waviness of all numbers in the inclusive range [left, right].
 * 
 * Time Complexity: O(N * D) where N is the number of integers in the range [left, right]
 * and D is the maximum number of digits (O(log10(right))).
 * Space Complexity: O(D) for string conversion.
 * 
 * @param {number} left - The lower bound of the range.
 * @param {number} right - The upper bound of the range.
 * @return {number} - The total waviness of all numbers in the range.
 */
function totalWaviness(left, right) {
    let total = 0;
    for (let i = left; i <= right; i++) {
        total += getWaviness(i);
    }
    return total;
}

// ==========================================
// Test Cases
// ==========================================
if (require.main === module) {
    const testCases = [
        { left: 1, right: 99, expected: 0 },
        { left: 120, right: 120, expected: 1 },
        { left: 201, right: 201, expected: 1 },
        { left: 4848, right: 4848, expected: 2 },
        { left: 100, right: 125, expected: 11 }
    ];

    console.log("Testing Total Waviness of Numbers in Range I:");
    let allPassed = true;

    testCases.forEach((tc, index) => {
        const result = totalWaviness(tc.left, tc.right);
        const passed = result === tc.expected;
        if (!passed) allPassed = false;
        console.log(`Test Case ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"} (Expected: ${tc.expected}, Got: ${result})`);
    });

    if (allPassed) {
        console.log("\nAll test cases passed! 🎉");
    } else {
        console.log("\nSome test cases failed. ❌");
    }
}

module.exports = { totalWaviness, getWaviness };

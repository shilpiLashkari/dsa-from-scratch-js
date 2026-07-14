/**
 * Total Waviness of Numbers in Range II
 * 
 * Calculates the total waviness of all numbers in the inclusive range [left, right].
 * Since the answer can be very large, return it modulo 10^9 + 7.
 * 
 * Time Complexity: O(D) where D is the number of digits in the input (up to 100).
 * Space Complexity: O(D) for the memoization table.
 * 
 * @param {string} left - The lower bound of the range.
 * @param {string} right - The upper bound of the range.
 * @return {number} - The total waviness of all numbers in the range modulo 10^9 + 7.
 */
function totalWaviness(left, right) {
    const MOD = 1000000007n;

    /**
     * Decrements a numeric string by 1.
     * Assumes s represents a number > 0.
     * @param {string} s 
     * @returns {string}
     */
    function decrementString(s) {
        if (s === "0") return "0"; // Should not happen in standard valid ranges [1, right]
        let arr = s.split('');
        let i = arr.length - 1;
        while (i >= 0 && arr[i] === '0') {
            arr[i] = '9';
            i--;
        }
        if (i >= 0) {
            arr[i] = String(Number(arr[i]) - 1);
        }
        // Remove leading zeros, unless the string is just "0"
        while (arr.length > 1 && arr[0] === '0') {
            arr.shift();
        }
        return arr.join('');
    }

    /**
     * Solves the waviness for the range [1, S].
     * @param {string} S 
     * @returns {bigint} Total waviness
     */
    function solve(S) {
        if (S === "0") return 0n;
        
        // Initialize memoization table
        // memo[i][tight][is_lz][p1][p2]
        // i: 0 to S.length
        // tight: 0 or 1
        // is_lz: 0 or 1
        // p1: 0 to 10 (10 means no previous digit)
        // p2: 0 to 10
        const memo = new Array(S.length).fill(null).map(() => 
            new Array(2).fill(null).map(() => 
                new Array(2).fill(null).map(() => 
                    new Array(11).fill(null).map(() => 
                        new Array(11).fill(null)
                    )
                )
            )
        );

        function dp(i, tight, is_lz, p1, p2) {
            if (i === S.length) {
                return { count: 1n, sum: 0n };
            }

            if (memo[i][tight][is_lz][p1][p2] !== null) {
                return memo[i][tight][is_lz][p1][p2];
            }

            const limit = tight ? Number(S[i]) : 9;
            let totalCount = 0n;
            let totalSum = 0n;

            for (let d = 0; d <= limit; d++) {
                const next_tight = tight && (d === limit) ? 1 : 0;
                const next_lz = is_lz && (d === 0) ? 1 : 0;
                
                let next_p1, next_p2;
                if (is_lz && d === 0) {
                    next_p1 = 10;
                    next_p2 = 10;
                } else {
                    next_p1 = d;
                    next_p2 = is_lz ? 10 : p1;
                }

                let isWavy = false;
                if (!is_lz && p1 !== 10 && p2 !== 10) {
                    if (p2 < p1 && p1 > d) isWavy = true; // peak
                    if (p2 > p1 && p1 < d) isWavy = true; // valley
                }

                const child = dp(i + 1, next_tight, next_lz, next_p1, next_p2);

                totalCount = (totalCount + child.count) % MOD;
                totalSum = (totalSum + child.sum) % MOD;
                if (isWavy) {
                    totalSum = (totalSum + child.count) % MOD;
                }
            }

            memo[i][tight][is_lz][p1][p2] = { count: totalCount, sum: totalSum };
            return memo[i][tight][is_lz][p1][p2];
        }

        return dp(0, 1, 1, 10, 10).sum;
    }

    const rightSum = solve(right);
    const leftSum = solve(decrementString(left));

    // Calculate (rightSum - leftSum + MOD) % MOD
    const result = (rightSum - leftSum + MOD) % MOD;
    return Number(result);
}

// ==========================================
// Test Cases
// ==========================================
if (require.main === module) {
    const testCases = [
        { left: "1", right: "99", expected: 0 },
        { left: "120", right: "120", expected: 1 },
        { left: "201", right: "201", expected: 1 },
        { left: "4848", right: "4848", expected: 2 },
        { left: "100", right: "125", expected: 11 },
        // Large test case
        { left: "1", right: "10000", expected: 10905 }
    ];

    console.log("Testing Total Waviness of Numbers in Range II:");
    let allPassed = true;

    testCases.forEach((tc, index) => {
        const result = totalWaviness(tc.left, tc.right);
        if (tc.expected !== undefined && tc.expected !== null) {
            const passed = result === tc.expected;
            if (!passed && tc.expected !== -1) {
                allPassed = false;
                console.log(`Test Case ${index + 1}: ❌ Failed (Expected: ${tc.expected}, Got: ${result})`);
            } else {
                console.log(`Test Case ${index + 1}: ✅ Passed (Expected: ${tc.expected}, Got: ${result})`);
            }
        }
    });

    if (allPassed) {
        console.log("\nAll test cases passed! 🎉");
    } else {
        console.log("\nSome test cases failed. ❌");
    }
}

module.exports = { totalWaviness };

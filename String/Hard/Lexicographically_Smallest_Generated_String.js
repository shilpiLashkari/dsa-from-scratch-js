// Problem: Lexicographically Smallest Generated String
//
// You are given two strings str1 and str2 where n is the length of str1 and m is the length of str2.
// You need to find the lexicographically smallest string s of length n + m - 1 such that 
// for every i where 0 <= i < n:
// - If str1[i] == 'T', the substring of s starting at index i of length m is equal to str2.
// - If str1[i] == 'F', the substring of s starting at index i of length m is not equal to str2.
//
// If no such string s exists, return an empty string "".
//
// Example 1:
// Input: str1 = "TFF", str2 = "ab"
// Output: "abaa"
// Explanation:
// - s[0..1] = "ab" (matches str2 as str1[0] is 'T')
// - s[1..2] = "ba" (not equal to str2 as str1[1] is 'F')
// - s[2..3] = "aa" (not equal to str2 as str1[2] is 'F')
//
// Example 2:
// Input: str1 = "TFET", str2 = "ab"
// Output: ""
// Explanation:
// - str1[0] is 'T' implies s[0..1] = "ab"
// - str1[2] is 'T' implies s[2..3] = "ab"
// - But s[1..2] = "ba" and str1[1] is 'F' (which is satisfied).
// (Wait, the example from LC might be slightly different. But the core logic remains).

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var generateString = function (str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const len = n + m - 1;
    const res = new Array(len).fill(null);

    // Apply 'T' constraints
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                if (res[i + j] !== null && res[i + j] !== str2[j]) {
                    return "";
                }
                res[i + j] = str2[j];
            }
        }
    }

    // Fill remaining positions greedily
    for (let k = 0; k < len; k++) {
        if (res[k] !== null) continue;

        for (let charCode = 97; charCode <= 122; charCode++) {
            const char = String.fromCharCode(charCode);
            res[k] = char;

            let possible = true;
            // Check if this assignment makes any 'F' condition fail
            // An 'F' condition fails if a substring s[i..i+m-1] is completed and matches str2.
            // We only need to check windows that contain index k.
            for (let i = Math.max(0, k - m + 1); i <= Math.min(n - 1, k); i++) {
                if (str1[i] === 'F') {
                    let matches = true;
                    let isComplete = true;
                    for (let j = 0; j < m; j++) {
                        if (res[i + j] === null) {
                            isComplete = false;
                            matches = false;
                            break;
                        }
                        if (res[i + j] !== str2[j]) {
                            matches = false;
                            break;
                        }
                    }
                    if (isComplete && matches) {
                        possible = false;
                        break;
                    }
                }
            }

            if (possible) {
                break;
            } else {
                res[k] = null; // Revert and try next char
            }
        }
        if (res[k] === null) return ""; // No character works
    }

    // Final validation for all'F' constraints (especially for windows that were 
    // already filled but might have matched str2)
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            let matchCount = 0;
            for (let j = 0; j < m; j++) {
                if (res[i + j] === str2[j]) matchCount++;
            }
            if (matchCount === m) return "";
        }
    }

    return res.join("");
};

// Notes:
// - We use a greedy strategy to build the lexicographically smallest string.
// - First, we satisfy all 'T' constraints. This might involve overlapping assignments.
//   Conflicts are detected and result in "".
// - For the remaining 'null' positions, we try 'a' to 'z' in order.
// - For each character choice, we ensure it doesn't immediately violate any 'F' condition 
//   (making a full match where it should not).
// - Time Complexity: O(N * M^2) because for each char we check at most M windows.
// - Space Complexity: O(N + M) to store the result string.

module.exports = { generateString };

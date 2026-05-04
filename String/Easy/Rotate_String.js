

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const rotateString = (s, goal) => {
    if (s.length !== goal.length) return false;

    return (s + s).includes(goal);
};

// --- Test Cases ---
const testCases = [
    { s: "abcde", goal: "cdeab", expected: true },
    { s: "abcde", goal: "abced", expected: false },
    { s: "a", goal: "a", expected: true },
    { s: "aa", goal: "a", expected: false },
    { s: "", goal: "", expected: true }
];

testCases.forEach(({ s, goal, expected }, index) => {
    const result = rotateString(s, goal);
    console.log(`Test Case ${index + 1}: s="${s}", goal="${goal}"`);
    console.log(`Expected: ${expected}, Result: ${result}`);
    console.log(result === expected ? "✅ Passed" : "❌ Failed");
    console.log("---");
});

/**
 * Big O Analysis:
 * Time Complexity: O(N), where N is the length of string s. 
 *                  String concatenation (s + s) takes O(N), and .includes() (which uses Boyer-Moore or similar)
 *                  takes O(N + M) where M is the length of goal. Since N = M, it's O(N).
 * Space Complexity: O(N) to store the concatenated string (s + s).
 */

module.exports = rotateString;

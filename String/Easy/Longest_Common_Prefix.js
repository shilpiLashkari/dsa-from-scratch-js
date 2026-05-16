/**
 * Problem: Longest Common Prefix
 * Link: https://leetcode.com/problems/longest-common-prefix/
 * 
 * Time Complexity: O(S) - where S is the sum of all characters in all strings.
 * Space Complexity: O(1) - constant extra space.
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function(strs) {
    if (!strs || strs.length === 0) return "";

    // Vertical scanning
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        
        for (let j = 1; j < strs.length; j++) {
            // If the current index exceeds the length of the string
            // or the characters don't match, return the prefix found so far
            if (i === strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }

    return strs[0];
};

// --- Test Cases ---

const test = () => {
    const cases = [
        { strs: ["flower", "flow", "flight"], expected: "fl" },
        { strs: ["dog", "racecar", "car"], expected: "" },
        { strs: ["interview", "inter", "internal", "intermediate"], expected: "inter" },
        { strs: ["a"], expected: "a" },
        { strs: ["", "b"], expected: "" },
        { strs: ["ab", "a"], expected: "a" },
        { strs: ["cir", "car"], expected: "c" }
    ];

    cases.forEach(({ strs, expected }, index) => {
        const result = longestCommonPrefix(strs);
        console.assert(result === expected, `Test Case ${index + 1} Failed: strs=[${strs}], expected="${expected}", got="${result}"`);
        if (result === expected) {
            console.log(`Test Case ${index + 1} Passed!`);
        }
    });
};

test();

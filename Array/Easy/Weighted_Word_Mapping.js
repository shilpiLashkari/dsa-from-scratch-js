/**
 * Weighted Word Mapping (LeetCode 3838)
 *
 * Problem Statement:
 * You are given an array of strings `words` and an integer array `weights` of length 26,
 * where `weights[i]` represents the weight of the i-th lowercase English letter ('a' to 'z').
 *
 * For each word in `words`, we calculate its weight as the sum of the weights of its characters.
 * Then, we compute the remainder of this weight when divided by 26 (weight % 26).
 * Finally, we map this remainder to a lowercase letter in reverse alphabetical order:
 * - 0 -> 'z'
 * - 1 -> 'y'
 * - 2 -> 'x'
 * - ...
 * - 25 -> 'a'
 *
 * Return a string formed by concatenating the mapped characters for all words in the input order.
 *
 * Approach:
 * 1. For each word, sum the weights of its characters by looking up the weight of each character.
 *    Since characters are lowercase English letters, the index of char c is `c.charCodeAt(0) - 97`.
 * 2. Calculate `remainder = sum % 26`. Since weights are positive, the sum and remainder are non-negative.
 * 3. Map `remainder` to a character using the formula: `String.fromCharCode(122 - remainder)`.
 *    'z' has ASCII value 122. So, remainder 0 maps to 122 ('z'), remainder 25 maps to 97 ('a').
 * 4. Accumulate and return the resulting characters as a single string.
 *
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    let result = [];
    
    for (let i = 0; i < words.length; i++) {
        let sum = 0;
        let word = words[i];
        
        for (let j = 0; j < word.length; j++) {
            let charCode = word.charCodeAt(j) - 97; // 'a' is 97
            sum += weights[charCode];
        }
        
        let remainder = sum % 26;
        // Map 0 -> 'z' (ASCII 122), 25 -> 'a' (ASCII 97)
        let mappedChar = String.fromCharCode(122 - remainder);
        result.push(mappedChar);
    }
    
    return result.join('');
};

/*
 * Big O Complexity:
 * Time Complexity: O(L), where L is the total number of characters across all words in the input array.
 *                  We iterate through each character of each word exactly once.
 * Space Complexity: O(N) auxiliary space (excluding input/output) or O(N) to store the result list,
 *                   where N is the number of words.
 */

// ==========================================
// Test Cases
// ==========================================
console.log("Running Tests...");

// Helper for verifying tests
function runTest(words, weights, expected) {
    let output = mapWordWeights(words, weights);
    console.log(`Words: ${JSON.stringify(words)} | Expected: "${expected}" | Got: "${output}" | Passed: ${output === expected}`);
}

// Default weight mapping where each letter gets weight i + 1 (a = 1, b = 2, ...)
const defaultWeights = Array.from({ length: 26 }, (_, i) => i + 1);

// Test 1: Simple single letter words
// 'a' has weight 1. 1 % 26 = 1. 'z' - 1 = 'y'
// 'b' has weight 2. 2 % 26 = 2. 'z' - 2 = 'x'
runTest(["a", "b"], defaultWeights, "yx");

// Test 2: Word with sum equal to 26
// 'z' has weight 26. 26 % 26 = 0. 'z' - 0 = 'z'
runTest(["z"], defaultWeights, "z");

// Test 3: Multi-character words
// "abc" -> 'a'(1) + 'b'(2) + 'c'(3) = 6. 6 % 26 = 6. 122 - 6 = 116 ('t')
// "xyz" -> 'x'(24) + 'y'(25) + 'z'(26) = 75. 75 % 26 = 23. 122 - 23 = 99 ('c')
runTest(["abc", "xyz"], defaultWeights, "tc");

// Test 4: Custom weights
const customWeights = Array(26).fill(100); // All letters weigh 100
// "a" -> 100 % 26 = 22. 122 - 22 = 100 ('d')
runTest(["a", "aa"], customWeights, "dh"); // "aa" -> 200 % 26 = 18. 122 - 18 = 104 ('h')

console.log("All tests completed.");

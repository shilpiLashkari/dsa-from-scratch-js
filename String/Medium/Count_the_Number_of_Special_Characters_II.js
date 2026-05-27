/**
 * Problem: Count the Number of Special Characters II
 * 
 * You are given a string word. A letter is called special if it appears both in 
 * lowercase and uppercase in word.
 * 
 * However, a special letter is valid ONLY IF every occurrence of its lowercase 
 * form appears before the first occurrence of its uppercase form in word.
 * 
 * Return the number of special letters in word.
 * 
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const lastLower = new Map();
    const firstUpper = new Map();
    
    // Track the last occurrence of lowercase and the first occurrence of uppercase
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char >= 'a' && char <= 'z') {
            lastLower.set(char, i);
        } else if (char >= 'A' && char <= 'Z') {
            const lowerChar = char.toLowerCase();
            if (!firstUpper.has(lowerChar)) {
                firstUpper.set(lowerChar, i);
            }
        }
    }
    
    let specialCount = 0;
    // Count valid special characters
    for (const [char, lastIdx] of lastLower.entries()) {
        if (firstUpper.has(char) && lastIdx < firstUpper.get(char)) {
            specialCount++;
        }
    }
    
    return specialCount;
};

// --- Test Cases ---
console.log(numberOfSpecialChars("aaAbcBC")); // Output: 3 (Special characters are 'a', 'b', and 'c')
console.log(numberOfSpecialChars("abc")); // Output: 0 (No character appears in both lowercase and uppercase)
console.log(numberOfSpecialChars("abBCab")); // Output: 0 ('b' appears in lowercase after its uppercase form)
console.log(numberOfSpecialChars("aAbB")); // Output: 2

/**
 * --------------------------------------------------------------------
 * Time Complexity: O(N)
 * We iterate through the string of length N once. The map operations 
 * take O(1) time. The second loop runs at most 26 times, which is O(1).
 * Overall time complexity is O(N).
 * 
 * Space Complexity: O(1)
 * The maps `lastLower` and `firstUpper` will store at most 26 entries each,
 * so the space complexity is constant, O(1).
 * --------------------------------------------------------------------
 */
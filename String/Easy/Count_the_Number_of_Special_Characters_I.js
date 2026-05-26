/**
 * Problem: Count the Number of Special Characters I
 * 
 * You are given a string word. A letter is called special if it appears both in 
 * lowercase and uppercase in word.
 * 
 * Return the number of special letters in word.
 * 
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const lower = new Set();
    const upper = new Set();
    
    // Store lowercase and uppercase letters separately
    for (const char of word) {
        if (char >= 'a' && char <= 'z') {
            lower.add(char);
        } else if (char >= 'A' && char <= 'Z') {
            upper.add(char.toLowerCase());
        }
    }
    
    let specialCount = 0;
    // Count how many lowercase letters also appear in the uppercase set
    for (const char of lower) {
        if (upper.has(char)) {
            specialCount++;
        }
    }
    
    return specialCount;
};

// --- Test Cases ---
console.log(numberOfSpecialChars("aaAbcBC")); // Output: 3 (Special characters are 'a', 'b', and 'c')
console.log(numberOfSpecialChars("abc")); // Output: 0 (No character appears in both lowercase and uppercase)
console.log(numberOfSpecialChars("abBCab")); // Output: 1 (The only special character is 'b')

/**
 * --------------------------------------------------------------------
 * Time Complexity: O(N)
 * We iterate through the string of length N once, doing O(1) set operations.
 * The second loop runs at most 26 times, which is O(1).
 * Overall time complexity is O(N).
 * 
 * Space Complexity: O(1)
 * The sets `lower` and `upper` will store at most 26 letters each,
 * so the space complexity is constant, O(1).
 * --------------------------------------------------------------------
 */
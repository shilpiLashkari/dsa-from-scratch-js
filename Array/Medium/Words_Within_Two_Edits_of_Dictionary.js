/**
 * Words Within Two Edits of Dictionary
 * 
 * Strategy: Since all strings have the same length, an "edit" is defined as a character 
 * replacement at the same index. We iterate through each word in 'queries' and compare it 
 * with each word in 'dictionary'. For each pair, we count the number of differing characters. 
 * If we find any word in the dictionary that requires 2 or fewer edits to match the query 
 * word, that query word is included in the result.
 * 
 * Time Complexity: O(N * M * L) where N is the number of queries, M is the number of 
 * dictionary words, and L is the length of each word.
 * Space Complexity: O(1) as we only use a constant amount of extra space beyond the result array.
 */

/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
function twoEditWords(queries, dictionary) {
    const result = [];
    const wordLength = queries[0].length;

    for (const query of queries) {
        for (const word of dictionary) {
            let diffCount = 0;
            
            for (let i = 0; i < wordLength; i++) {
                if (query[i] !== word[i]) {
                    diffCount++;
                }
                
                // Early exit optimization: if differences exceed 2, this word is not a match
                if (diffCount > 2) break;
            }

            if (diffCount <= 2) {
                result.push(query);
                // We found a match for this query, no need to check other dictionary words
                break;
            }
        }
    }

    return result;
}

// Example Test Cases
console.log("Test 1:", twoEditWords(["word", "note", "ants", "wood"], ["wood", "joke", "moat"])); 
// Expected: ["word", "note", "wood"]

console.log("Test 2:", twoEditWords(["yes"], ["not"])); 
// Expected: []

module.exports = twoEditWords;

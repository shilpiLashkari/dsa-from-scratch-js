/**
 * Group Anagrams
 * 
 * Strategy: We use a Hash Map to group anagrams. 
 * For each string, we sort its characters to create a "key". 
 * All anagrams will have the same sorted key.
 * 
 * Time Complexity: O(N * K log K) where N is the number of strings and K is max length.
 * Space Complexity: O(N * K)
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();

    for (const str of strs) {
        const sorted = str.split("").sort().join("");
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }

    return Array.from(map.values());
}

// Example Test Case
console.log("Test 1:", groupAnagrams(["eat","tea","tan","ate","nat","bat"])); 
// Expected: [["eat","tea","ate"],["tan","nat"],["bat"]]

module.exports = groupAnagrams;

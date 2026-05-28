/**
 * 3093. Longest Common Suffix Queries
 * 
 * You are given two arrays of strings wordsContainer and wordsQuery.
 * 
 * For each wordsQuery[i], you need to find a string from wordsContainer that has the longest common suffix. 
 * If there are two or more strings in wordsContainer that share the longest common suffix, 
 * find the string that is the smallest in length. If there are two or more such strings that have 
 * the same smallest length, find the one that occurred earlier in wordsContainer.
 * 
 * Return an array of integers ans, where ans[i] is the index of the string in wordsContainer 
 * that has the longest common suffix with wordsQuery[i].
 * 
 * Approach: Suffix Trie
 * -------------------
 * We can solve this efficiently by building a Suffix Trie from `wordsContainer`. 
 * - Each node in the Trie will store the `bestIndex`, which represents the index of the "best" string 
 *   that passes through this node (or ends here). 
 * - The "best" string is determined by finding the string with the minimum length. 
 *   If lengths are equal, we pick the one with the smallest original index.
 * - For each word in `wordsContainer`, we insert it into the Trie in reverse order (suffix).
 * - For each word in `wordsQuery`, we search for its reverse in the Trie. We traverse as long as 
 *   characters match. The `bestIndex` at the last matched node is our answer for that query.
 * 
 * Time Complexity: 
 * O(L_c + L_q) where L_c is the sum of lengths of all strings in wordsContainer, 
 * and L_q is the sum of lengths of all strings in wordsQuery. 
 * Inserting takes O(L_c) and querying takes O(L_q).
 * 
 * Space Complexity: 
 * O(L_c) for storing the Suffix Trie nodes.
 */

class TrieNode {
    constructor() {
        // Map characters to TrieNode
        this.children = new Array(26).fill(null);
        this.bestIndex = -1; 
    }
}

class SuffixTrie {
    constructor(words) {
        this.root = new TrieNode();
        this.words = words;
    }

    // Helper method to determine if candidate index 'a' is better than current best 'b'
    isBetter(a, b) {
        if (b === -1) return true;
        
        const lenA = this.words[a].length;
        const lenB = this.words[b].length;
        
        if (lenA !== lenB) {
            return lenA < lenB;
        }
        return a < b;
    }

    insert(word, index) {
        let node = this.root;
        
        // Update root's bestIndex (for empty suffix match)
        if (this.isBetter(index, node.bestIndex)) {
            node.bestIndex = index;
        }

        // Insert word backwards
        for (let i = word.length - 1; i >= 0; i--) {
            const charCode = word.charCodeAt(i) - 97; // 'a' is 97
            
            if (node.children[charCode] === null) {
                node.children[charCode] = new TrieNode();
            }
            node = node.children[charCode];
            
            // Update node's bestIndex
            if (this.isBetter(index, node.bestIndex)) {
                node.bestIndex = index;
            }
        }
    }

    query(word) {
        let node = this.root;
        
        // Search backwards
        for (let i = word.length - 1; i >= 0; i--) {
            const charCode = word.charCodeAt(i) - 97;
            
            if (node.children[charCode] === null) {
                break;
            }
            node = node.children[charCode];
        }
        
        return node.bestIndex;
    }
}

/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function(wordsContainer, wordsQuery) {
    const trie = new SuffixTrie(wordsContainer);
    
    // Build Suffix Trie
    for (let i = 0; i < wordsContainer.length; i++) {
        trie.insert(wordsContainer[i], i);
    }
    
    const ans = [];
    // Process Queries
    for (let i = 0; i < wordsQuery.length; i++) {
        ans.push(trie.query(wordsQuery[i]));
    }
    
    return ans;
};

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    console.log("Running Tests for Longest Common Suffix Queries...");
    let passed = 0;
    
    const testCases = [
        {
            wordsContainer: ["abcd","bcd","xbcd"],
            wordsQuery: ["cd","bcd","xyz"],
            expected: [1,1,1]
        },
        {
            wordsContainer: ["abcdefgh","poiuygh","ghghgh"],
            wordsQuery: ["gh","acbfgh","acbfegh"],
            expected: [2,0,2]
        },
        {
            wordsContainer: ["a", "b", "c"],
            wordsQuery: ["a", "b", "c", "d"],
            expected: [0, 1, 2, 0]
        }
    ];

    testCases.forEach((test, index) => {
        const result = stringIndices(test.wordsContainer, test.wordsQuery);
        // Compare arrays
        const isMatch = result.length === test.expected.length && result.every((v, i) => v === test.expected[i]);
        
        if (isMatch) {
            console.log(`Test Case ${index + 1}: Passed`);
            passed++;
        } else {
            console.error(`Test Case ${index + 1}: Failed. Expected [${test.expected}], but got [${result}]`);
        }
    });

    console.log(`${passed}/${testCases.length} Test Cases Passed.`);
}

// Execute tests
runTests();

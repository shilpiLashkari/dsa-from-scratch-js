// Problem: Word Search II

// Given an m x n board of characters and a list of strings words, return all words on the board.
//
// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
//
// Example 1:
// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]
//
// Example 2:
// Input: board = [["a","b"],["c","d"]], words = ["abcb"]
// Output: []
//
// Constraints:
// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] is a lowercase English letter.
// 1 <= words.length <= 3 * 10^4
// 1 <= words[i].length <= 10
// words[i] consists of lowercase English letters.
// All the strings of words are unique.

// Solution:

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = (board, words) => {
    const result = [];
    const m = board.length;
    const n = board[0].length;

    // Build the Trie
    const root = {};
    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node[char]) node[char] = {};
            node = node[char];
        }
        node.word = word; // Mark end of word
    }

    const dfs = (r, c, node) => {
        const char = board[r][c];

        // Base case or pruning
        if (!node[char]) return;

        const nextNode = node[char];

        // Ensure we check for words at this node
        if (nextNode.word) {
            result.push(nextNode.word);
            nextNode.word = null;
            delete nextNode.word; // Remove property to help with pruning
        }

        // Mark as visited
        board[r][c] = '#';

        // Explore neighbors
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] !== '#') {
                dfs(nr, nc, nextNode);
            }
        }

        // Backtrack
        board[r][c] = char;

        // Optimization: Prune leaf nodes
        if (Object.keys(nextNode).length === 0) {
            delete node[char];
        }
    };

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            dfs(r, c, root);
        }
    }

    return result;
};

// Notes:
// Notes:
// - This problem feels like a standard DFS grid search, but with a twist: we have to find *multiple* words efficiently.
// - If we just ran a fresh DFS for every single word in the list, it would be way too slow (finding one word is O(N*M), repeating that for K words is huge).
// - The Game Changer: A Trie (Prefix Tree). Instead of searching for words one by one, we store all of them in a Trie.
// - Now, as we traverse the board, we just check: "Does this path exist in the Trie?" If not, stop immediately.
// - Optimization Magic: Once we find a word, we remove it from the Trie (or mark it found). This stops us from finding "oa" and "oath" separately if we don't need to, and keeps the Trie lean.
// - Also, I added a `delete` optimization. If a node becomes a leaf (no children) after removing a found word, we prune it from the Trie entirely. This keeps our search space getting smaller as we find more words!
// - Time Complexity: O(M*N * 4^L) in the worst case, but the Trie makes it much, much faster in practice.
// - Space Complexity: O(Sum of all characters in words) to build the Trie.

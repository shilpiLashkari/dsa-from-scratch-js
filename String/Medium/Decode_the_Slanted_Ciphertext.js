// Problem: Decode the Slanted Ciphertext (LeetCode 2075)
// Difficulty: Medium
// Pattern: String / Matrix Traversal (Slanted Cipher)

/**
 * A string originalText is encoded using a slanted transposition cipher into
 * encodedText using a matrix with a fixed number of rows.
 *
 * Encoding Process:
 * 1. originalText is placed into a matrix row by row, but in a diagonal manner (top-left to bottom-right).
 * 2. Empty cells are filled with spaces ' '.
 * 3. The number of columns is chosen such that the rightmost column is not empty.
 * 4. encodedText is formed by reading the matrix row by row.
 *
 * Your task is to decode the encodedText and return the originalText (without trailing spaces).
 *
 * Example 1:
 * Input: encodedText = "ch   ie   ", rows = 3
 * Output: "cipher"
 *
 * Example 2:
 * Input: encodedText = "iveo    eed   l l   ed", rows = 4
 * Output: "i love edeedlled"
 *
 * Constraints:
 * - 0 <= encodedText.length <= 10^6
 * - nr * nc == encodedText.length
 * - 1 <= rows <= 1000
 */

/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
const decodeCiphertext = (encodedText, rows) => {
    if (rows === 1) return encodedText.trimEnd();

    const n = encodedText.length;
    const cols = n / rows;
    let result = [];

    // The key insight:
    // A cell at (r, c) in the matrix corresponds to encodedText[r * cols + c].
    // The diagonals start at each column 'j' of the first row (r = 0).
    // For a starting column 'j', the diagonal elements are at (r, j + r).
    
    for (let j = 0; j < cols; j++) {
        for (let r = 0; r < rows; r++) {
            const c = j + r;
            if (c >= cols) break; // Diagonal goes out of bounds
            
            const index = r * cols + c;
            result.push(encodedText[index]);
        }
    }

    // Join and trim trailing spaces as per problem requirement
    return result.join('').trimEnd();
};

// Notes:
// - Time Complexity: O(N), where N is the length of encodedText. We visit each character at most once.
// - Space Complexity: O(N) to store the result array/string.
// - The mapping r * cols + c allows O(1) access to "matrix" elements without building the actual matrix.

module.exports = { decodeCiphertext };

// Problem: Determine Color of a Chessboard Square
// You are given coordinates, a string that represents the coordinates of a square of the chessboard. 
// Below is a chessboard for your reference.
// Return true if the square is white, and false if the square is black.

// Example 1:
// Input: coordinates = "a1"
// Output: false
// Explanation: From the chessboard, the square with coordinates "a1" is black, so return false.

// Example 2:
// Input: coordinates = "h3"
// Output: true
// Explanation: From the chessboard, the square with coordinates "h3" is white, so return true.

// Constraints:
// coordinates.length == 2
// 'a' <= coordinates[0] <= 'h'
// '1' <= coordinates[1] <= '8'

/**
 * @param {string} coordinates
 * @return {boolean}
 */
var squareIsWhite = function(coordinates) {
    let letterIndex = coordinates.charCodeAt(0) - 96; // 'a' is 97, so 'a' becomes 1
    let numberIndex = parseInt(coordinates[1]);
    
    // If we view the chessboard as a grid with 1-based indexing (e.g., a1 is (1, 1)):
    // - White squares appear where the sum of coordinates is odd.
    // - Black squares appear where the sum of coordinates is even.
    
    return (letterIndex + numberIndex) % 2 !== 0;
};

// Notes:
// - We can map 'a'-'h' to numbers 1-8.
// - The pattern of a chessboard dictates that squares where (column + row) is even are black.
// - Squares where (column + row) is odd are white.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { squareIsWhite };

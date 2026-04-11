// Problem: Count Square Sum Triples
// A square triple (a,b,c) is a triple where a, b, and c are integers and a^2 + b^2 = c^2.
// Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

// Example 1:
// Input: n = 5
// Output: 2
// Explanation: The square triples are (3,4,5) and (4,3,5).

// Example 2:
// Input: n = 10
// Output: 4
// Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

// Constraints:
// 1 <= n <= 250

/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function(n) {
    let count = 0;
    
    // We can iterate through all possible values of a and b.
    // For each pair, calculate a^2 + b^2 and check if it's a perfect square
    // whose square root is an integer c such that c <= n.
    for (let a = 1; a <= n; a++) {
        for (let b = 1; b <= n; b++) {
            let sumSq = a * a + b * b;
            let c = Math.floor(Math.sqrt(sumSq));
            
            if (c * c === sumSq && c <= n) {
                count++;
            }
        }
    }
    
    return count;
};

// Notes:
// - Since n <= 250, we can afford an O(N^2) solution.
// - We loop a and b from 1 to n.
// - Calculate c as the integer square root of a^2 + b^2.
// - Check if c is exact (c * c === sumSq) and if c is within bounds (c <= n).
// - Time Complexity: O(N^2)
// - Space Complexity: O(1)

module.exports = { countTriples };

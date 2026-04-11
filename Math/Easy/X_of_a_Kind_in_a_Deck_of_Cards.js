// Problem: X of a Kind in a Deck of Cards
// In a deck of cards, each card has an integer written on it.
// Return true if and only if you can choose X >= 2 such that it is possible to split the entire deck into 1 or more groups of cards, where:
// Each group has exactly X cards.
// All the cards in each group have the same integer.

// Example 1:
// Input: deck = [1,2,3,4,4,3,2,1]
// Output: true
// Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].

// Example 2:
// Input: deck = [1,1,1,2,2,2,3,3]
// Output: false
// Explanation: No possible partition.

// Constraints:
// 1 <= deck.length <= 10^4
// 0 <= deck[i] < 10^4

/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
    const map = new Map();
    for (let card of deck) {
        map.set(card, (map.get(card) || 0) + 1);
    }
    
    let g = -1;
    for (let count of map.values()) {
        if (g === -1) {
            g = count;
        } else {
            g = gcd(g, count);
        }
    }
    
    return g >= 2;
};

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Notes:
// - Count the frequencies of each card.
// - Find the greatest common divisor (GCD) of all frequencies.
// - If the GCD is >= 2, then we can form groups of size GCD.
// - Time Complexity: O(N log(min(frequencies)))
// - Space Complexity: O(N) for the frequency map.

module.exports = { hasGroupsSizeX };

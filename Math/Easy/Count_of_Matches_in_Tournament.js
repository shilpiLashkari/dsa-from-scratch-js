// Problem: Count of Matches in Tournament
// You are given an integer n, the number of teams in a tournament that has strange rules:
// If the current number of teams is even, each team gets paired with another team. 
// A total of n / 2 matches are played, and n / 2 teams advance to the next round.
// If the current number of teams is odd, one team randomly advances in the tournament, and the rest gets paired. 
// A total of (n - 1) / 2 matches are played, and (n - 1) / 2 + 1 teams advance to the next round.
// Return the number of matches played in the tournament until a winner is decided.

// Example 1:
// Input: n = 7
// Output: 6
// Explanation: Details of the tournament: 
// - 1st Round: Teams = 7, Matches = 3, and 4 teams advance.
// - 2nd Round: Teams = 4, Matches = 2, and 2 teams advance.
// - 3rd Round: Teams = 2, Matches = 1, and 1 team advances.
// Total matches = 3 + 2 + 1 = 6.

// Example 2:
// Input: n = 14
// Output: 13

// Constraints:
// 1 <= n <= 200

/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function(n) {
    // Mathematical approach:
    // To decide one winner out of n teams, n - 1 teams must be eliminated.
    // Each match eliminates exactly one team.
    // Therefore, to eliminate n - 1 teams, there must be exactly n - 1 matches played.
    
    return n - 1;
};

// Notes:
// - Simulation is possible, but logic provides an O(1) solution.
// - In a single elimination tournament, every match eliminates exactly one team.
// - To get 1 winner, we need to eliminate N-1 teams.
// - Therefore, we need exactly N-1 matches.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { numberOfMatches };

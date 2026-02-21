// Problem: Candy

// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
// You are giving candies to these children subjected to the following requirements:
// 1. Each child must have at least one candy.
// 2. Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.

// Example 1:
// Input: ratings = [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

// Example 2:
// Input: ratings = [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

// Constraints:
// n == ratings.length
// 1 <= n <= 2 * 10^4
// 0 <= ratings[i] <= 2 * 10^4

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = (ratings) => {
    const n = ratings.length;
    if (n <= 1) return n;

    // Each child must have at least one candy
    const candies = new Array(n).fill(1);

    // Left-to-right pass:
    // If a child has a higher rating than the left neighbor, 
    // they must have more candies than the left neighbor.
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right-to-left pass:
    // If a child has a higher rating than the right neighbor,
    // they must have more candies than the right neighbor.
    // We take the max to satisfy both left and right conditions.
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Sum up the candies
    return candies.reduce((total, count) => total + count, 0);
};

// Notes:
// - This is a classic Greedy algorithm problem.
// - The "neighbors" condition means we need to compare each child with both left and right.
// - A single pass isn't enough because a change on the right might necessitate a change on the left.
// - Two passes (left-to-right and right-to-left) ensure that every child's candy count 
//   satisfies the condition relative to both neighbors.
// - In the first pass, we only care about the left neighbor.
// - In the second pass, we only care about the right neighbor, but we use Math.max to 
//   avoid breaking the condition established by the first pass.
// - Time Complexity: O(n) where n is the number of children (two passes).
// - Space Complexity: O(n) to store the candies array.
// - This approach is very efficient and handles the "equal rating" case correctly 
//   (the problem says "higher rating", so if ratings are equal, they don't *need* more candies).

module.exports = { candy };

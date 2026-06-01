/**
 * 2144. Minimum Cost of Buying Candies With Discount
 * 
 * Problem: A shop is selling candies at a discount. For every two candies sold, the shop gives a third candy for free.
 * The customer can choose any candy to take for free, but the price of the free candy must be less than or equal to the minimum price of the two candies bought.
 * Return the minimum cost of buying all the candies.
 * 
 * Approach: Greedy + Sorting
 * To minimize the total cost, we want the most expensive items to be free. 
 * Therefore, we should sort the array in descending order, buy the 1st and 2nd most expensive candies, 
 * and get the 3rd most expensive for free. Then continue this pattern for the remaining candies.
 *
 * Time Complexity: O(N log N) - Where N is the number of candies. Sorting takes O(N log N) time. 
 * Space Complexity: O(1) or O(N) - Depending on the sorting algorithm implementation in the JS engine.
 *
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function(cost) {
    // Sort costs in descending order
    cost.sort((a, b) => b - a);
    
    let totalCost = 0;
    
    // Add cost of candies, skipping every 3rd candy (which is free)
    for (let i = 0; i < cost.length; i++) {
        if ((i + 1) % 3 !== 0) {
            totalCost += cost[i];
        }
    }
    
    return totalCost;
};

// --- Test Cases ---
console.log(minimumCost([1, 2, 3])); // Expected: 5 (Buy 2 and 3, get 1 for free. Cost: 2 + 3 = 5)
console.log(minimumCost([6, 5, 7, 9, 2, 2])); // Expected: 23 (Buy 9, 7, get 6 free. Buy 5, 2, get 2 free. Cost: 9 + 7 + 5 + 2 = 23)
console.log(minimumCost([5, 5])); // Expected: 10 (Buy 5, 5. Not enough for free candy. Cost: 5 + 5 = 10)

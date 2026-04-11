// Problem: Water Bottles
// There are numBottles water bottles that are initially full of water. You can exchange numExchange empty water bottles from the market with one full water bottle.
// The operation of drinking a full water bottle turns it into an empty bottle.
// Given the two integers numBottles and numExchange, return the maximum number of water bottles you can drink.

// Example 1:
// Input: numBottles = 9, numExchange = 3
// Output: 13
// Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
// Number of water bottles you can drink: 9 + 3 + 1 = 13.

// Example 2:
// Input: numBottles = 15, numExchange = 4
// Output: 19
// Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
// Number of water bottles you can drink: 15 + 3 + 1 = 19.

// Constraints:
// 1 <= numBottles <= 100
// 2 <= numExchange <= 100

/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function(numBottles, numExchange) {
    let totalDrunk = numBottles;
    let emptyBottles = numBottles;

    while (emptyBottles >= numExchange) {
        let newBottles = Math.floor(emptyBottles / numExchange);
        totalDrunk += newBottles;
        emptyBottles = newBottles + (emptyBottles % numExchange);
    }

    return totalDrunk;
};

// Notes:
// - Initially, you drink all 'numBottles', resulting in 'numBottles' empty bottles.
// - Then, you repeatedly exchange your empty bottles for full ones.
// - You get floor(empty / exchange) new bottles, drink them, and add to the empty count the remainders + new bottles just drunk.
// - You can also solve this mathematically in O(1): numBottles + floor((numBottles - 1) / (numExchange - 1))
// - Time Complexity: O(log_{numExchange}(numBottles)) for simulation, or O(1) mathematically.
// - Space Complexity: O(1)

module.exports = { numWaterBottles };

// Problem: Largest Rectangle in Histogram

// Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
//
// Example 1:
// Input: heights = [2,1,5,6,2,3]
// Output: 10
// Explanation: The above is a histogram where width of each bar is 1.
// The largest rectangle is shown in the red area, which has an area = 10 units.
//
// Example 2:
// Input: heights = [2,4]
// Output: 4
//
// Constraints:
// 1 <= heights.length <= 10^5
// 0 <= heights[i] <= 10^4

// Solution:

/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = (heights) => {
    // We'll use a stack to keep track of increasing heights. 
    // The stack will store indices, not values, because we need width.
    const stack = [];
    let maxArea = 0;

    // We iterate through the heights, including one extra iteration with height 0
    // to ensure any remaining bars in the stack are processed at the end.
    for (let i = 0; i <= heights.length; i++) {
        // Use 0 as the height for the last iteration (virtual bar)
        // Otherwise, use the current height
        const currentHeight = i === heights.length ? 0 : heights[i];

        // While the stack is not empty AND the current bar is shorter than the bar at the top of the stack:
        // This means we've found the right boundary for the rectangle with the height of the bar at stack top.
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()]; // Get height of the bar we're processing
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1; // Calculate width

            // Explanation of width calculation:
            // 'i' is the Right Boundary (exclusive).
            // 'stack[stack.length - 1]' is the Left Boundary (exclusive) after popping.
            // If stack is empty after pop, it means the popped bar was the smallest so far, 
            // so it extends all the way to the left (width = i).

            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
};

// Notes:
// - So, here's the deal with this problem. The brute force way is to check every pair of bars, which takes forever (O(n^2)). We need something faster.
// - The "Monotonic Stack" approach is the game changer here. It sounds fancy, but it's just a stack where we keep elements in a specific order (increasing height, in this case).
// - Think of it like this: for any bar, we want to know, "How far left and right can I expand before I hit a shorter bar?"
// - When we're scanning through the list and see a bar that's taller than the previous one, we don't know its right boundary yet, so we just add it to our stack (put it on hold).
// - The magic happens when we encounter a BAR SHORTER than the one at the top of our stack. This is our "Aha!" moment.
// - This shorter bar acts as a STOP sign (the right boundary) for the tall bar sitting on the stack because the rectangle can't extend past it.
// - So, we pop that tall bar off and calculate its area. We already know its left boundary (it's simply the index of the *next* element in the stack below it).
// - We keep doing this until the stack is "clean" (elements are in increasing order again) and then push the current bar.
// - We add a "0" height at the very end just to force everything remaining in the stack to pop out and be calculated.
// - Complexity? Since we push and pop every element at most once, it runs in O(n) time. Super efficient!

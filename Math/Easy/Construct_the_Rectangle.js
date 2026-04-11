// Problem: Construct the Rectangle
// A web developer needs to design a rectangular web page's size, given a specific area. 
// The area must be the product of length L and width W, where L >= W and L - W should be as small as possible.
// Given the area, return an array [L, W] that meets the requirements.

// Example 1:
// Input: area = 4
// Output: [2, 2]

// Example 2:
// Input: area = 37
// Output: [37, 1]

// Example 3:
// Input: area = 122122
// Output: [427, 286]

// Constraints:
// 1 <= area <= 10^7

/**
 * @param {number} area
 * @return {number[]}
 */
var constructRectangle = function (area) {
    // We want L * W = area, L >= W, and L - W is minimized.
    // L - W is minimized when W is as close to Math.sqrt(area) as possible.
    // Therefore, we start W from Math.floor(Math.sqrt(area)) and decrement until we find a divisor.
    let w = Math.floor(Math.sqrt(area));

    while (area % w !== 0) {
        w--;
    }

    return [area / w, w];
};

// Notes:
// - The conditions imply that L and W should be close to each other.
// - The closest L and W can get is when both are equal to Math.sqrt(area).
// - We start searching for W from floor(sqrt(area)) downwards to ensure W <= L and minimize L-W.
// - Time Complexity: O(sqrt(Area))
// - Space Complexity: O(1)

module.exports = { constructRectangle };

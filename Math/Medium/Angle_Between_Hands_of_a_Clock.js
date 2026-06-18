// Problem: Angle Between Hands of a Clock
// Given the hour and minutes on a clock, return the smallest angle between the hour hand and the minute hand.

// Example 1:
// Input: hour = 12, minutes = 30
// Output: 165

// Example 2:
// Input: hour = 3, minutes = 30
// Output: 75

// Example 3:
// Input: hour = 3, minutes = 15
// Output: 7.5

// Constraints:
// - 1 <= hour <= 12
// - 0 <= minutes < 60

/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function(hour, minutes) {
    // Minute hand: 360 degrees / 60 minutes = 6 degrees per minute.
    const minuteAngle = minutes * 6;
    // Hour hand: 360 degrees / 12 hours = 30 degrees per hour,
    // plus 0.5 degrees per minute of movement.
    const hourAngle = (hour % 12) * 30 + minutes * 0.5;

    const difference = Math.abs(hourAngle - minuteAngle);
    // We want the smaller angle between the two hands.
    return Math.min(difference, 360 - difference);
};

// Notes:
// - Use modular arithmetic for the hour hand so 12 maps to 0.
// - The minute hand moves 6 degrees per minute.
// - The hour hand moves 30 degrees per hour and 0.5 degrees per minute.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { angleClock };

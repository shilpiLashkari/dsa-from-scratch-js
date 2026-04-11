// Problem: Count Days Spent Together
// Alice and Bob are traveling to Rome for separate business meetings.
// You are given 4 strings arriveAlice, leaveAlice, arriveBob, and leaveBob. Alice will be in the city from the dates arriveAlice to leaveAlice (inclusive), while Bob will be in the city from the dates arriveBob to leaveBob (inclusive). Each will be a 5-character string in the format "MM-DD", corresponding to the month and day of the date.
// Return the total number of days that Alice and Bob are in Rome together.
// You can assume that all dates occur in the same calendar year, which is not a leap year. Some months have 31 days, some have 30, and February has 28.

// Example 1:
// Input: arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
// Output: 3
// Explanation: Alice will be in Rome from August 15 to August 18. Bob will be in Rome from August 16 to August 19. They are both in Rome together on August 16th, 17th, and 18th, so the answer is 3.

// Example 2:
// Input: arriveAlice = "10-01", leaveAlice = "10-31", arriveBob = "11-01", leaveBob = "12-31"
// Output: 0
// Explanation: There is no single day that Alice and Bob are in Rome together, so we return 0.

// Constraints:
// All dates are provided in the format "MM-DD".
// Alice and Bob's arrival dates are earlier than or equal to their leaving dates.
// The given dates are valid dates of a non-leap year.

/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Function to convert "MM-DD" to the day of the year (1 to 365)
    const dayOfYear = (dateStr) => {
        let [month, day] = dateStr.split('-').map(Number);
        let count = 0;
        for (let i = 1; i < month; i++) {
            count += daysInMonth[i];
        }
        return count + day;
    };
    
    let aArrive = dayOfYear(arriveAlice);
    let aLeave = dayOfYear(leaveAlice);
    let bArrive = dayOfYear(arriveBob);
    let bLeave = dayOfYear(leaveBob);
    
    // Calculate the overlap: max of arrivals vs min of departures
    let arriveOverlap = Math.max(aArrive, bArrive);
    let leaveOverlap = Math.min(aLeave, bLeave);
    
    if (arriveOverlap <= leaveOverlap) {
        return leaveOverlap - arriveOverlap + 1;
    }
    
    return 0;
};

// Notes:
// - We can convert any date "MM-DD" into a single integer representing the day of the year (1-365).
// - Once converted to integer ranges [startA, endA] and [startB, endB], finding the overlap is straightforward.
// - Overlap = Math.min(endA, endB) - Math.max(startA, startB) + 1.
// - Time Complexity: O(1) computationally, strings have fixed length of 5.
// - Space Complexity: O(1)

module.exports = { countDaysTogether };

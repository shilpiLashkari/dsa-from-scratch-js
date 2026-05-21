/**
 * 💡 Problem: Find the Length of the Longest Common Prefix
 * 
 * You are given two arrays with positive integers arr1 and arr2.
 * A prefix of a positive integer is an integer formed by one or more of its digits, 
 * starting from its leftmost digit. For example, 123 is a prefix of the integer 12345, 
 * while 234 is not.
 * 
 * A common prefix of two integers a and b is an integer c, such that c is a prefix of both a and b.
 * For example, 5655359 and 56554 have a common prefix 5655 while 1223 and 43456 do not have a common prefix.
 * 
 * You need to find the length of the longest common prefix between all pairs of integers 
 * (x, y) such that x belongs to arr1 and y belongs to arr2.
 * 
 * Return the length of the longest common prefix among all pairs. If no common prefix exists among them, return 0.
 * 
 * 🚀 Approach: Hash Set
 * 
 * 1. Initialize a Set `prefixes` to store all possible prefixes of numbers in `arr1`.
 * 2. Iterate through `arr1`. For each number, repeatedly divide by 10 to extract all prefixes and add them to the set.
 * 3. Initialize `maxLength` to 0.
 * 4. Iterate through `arr2`. For each number, repeatedly divide by 10 to extract its prefixes.
 * 5. Check if the current prefix exists in the `prefixes` set.
 *    - If it does, calculate the length of the prefix (convert to string and get length).
 *    - Update `maxLength` if the current length is greater.
 *    - Break out of the inner loop, as the first match found by dividing by 10 is the longest possible for this number.
 * 6. Return `maxLength`.
 * 
 * ⏱️ Time Complexity: O(N * log10(M) + K * log10(M)) where N is length of arr1, K is length of arr2, 
 *    and M is the maximum element. Extracting prefixes takes log10(M) operations per number.
 * 💾 Space Complexity: O(N * log10(M)) to store the prefixes in the Hash Set.
 * 
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function(arr1, arr2) {
    const prefixes = new Set();
    
    // Step 1: Add all prefixes of numbers in arr1 to the Set
    for (let x of arr1) {
        while (x > 0) {
            prefixes.add(x);
            x = Math.floor(x / 10);
        }
    }
    
    let maxLength = 0;
    
    // Step 2: Check prefixes of numbers in arr2
    for (let y of arr2) {
        while (y > 0) {
            if (prefixes.has(y)) {
                maxLength = Math.max(maxLength, y.toString().length);
                break; // Found the longest common prefix for this number, move to the next y
            }
            y = Math.floor(y / 10);
        }
    }
    
    return maxLength;
};

// ==========================================
// Test Cases
// ==========================================
console.log("Test Case 1: ", longestCommonPrefix([1, 10, 100], [1000])); // Expected output: 3
console.log("Test Case 2: ", longestCommonPrefix([1, 2, 3], [4, 4, 4])); // Expected output: 0
console.log("Test Case 3: ", longestCommonPrefix([13, 27, 45], [21, 27, 48])); // Expected output: 2 (from 27)
console.log("Test Case 4: ", longestCommonPrefix([100000000], [100000000])); // Expected output: 9

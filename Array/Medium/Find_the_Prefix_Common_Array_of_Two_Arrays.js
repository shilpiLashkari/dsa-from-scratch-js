/**
 * Problem: Find the Prefix Common Array of Two Arrays
 * 
 * Given two 0-indexed integer permutations A and B of length n.
 * A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers 
 * that are present at or before the index i in both A and B.
 * 
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function(A, B) {
    const n = A.length;
    const C = new Array(n);
    const freq = new Array(n + 1).fill(0);
    let commonCount = 0;
    
    for (let i = 0; i < n; i++) {
        freq[A[i]]++;
        if (freq[A[i]] === 2) {
            commonCount++;
        }
        
        freq[B[i]]++;
        if (freq[B[i]] === 2) {
            commonCount++;
        }
        
        C[i] = commonCount;
    }
    
    return C;
};

/*
 * ==========================================
 * Time and Space Complexity Analysis
 * ==========================================
 *
 * Time Complexity: O(n)
 * We iterate through the arrays A and B exactly once. Each iteration performs O(1) operations.
 *
 * Space Complexity: O(n)
 * We use a frequency array `freq` of size n + 1, and the result array `C` of size n.
 * Thus, the space complexity is O(n).
 */

// ==========================================
// Test Cases
// ==========================================
console.log("Test Case 1:");
console.log("Expected: [0, 2, 3, 4], Actual:", findThePrefixCommonArray([1,3,2,4], [3,1,2,4]));

console.log("\nTest Case 2:");
console.log("Expected: [0, 1, 3], Actual:", findThePrefixCommonArray([2,3,1], [3,1,2]));

console.log("\nTest Case 3:");
console.log("Expected: [1], Actual:", findThePrefixCommonArray([1], [1]));

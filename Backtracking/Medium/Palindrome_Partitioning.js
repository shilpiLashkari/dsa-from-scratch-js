/**
 * Palindrome Partitioning
 * 
 * Strategy: We use backtracking to find all possible partitions.
 * 1. Try all possible prefixes of the current string.
 * 2. If a prefix is a palindrome, add it to the current partition and 
 *    recurse for the remaining suffix.
 * 3. If we reach the end of the string, save the partition.
 * 
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N) for recursion stack.
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
    const res = [];

    function backtrack(start, currentPath) {
        if (start === s.length) {
            res.push([...currentPath]);
            return;
        }

        for (let end = start + 1; end <= s.length; end++) {
            const segment = s.substring(start, end);
            if (isPalindrome(segment)) {
                currentPath.push(segment);
                backtrack(end, currentPath);
                currentPath.pop();
            }
        }
    }

    function isPalindrome(str) {
        let l = 0, r = str.length - 1;
        while (l < r) {
            if (str[l] !== str[r]) return false;
            l++;
            r--;
        }
        return true;
    }

    backtrack(0, []);
    return res;
}

// Example Test Case
console.log("Test 1:", partition("aab")); // [["a","a","b"],["aa","b"]]

module.exports = partition;

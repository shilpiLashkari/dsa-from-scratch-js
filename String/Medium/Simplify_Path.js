/**
 * Simplify Path
 * 
 * Strategy: We use a stack to process the path components.
 * 1. Split the path by '/'.
 * 2. Iterate through the components:
 *    - If empty string or '.', skip.
 *    - If '..', pop from the stack (move up a directory).
 *    - Otherwise, push the component to the stack.
 * 3. Join the stack elements with '/' and prepend a '/'.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
    const stack = [];
    const parts = path.split("/");

    for (const part of parts) {
        if (part === "" || part === ".") {
            continue;
        } else if (part === "..") {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }

    return "/" + stack.join("/");
}

// Example Test Case
console.log("Test 1:", simplifyPath("/home/"));      // Expected: "/home"
console.log("Test 2:", simplifyPath("/../"));       // Expected: "/"
console.log("Test 3:", simplifyPath("/home//foo/")); // Expected: "/home/foo"

module.exports = simplifyPath;

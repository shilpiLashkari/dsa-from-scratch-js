/**
 * Process String with Special Operations I
 *
 * Supported operations (common convention):
 * - '<' : move cursor one position to the left (if possible)
 * - '>' : move cursor one position to the right (if possible)
 * - '-' : backspace (delete character to the left of the cursor, if any)
 * - any other character: insert at cursor position
 *
 * Strategy: simulate a text editor cursor using two stacks:
 * - `left` holds characters to the left of the cursor (left[0] is start)
 * - `right` holds characters to the right of the cursor (top is immediate right)
 * Process each character and update stacks accordingly. Final string is
 * left.join('') + reversed(right).join('').
 *
 * Time: O(n), Space: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
function processString(s) {
	const left = [];
	const right = [];
	for (const ch of s) {
		if (ch === '<') {
			if (left.length) right.push(left.pop());
		} else if (ch === '>') {
			if (right.length) left.push(right.pop());
		} else if (ch === '-') {
			if (left.length) left.pop();
		} else {
			left.push(ch);
		}
	}
	return left.join('') + right.reverse().join('');
}

// Example tests
console.log(processString("abc<de-<f>g"));
// Manual explanation of the above: this is just a sanity check; adjust as needed.

console.log(processString("a<b-c>d"));

module.exports = processString;

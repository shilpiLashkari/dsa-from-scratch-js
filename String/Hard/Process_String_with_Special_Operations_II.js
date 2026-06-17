/**
 * Process String with Special Operations II
 *
 * Problem rules:
 * - lowercase letters append to result.
 * - '*' deletes the last character of result if it exists.
 * - '#' duplicates the current result and appends it to itself.
 * - '%' reverses the current result.
 *
 * Return the k-th character of the final result (0-based), or '.' if k is out of bounds.
 *
 * This implementation avoids constructing the full expanded string by tracking
 * result lengths and tracing the requested index backwards through the operations.
 *
 * Time Complexity: O(n) for length tracking plus O(n) backward tracing.
 * Space Complexity: O(n).
 */

/**
 * @param {string} s
 * @param {number | bigint} k
 * @return {string}
 */
function processString(s, k) {
    if (typeof k === 'number') {
        k = BigInt(k);
    }

    const ops = [];
    let length = 0n;

    for (const ch of s) {
        if (ch === '*') {
            const prev = length;
            length = prev > 0n ? prev - 1n : 0n;
            ops.push({ type: '*', prevLength: prev });
        } else if (ch === '#') {
            const prev = length;
            length = prev * 2n;
            ops.push({ type: '#', prevLength: prev });
        } else if (ch === '%') {
            const prev = length;
            ops.push({ type: '%', prevLength: prev });
        } else {
            const prev = length;
            length = prev + 1n;
            ops.push({ type: 'c', ch, prevLength: prev });
        }
        lengths.push(length);
    }

    if (k < 0n || k >= length) {
        return '.';
    }

    let idx = k;
    for (let i = ops.length - 1; i >= 0; i--) {
        const op = ops[i];
        switch (op.type) {
            case 'c': {
                if (idx === op.prevLength) {
                    return op.ch;
                }
                // if idx < prevLength, it stays in prior state
                break;
            }
            case '*': {
                // '*' removes the last character from prev result.
                // if idx < length after op, it maps directly to prior idx.
                break;
            }
            case '#': {
                if (idx >= op.prevLength) {
                    idx -= op.prevLength;
                }
                break;
            }
            case '%': {
                idx = op.prevLength - 1n - idx;
                break;
            }
            default:
                break;
        }
    }

    return '.';
}

// Example tests
console.log(processString('a#b%*', 1)); // expected 'a'
console.log(processString('cd%#*#', 3)); // expected 'd'
console.log(processString('abc#%', 4)); // expected '.' if out of bounds or char at index

module.exports = processString;

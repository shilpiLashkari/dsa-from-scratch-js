//Problem : Text Justification

// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left-justified, and no extra space is inserted between words.

// Example 1:
// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
// Output: [
//    "This    is    an",
//    "an  example  of",
//    "text  justification."
// ]

// Example 2:
// Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
// Output: [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]

// Example 3:
// Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer."], maxWidth = 20
// Output: [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  "
// ]

// Constraints:
// 1 <= words.length <= 300
// 1 <= words[i].length <= 20
// words[i] consists of only English letters and spaces.
// 1 <= maxWidth <= 100
// words[i].length <= maxWidth

// Solution:

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = (words, maxWidth) => {
    const result = [];
    let i = 0;
    const n = words.length;

    while (i < n) {
        let lineWords = [];
        let currentLength = 0;
        let j = i;

        while (j < n && (currentLength + words[j].length + lineWords.length) <= maxWidth) {
            lineWords.push(words[j]);
            currentLength += words[j].length;
            j++;
        }

        const numWords = lineWords.length;
        const totalSpaces = maxWidth - currentLength;
        const isLastLine = (j === n);
        const isSingleWord = (numWords === 1);

        let line = "";

        if (isLastLine || isSingleWord) {
            line = lineWords.join(" ");
            line += " ".repeat(maxWidth - line.length);
        }
        else {
            const numGaps = numWords - 1;
            const baseSpaces = Math.floor(totalSpaces / numGaps);
            const extraSpaces = totalSpaces % numGaps;

            for (let k = 0; k < numWords; k++) {
                line += lineWords[k];

                if (k < numWords - 1) {
                    let spacesToAdd = baseSpaces;
                    if (k < extraSpaces) {
                        spacesToAdd++;
                    }
                    line += " ".repeat(spacesToAdd);
                }
            }
        }

        result.push(line);
        i = j; 
    }

    return result;
};

// Notes:
// - The problem requires careful handling of spaces and edge cases.
// - We iterate through the words and greedily pack as many as possible onto each line.
// - The key is to distinguish between middle lines (fully justified) and the last line or single-word lines (left justified).
// - For fully justified lines, we calculate the base number of spaces and distribute any extra spaces one by one from left to right.
// - This approach ensures that spaces are distributed as evenly as possible, with extra spaces going to the left gaps first.
// - Time Complexity: O(n) - we process each word a constant number of times.
// - Space Complexity: O(n) - to store the result (in the worst case, each word is on its own line).

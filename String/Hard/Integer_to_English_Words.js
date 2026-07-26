/**
 * LeetCode 273: Integer to English Words
 *
 * Convert each three-digit chunk independently and append its thousand-scale
 * name.
 *
 * Time Complexity: O(log num)
 * Space Complexity: O(log num)
 */

const BELOW_TWENTY = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const SCALES = ["", "Thousand", "Million", "Billion"];

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
  if (num === 0) return "Zero";

  const convertChunk = (value) => {
    const words = [];

    if (value >= 100) {
      words.push(BELOW_TWENTY[Math.floor(value / 100)], "Hundred");
      value %= 100;
    }

    if (value >= 20) {
      words.push(TENS[Math.floor(value / 10)]);
      value %= 10;
    }

    if (value > 0) words.push(BELOW_TWENTY[value]);
    return words.join(" ");
  };

  const groups = [];
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;

    if (chunk > 0) {
      const words = convertChunk(chunk);
      groups.unshift(SCALES[scaleIndex] ? `${words} ${SCALES[scaleIndex]}` : words);
    }

    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return groups.join(" ");
};

module.exports = { numberToWords };

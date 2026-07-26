/**
 * LeetCode 282: Expression Add Operators
 *
 * Split the digit string into operands and backtrack over +, -, and *. Track the
 * last multiplicative term so multiplication can replace it in the running sum.
 *
 * Time Complexity: O(4^n)
 * Space Complexity: O(n), excluding the output
 */

/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
var addOperators = function (num, target) {
  const expressions = [];

  const search = (index, expression, value, lastTerm) => {
    if (index === num.length) {
      if (value === target) expressions.push(expression);
      return;
    }

    for (let end = index; end < num.length; end++) {
      if (end > index && num[index] === "0") break;

      const token = num.slice(index, end + 1);
      const operand = Number(token);

      if (index === 0) {
        search(end + 1, token, operand, operand);
      } else {
        search(end + 1, `${expression}+${token}`, value + operand, operand);
        search(end + 1, `${expression}-${token}`, value - operand, -operand);
        search(
          end + 1,
          `${expression}*${token}`,
          value - lastTerm + lastTerm * operand,
          lastTerm * operand,
        );
      }
    }
  };

  search(0, "", 0, 0);
  return expressions;
};

module.exports = { addOperators };

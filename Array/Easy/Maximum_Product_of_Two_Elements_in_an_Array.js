function maxProduct(nums) {
  let largest = 0;
  let secondLargest = 0;

  for (const number of nums) {
    if (number >= largest) {
      secondLargest = largest;
      largest = number;
    } else if (number > secondLargest) {
      secondLargest = number;
    }
  }

  return (largest - 1) * (secondLargest - 1);
}

module.exports = { maxProduct };

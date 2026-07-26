/**
 * 801. Minimum Swaps To Make Sequences Increasing
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function minSwap(nums1, nums2) {
  let keep = 0;
  let swap = 1;

  for (let index = 1; index < nums1.length; index += 1) {
    let nextKeep = Number.POSITIVE_INFINITY;
    let nextSwap = Number.POSITIVE_INFINITY;

    if (
      nums1[index - 1] < nums1[index]
      && nums2[index - 1] < nums2[index]
    ) {
      nextKeep = keep;
      nextSwap = swap + 1;
    }

    if (
      nums1[index - 1] < nums2[index]
      && nums2[index - 1] < nums1[index]
    ) {
      nextKeep = Math.min(nextKeep, swap);
      nextSwap = Math.min(nextSwap, keep + 1);
    }

    keep = nextKeep;
    swap = nextSwap;
  }

  return Math.min(keep, swap);
}

module.exports = { minSwap };

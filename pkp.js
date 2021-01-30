/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
    let newNums = [...nums].sort((a, b) => a - b)
    return JSON.stringify(nums) ===JSON.stringify(newNums)
};
isStraight([1, 2, 3, 4,5])
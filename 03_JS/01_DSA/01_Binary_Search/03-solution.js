// Pseudocode:
// Initialize the left and right index of search space
// Calc the mid index of array and find the mid elem
// if target is > mid then search right half - update left index to mid + 1
// if target < mid then search left half - update right index to mid - 1
// if target = mid then return index of mid
// repeat till we complete the search - while left <= right
// return -1 if not found
const binarySearch = (arr, target) => {
  // Initialize the left and right index of search space
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  // repeat till we complete the search - while left <= right
  while (leftIdx <= rightIdx) {
    // Calc the mid index of array and find the mid elem
    const midIdx = Math.floor((leftIdx + rightIdx) / 2);
    // if target is > mid then search right half - update left index to mid + 1
    if (target > arr[midIdx]) {
      leftIdx += 1;
    } else if (target < arr[midIdx]) {
      // if target < mid then search left half - update right index to mid - 1
      rightIdx -= 1;
    } else {
      // if target = mid then return index of mid
      return midIdx;
    }
  }
  // return -1 if not found
  return -1;
};

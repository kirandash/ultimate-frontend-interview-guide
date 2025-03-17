// Pseudocode:
// Initialize the left and right index of search space
// Calc the mid index of array and find the mid elem
// if target is > mid then search right half - update left index to mid + 1
// if target < mid then search left half - update right index to mid - 1
// if target = mid then return index of mid
// repeat till we complete the search - while left <= right
// return -1 if not found
const binarySearch = (arr, target) => {
  return binarySearchRecursive(arr, target, 0, arr.length - 1);
};

// Recursion - Pseudocode
// Short circuit the loop when leftIdx > rightIdx
const binarySearchRecursive = (arr, target, leftIdx, rightIdx) => {
  // Short circuit the loop when leftIdx > rightIdx
  if (leftIdx > rightIdx) return -1;

  // Calc the mid index of array and find the mid elem
  const midIdx = Math.floor((leftIdx + rightIdx) / 2);

  // if target is > mid then search right half - update left index to mid + 1
  if (target > arr[midIdx]) {
    return binarySearchRecursive(arr, target, midIdx + 1, rightIdx);
  } else if (target < arr[midIdx]) {
    // if target < mid then search left half - update right index to mid - 1
    return binarySearchRecursive(arr, target, leftIdx, midIdx - 1);
  } else {
    // if target = mid then return index of mid
    return midIdx;
  }
};

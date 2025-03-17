// Pseudocode:
// Invoke debounce - it should invoke the cb fn after a delay. We can use setTimeout
// Clear the timeout if the debounced fn is called again while there is a pending invocation, use timeout id to store the reference. Use clearTimeout to clear the timeout
// To get access to the previous timerId, we should create a closure
// Call the callback fn with the right params
// make sure to use `Function.prototype.apply()` or `Function.prototype.call()` so that we can have access to `this` keyword. do not use ...args as it will loose context to this keyword
const debounce = (callback, delay = 0) => {
  // initialize the timer
  let timerId = null;

  // To get access to the previous timerId, we should create a closure
  return function (...args) {
    // keep a reference to `this` keyword so that we can use it with `callback.apply()`
    const context = this;

    // Clear the timeout if the debounced fn is called again while there is a pending invocation, use timeout id to store the reference. Use clearTimeout to clear the timeout
    clearTimeout(timerId);

    // Invoke debounce - it should invoke the cb fn after a delay. We can use setTimeout
    timerId = setTimeout(function () {
      timerId = null; // Optional but a good practice
      // make sure to use `Function.prototype.apply()` or `Function.prototype.call()` so that we can have access to `this` keyword. do not use ...args as it will loose context to this keyword
      // callback(...args) should be avoided
      callback.apply(context, args);
    }, delay);
  };
};

// Pseudocode:
// 1. Invoke throttle - it should invoke the cb fn immediately and block any future invocation till the delay has passed. We can use setTimeout for that. We can use a boolean like `shouldThrottle` to true which will help us lock and prevent further invocation. after the delay is passed we release the lock.
// To get access to the previous timerId, we should create a closure
// 2. Call the callback fn with the right params (This stays similar to what we did with debounce)
// make sure to use `Function.prototype.apply()` or `Function.prototype.call()` so that we can have access to `this` keyword. do not use ...args as it will loose context to this keyword
const throttle = (callback, delay = 0) => {
  // 1. Invoke throttle - it should invoke the cb fn immediately and block any future invocation till the delay has passed. We can use setTimeout for that. We can use a boolean like `shouldThrottle` to true which will help us lock and prevent further invocation. after the delay is passed we release the lock.
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) return;
    callback.apply(this, args);
    // turn throttle to true and block any future invocations
    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, delay);
  };
};

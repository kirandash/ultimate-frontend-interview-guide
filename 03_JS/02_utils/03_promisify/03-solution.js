const promisify = (callback) => {
  // make sure all the args are forwarded properly to the callback fn
  return function (...args) {
    // return a promise
    return new Promise((resolve, reject) => {
      const handleErrorAndValue = (error, value) => {
        if (error === undefined || error === null) {
          // if there is no error then resolve the promise and the value should be passed to .then method
          resolve(value);
        } else {
          // if there is error then error should be passed to the .catch method
          reject(error);
        }
      };

      // executor fn of the promise
      // Here we don't need to get context from parent fn by creating a separate context variable because we are using arrow fn. But if we were using regular fn then we will have to create the context
      callback.call(this, ...args, handleErrorAndValue);
    });
  };
};

// Tests:
// Sample async fn to promisify
const asyncTask = (num, callback) => {
  setTimeout(() => {
    if (num < 0) {
      callback(new Error("number can't be neagative"), null);
    } else if (num >= 0) {
      callback(null, num * 2);
    }
  }, 1000);
};

const asyncTaskPromisified = promisify(asyncTask);

asyncTaskPromisified(5)
  .then((result) => {
    console.log("Success:", result); // 10
  })
  .catch((error) => {
    console.error("Errro:", error);
  });

asyncTaskPromisified(-2)
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error); // Error
  });

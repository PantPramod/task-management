
export default function asyncHandler(fn) {
    return function (req, res, next) {
      // Use a Promise to handle asynchronous code
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
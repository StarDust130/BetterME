

//! Same as above without curly braces
export const catchAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);

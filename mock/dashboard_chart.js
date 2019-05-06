const _ = require("lodash");
module.exports = function(method) {
  let result = [0, 0, 0, 0, 0, 0];
  switch (method) {
    case "GET":
      result = result.map(() => _.random(10, 100));
      break;
    case "POST":
    default:
      result = null;
  }
  return result;
};

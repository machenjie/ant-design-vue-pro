module.exports = function(method) {
  let result = "";
  switch (method) {
    case "POST":
      result = "200 OK";
      break;
    case "GET":
    default:
      result = null;
  }
  return result;
};

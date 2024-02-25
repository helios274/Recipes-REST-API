import constants from "../utils/constants.js";

const errorHandler = (err, req, res, next) => {
  console.log("errorHandler called");
  console.log(err);
  let statusCode = err.statusCode
    ? err.statusCode
    : res.statusCode !== 200
    ? res.statusCode
    : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      let location = "";
      if (err.location) {
        location = err.location === "body" ? "Body " : "Query ";
      }
      res.json({
        success: false,
        title: `${location}Validation Error`,
        message: err.message,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        success: false,
        title: "Not Found Error",
        message: err.message,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        success: false,
        title: "Unauthenticated Access",
        message: err.message,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        success: false,
        title: "Unauthorized Access",
        message: err.message,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        success: false,
        title: "Server Error",
        message: err.message,
      });
      break;
    default:
      next();
      break;
  }
};

export default errorHandler;

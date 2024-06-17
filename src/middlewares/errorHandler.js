import constants from "../utils/constants.js";
import logger from "../config/logging/index.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  let statusCode = err.statusCode ? err.statusCode : res.statusCode;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      let location = "";
      if (err.location) {
        location = err.location === "body" ? "Body " : "Query ";
      }
      res.status(statusCode).json({
        success: false,
        title: `${location}Validation Error`,
        message: err.message,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        success: false,
        title: "Not Found Error",
        message: err.message,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        success: false,
        title: "Unauthenticated Access",
        message: err.message,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        success: false,
        title: "Unauthorized Access",
        message: err.message,
      });
      break;
    // case constants.SERVER_ERROR:
    //   res.status(statusCode).json({
    //     success: false,
    //     title: "Server Error",
    //     message: err.message,
    //   });
    //   break;
    default:
      res.status(statusCode).json({
        success: false,
        title: "Server Error",
        message: err.message,
      });
      break;
  }
};

export default errorHandler;

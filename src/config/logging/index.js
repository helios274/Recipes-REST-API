import {
  addColors,
  format as _format,
  transports as _transports,
  createLogger,
} from "winston";
import "winston-daily-rotate-file";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "dev";
  const isDevelopment = env === "dev";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

// Format for console (with colors)
const consoleFormat = _format.combine(
  _format.colorize({ all: true }),
  _format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Format for file (without colors)
const fileFormat = _format.combine(
  _format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new _transports.Console({
    format: consoleFormat,
  }),
  new _transports.File({
    filename: "src/logs/error.log",
    level: "error",
    format: fileFormat,
  }),
  new _transports.File({
    filename: "src/logs/combined.log",
    format: fileFormat,
  }),
  new _transports.DailyRotateFile({
    filename: "src/logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: fileFormat,
  }),
];

const logger = createLogger({
  level: level(),
  levels,
  format: fileFormat, // default format for other transports
  transports,
});

export default logger;

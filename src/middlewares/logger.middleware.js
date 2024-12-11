import fs from "fs";
import winston from "winston";
const fsPromises = fs.promises;

// async function log(logData) {
//   try {
//     logData = new Date().toISOString() + " " + logData + "\n";
//     await fsPromises.appendFile("logs.txt", logData);
//   } catch (err) {
//     console.error(err);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});
const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin")) {
    const logData = `${req.method} ${req.originalUrl} ${JSON.stringify(
      req.body
    )}`;
    // await log(logData);
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;

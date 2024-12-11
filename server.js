import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
// import basicAutorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartItemsRouter from "./src/features/cartItems/cartItems.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";

const server = express();
server.use(express.json());

server.use(cors());

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   if (req.method === "OPTIONS") {
//     return res.status(200).send();
//   }
//   next();
// });

server.use(loggerMiddleware);
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartItemsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to E-com API's");
});

server.use((req, res) => {
  res
    .status(500)
    .send(
      "API NOT FOUND! Please go to localhost:3200/api-docs for API documentation"
    );
});

server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res.status(err.status).send(err.message);
  }
  res.status(500).send("Something went wrong!");
});

server.listen(3200, () => {
  console.log("Server is running on port 3200");
});

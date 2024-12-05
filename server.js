import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
// import basicAutorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartItemsRouter from "./src/features/cartItems/cartItems.routes.js";

const server = express();
server.use(express.json());

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartItemsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to E-com API's");
});

server.listen(3200, () => {
  console.log("Server is running on port 3200");
});

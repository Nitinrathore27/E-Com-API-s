import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartItemsRouter = express.Router();
const cartItemsController = new CartItemsController();

cartItemsRouter.delete("/:id", cartItemsController.deleteCartItem);
cartItemsRouter.post("/", cartItemsController.addCartItem);
cartItemsRouter.get("/", cartItemsController.getCartItemsUser);

export default cartItemsRouter;

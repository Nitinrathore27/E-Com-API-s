import CartItemModel from "./cartItems.model.js";
export default class CartItemsController {
  addCartItem(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    const cartItem = CartItemModel.add(userId, productId, quantity);
    res.status(201).send("Cart Is updated");
  }
  getCartItemsUser(req, res) {
    const userId = req.userId;
    const cartItems = CartItemModel.get(userId);
    return res.status(200).send(cartItems);
  }
  deleteCartItem(req, res) {
    const userId = req.userId;
    const itemId = req.params.id;
    const error = CartItemModel.delete(userId, itemId);
    if (error) {
      return res.status(404).send(error);
    }

    res.status(200).send("Item deleted Successfully");
  }
}

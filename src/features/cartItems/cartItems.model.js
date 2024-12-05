export default class CartItemModel {
  constructor({ userId, productId, quantity, id }) {
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.id = id;
  }
  static add(userId, productId, quantity) {
    const cartItem = new CartItemModel({ userId, productId, quantity });
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
  static get(userId) {
    return cartItems.filter((cartItem) => cartItem.userId == userId);
  }
  static delete(userId, itemId) {
    const cartItemIndex = cartItems.findIndex(
      (i) => i.userId == userId && i.id == itemId
    );
    if (cartItemIndex == -1) {
      return "Item Not Found ";
    } else {
      cartItems.splice(cartItemIndex, 1);
      // return "Item deleted Successfully";
    }
  }
}

var cartItems = [
  new CartItemModel({ userId: 1, productId: 2, quantity: 1, id: 1 }),
  new CartItemModel({ userId: 1, productId: 3, quantity: 2, id: 2 }),
  new CartItemModel({ userId: 2, productId: 1, quantity: 1, id: 3 }),
  new CartItemModel({ userId: 2, productId: 2, quantity: 1, id: 4 }),
  new CartItemModel({ userId: 2, productId: 3, quantity: 1, id: 5 }),
];

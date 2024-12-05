import { UserModel } from "../user/user.model.js";
export default class ProductModel {
  constructor(id, name, price, description, category, imageUrl, sizes) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.imageUrl = imageUrl;
    this.sizes = sizes;
  }
  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }
  static getAllProducts() {
    return products;
  }
  static get(id) {
    return products.find((product) => product.id === id);
  }
  static filter({ category, minPrice, maxPrice }) {
    const filterProducts = products.filter(
      (product) =>
        (!category || product.category === category) &&
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice)
    );
    return filterProducts;
  }

  static rateProduct({ userId, rating, productId }) {
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      return "User Not Found";
    }
    const product = products.find((p) => p.id == productId);
    if (!product) {
      return "Product Not Found";
    }
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userId: userId,
        rating: rating,
      });
    } else {
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId == userId
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
  }
}
var products = [
  new ProductModel(
    1,
    "Nike Air Max 270",
    7500,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Shoes",
    "https://via.placeholder.com/150",
    ["7", "8", "9", "10", "11"]
  ),
  new ProductModel(
    2,
    "Adidas Superstar",
    5000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Shoes",
    "https://via.placeholder.com/150",
    ["7", "8", "9", "10", "11"]
  ),
  new ProductModel(
    3,
    "Nike Air Force 1",
    8000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Shoes",
    "https://via.placeholder.com/150",
    ["7", "8", "9", "10", "11"]
  ),
];

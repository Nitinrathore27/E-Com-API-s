import { json } from "express";
import productModel from "./product.model.js";
import ProductModel from "./product.model.js";
export default class ProductController {
  getAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.status(200).send(products);
  }
  getProductById(req, res) {
    const id = req.params.id;
    const product = productModel.get(parseInt(id));
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product not found");
    }
  }
  addProduct(req, res) {
    const { name, price, description, category, rating, sizes } = req.body;

    const newProduct = new ProductModel(
      4,
      name,
      price,
      description,
      category,
      rating,
      req.file.filename,
      sizes.split(",")
    );
    const createdProduct = productModel.add(newProduct);
    res.status(201).send(createdProduct);
  }

  filterProducts(req, res) {
    const { category, minPrice, maxPrice } = req.query;
    const filteredProducts = productModel.filter({
      category,
      minPrice,
      maxPrice,
    });
    res.status(200).send(filteredProducts);
  }

  rateProduct(req, res) {
    const { userId, rating, productId } = req.query;
    const error = productModel.rateProduct({ userId, rating, productId });
    if (error) return res.status(400).send(error);
    else return res.status(200).send("Product Rated Successfully");
  }
}

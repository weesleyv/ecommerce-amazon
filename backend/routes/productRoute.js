import express from "express";
import Product from "../models/Product";
import { isAdmin, isAuth } from "../utils";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    brand: req.body.brand,
    category: req.body.category,
    rating: req.body.rating,
    reviews: req.body.reviews,
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ messgae: "Product created", data: newProduct });
  } else {
    return res.status(500).send({ messgae: "Error in creating product" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: product });
    }
  }
  return res.status(500).send({ message: "Error in Updating product" });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.deleteOne({ _id: productId });
    res.send({ message: "Product Deleted" });
  } catch (error) {
      res.send({message: error.message})
  }
});

export default router;

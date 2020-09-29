import express from "express";
import data from "./data";
// product/api.products.... ????????
const app = express();

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = data.products.find((item) => item.id === id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ msg: "product not found" });
  }
  res.send();
});

app.get("/api/products", (req, res) => {
    console.log('products')
  res.send(data.products);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on", process.env.PORT || 5000);
});

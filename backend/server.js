import express from "express";
import data from "./data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import bodyParser from "body-parser";


const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason))

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID)
})

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on", process.env.PORT || 5000);
});

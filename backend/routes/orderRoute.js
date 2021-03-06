import express from "express";
import Order from "../models/Order";
import { isAdmin, isAuth } from "../utils";

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find({}).populate("user")
  res.send(orders)
});

router.get("/myorders", isAuth, async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order not found");
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove()
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order not found");
  }
});

router.post("/", isAuth, async (req, res) => {
  const order = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const orderCreated = await order.save();
  res.status(201).send({ message: "New Order Created", data: orderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
    console.log(req.params.id)
  const order = await Order.findById(req.params.id);
  console.log(order)
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerId: req.body.payerId,
        orderId: req.body.orderId,
        paymentId: req.body.paymentId,
      },
    };
    const paidOrder = await order.save();
    res.send({ message: "Order Paid", order: paidOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export default router;

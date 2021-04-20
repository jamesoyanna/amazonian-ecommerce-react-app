import express from "express";
import Order from "../models/orderModel";
import {isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", isAuth, async (req, res) =>{
  const order = await Order.findOne({user: req.user._id});
  if(order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found")
  }
});

// Delete route
router.delete("/:id", isAuth, isAdmin, async (req, res) =>{
  const order = await Order.findOne({_id: req.params.id});
  if(order) {
    const deleteOrder = await order.remove()
    res.send(deleteOrder);
  } else {
    res.status(404).send("Order Not Found");
  }
});

//Post route
router.post("/", isAuth, async (req, res) =>{
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  })
  const newOrderCreated = await newOrder.save();
  res.status(201).send({message: "New Order Created", data: newOrderCreated});
});



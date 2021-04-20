import express from "express";
import Product from "../models/productModel";
import {isAuth, isAfdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? {category: req.query.category} : {};
  const searchKeyword = req.query.searchKeyword
} ? {
  name: {
    $regex: req.query.searchKeyword,
    $options: 'i',
  },
}
: {};
const sortOrder = req.query.sortedOrder
? req.query.sortedOrder === 'lowest'
? :{price: 1}
: {price: -1};
const products = await Product.find({...category, ...searchKeyword}).sort(
  sortOrder
);
res.send(products)
});

router.get("/:id", async, (req, res ) =>{
  const product  = await Product.findOne({_id: req.params.id})
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message: 'Product Not found'});
  }
})

router.post("/:id/reviews", isAuth, async (req, res) =>{
  const product = await Product.findById(req.params.id);
  if(product) {
    const review ={
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push (review);
    product.numReviews = product.reviews.length;
    product.rating = 
    product.reviews.reduce((a, c) => c.rating + a, 0)/
    product.reviews.length;
    const updatedproduct = await product.save();
    res.status(201).send({
      data: updatedproduct.reviews[updatedproduct.reviews.length -1],
      message: 'Review save succcessfully.',
    });
  } else {
    res.status(404).send({message: 'Product Not Found'});
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) =>{
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.image = req.body.image;
    product.category = req.body.category;
    const updatedProduct = await product.save();
    if(updatedProduct){
      return res
      .status(200)
      .send({message: 'Product Updated', data: updatedProduct})
    }
  }
  return res.status(500).send({message: 'Error in Updating product'})
});
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const { ensureAuthenticated } = require('../config/auth');

const Product = require('../models/uploadSchema'); 

// router.get("/", ensureAuthenticated,(req, res) => {
router.get("/", async (req, res) => {
  const user = req.user
  const products = await Product.find({});
  
    res.render("shop/shop",{
        user,
        products
    });
});


router.get("/item/:id", async (req, res) =>{
  const user = req.user
  const productId = req.params.id;
   
  try {
     const product = await Product.findById(productId);

     res.render("shop/item",{
          user,
          product
     });
  } catch (error) {
     
  }
});

router.get("/cart", (req, res) => {
  const user = req.user
   res.render("shop/cart",{
        user
   });
})

router.get("/checkout", (req, res) => {
  const user = req.user
   res.render("shop/checkout",{
        user
   });
})

module.exports = router;

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const Order = require('../models/orderSchema.js');

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
});

router.get('/filter', async (req, res) => {
  try {
    const { productName, productCompanyName, minPrice, maxPrice, productDescription } = req.query;
    const user = req.user;

    // Create an array to hold our search conditions
    const searchConditions = [];

    // Add conditions for each non-empty query parameter
    if (productName) searchConditions.push({ productName: { $regex: productName, $options: 'i' } });
    if (productCompanyName) searchConditions.push({ productCompanyName: { $regex: productCompanyName, $options: 'i' } });
    if (productDescription) searchConditions.push({ productDescription: { $regex: productDescription, $options: 'i' } });

    // Create the aggregation pipeline
    const pipeline = [
      {
        $match: {
          $or: searchConditions.length > 0 ? searchConditions : [{}], // If no conditions, match all documents
        }
      },
      {
        $addFields: {
          score: {
            $sum: [
              { $cond: [{ $regexMatch: { input: "$productName", regex: productName || "", options: "i" } }, 1, 0] },
              { $cond: [{ $regexMatch: { input: "$productCompanyName", regex: productCompanyName || "", options: "i" } }, 1, 0] },
              { $cond: [{ $regexMatch: { input: "$productDescription", regex: productDescription || "", options: "i" } }, 1, 0] }
            ]
          }
        }
      }
    ];

    // Add price filtering if provided
    if (minPrice || maxPrice) {
      pipeline.push({
        $match: {
          $and: [
            minPrice ? { productPrice: { $gte: parseInt(minPrice) } } : {},
            maxPrice ? { productPrice: { $lte: parseInt(maxPrice) } } : {}
          ]
        }
      });
    }

    // Add sorting
    pipeline.push({
      $sort: { score: -1, productName: 1 } // Sort by score descending, then by product name
    });

    const products = await Product.aggregate(pipeline);

    res.render('shop/searchResults', { products, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while filtering products');
  }
});


router.post('/search', async (req, res) => {
  try {
    const searchText = req.body.searchText;
    const user = req.user; // Assuming you're using authentication

    if (!searchText) {
      return res.render('shop/searchResults', { products: [], user, searchPerformed: false });
    }

    const searchRegex = new RegExp(searchText, 'i');

    const products = await Product.aggregate([
      {
        $match: {
          $or: [
            { productName: { $regex: searchRegex } },
            { productCompanyName: { $regex: searchRegex } }
          ]
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $cond: [{ $regexMatch: { input: "$productName", regex: searchRegex } }, 2, 0] },
              { $cond: [{ $regexMatch: { input: "$productCompanyName", regex: searchRegex } }, 1, 0] }
            ]
          }
        }
      },
      {
        $sort: { score: -1, productName: 1 }
      }
    ]);

    res.render('shop/searchResults', { products, user, searchPerformed: true, searchText });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

// Checkout route

router.post('/checkout', async (req, res) => {
  try {
      const cart = JSON.parse(req.body.cartData);
      console.log(cart)
      const paymentMethod = req.body.paymentMethod;
      const cartTotal = 40;

      const newOrder = new Order({
          user: req.user._id,
          items: cart,
          paymentMethod: paymentMethod,
          total: cartTotal,
          status: 'Pending',
          orderDate: new Date()
      });

      await newOrder.save();

      res.redirect('/shop/orders');
  } catch (err) {
      console.error(err);
      res.redirect('/shop/checkout');
  }
});

// View user orders
router.get('/orders', async (req, res) => {
  try {
      const orders = await Order.find({ user: req.user._id }).populate('user');
      res.render('shop/myOrders', { orders: orders,user:req.user });
  } catch (err) {
      console.error(err);
      res.redirect('/');
  }
});

module.exports = router;

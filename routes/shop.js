require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const { ensureAuthenticated } = require('../config/auth');


router.get("/", ensureAuthenticated,(req, res) => {
  const user = req.user
    res.render("shop/shop",{
        user
    });
});

router.get("/item", (req, res) =>{
  const user = req.user
   res.render("shop/item",{
        user
   });
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

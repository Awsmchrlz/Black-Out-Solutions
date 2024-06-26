require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const { ensureAuthenticated } = require('../config/auth');


router.get("/", ensureAuthenticated,(req, res) => {
    res.render("shop/shop");
});

router.get("/item", (req, res) =>{
   res.render("shop/item");
})

router.get("/cart", (req, res) => {
   res.render("shop/cart");
})

router.get("/checkout", (req, res) => {
   res.render("shop/checkout");
})

module.exports = router;

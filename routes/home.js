require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const Product = require('../models/uploadSchema'); 


router.get("/", async (req, res) => {
  // console.log(req.user)

  const products = await Product.find({});
  
  const user = req.user
    res.render("home/home",{
        user,
        products
    });
});

router.get("/manageAccount", (req, res) => {
  const user = req.user
  res.render("auth/manageAccount",{
        user,
        message:''
  });
})

router.get("/about", (req, res) => {

const user = req.user;
  res.render("home/about",{
      user
  });
})

router.get("/contact", (req, res) => {
const user = req.user;
    res.render("home/contact",{
        user
    });
})


router.get("/terms&conditions", (req,res) =>{
    const user = req.user;
    res.render("home/termsAndConditions",{
      user
    });
})


module.exports = router;

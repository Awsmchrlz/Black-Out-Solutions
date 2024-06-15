require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();


router.get("/", (req, res) => {
    res.render("home/home");
});


router.get("/about", (req, res) => {
  res.render("home/about");
})

router.get("/contact", (req, res) => {
    res.render("home/contact");
})

module.exports = router;

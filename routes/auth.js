require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();


router.get("/", (req, res) => {
    res.render("auth/login",{
        layout: "layouts/non_header_layout"
    });
});


router.get("/login", (req, res) => {
  res.render("auth/login",{
    layout: "layouts/non_header_layout"
  });
})

router.get("/signup", (req, res) => {
    res.render("auth/signup",{
        layout: "layouts/non_header_layout"
    });
})

module.exports = router;

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

const session = require('express-session');
//rate limiter
const rateLimit = require('express-rate-limit');

const {generateUserEmail, sendAccountCreateEmail, sendTokenEmail, sendForgotPasswordEmail, sendExceededLoginEmail} = require('../utilities/gmailUtils')

// Rate limiting setup (adjust values as needed)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 8, // limit each IP to 3 requests per windowMs
  handler: (req, res) => {
    
    sendExceededLoginEmail({ipAddress:req.ip})
    res.status(429).send("Too many requests");
  },
});
const crypto = require("crypto");

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

router.get("/", (req, res) => {
    const user = req.user
    res.render("auth/login",{
        layout: "layouts/non_header_layout",
  user,
  message:''
    });
});


app.set('trust proxy', true);

// router.use('/use', limiter);

router.post("/login", limiter, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/shop",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/login", (req, res) => {
  res.render("auth/login",{
    layout: "layouts/non_header_layout"
  });
})
// async function logUsers(){

//   const users = await User.find({})
//   console.log(users)
// }
// const t = logUsers()
// t.then((done)=>{
//   console.log(done)
// })
// router.post("/register", async (req, res, next) => {
  router.post('/signup', async (req, res, next) =>{
    const { firstName, lastName, email, phoneNumber, password} =   req.body;
   
    const user = await User.findOne({ email : email });
  
    if(!user){
  
        try {
          
         const newUser =  await registerUser({firstName,lastName, email,phoneNumber,password});
           
          console.log(newUser)
      
          res.render("auth/login", {
            message: `Account created successfully using email ${email}, please confirm by logging in.`,
            url: `/`,
            user: req.user,
            incorrectCredentials : true,
            errorMessage: ' '
          });
      
        } catch (error) {
          console.log(errorg)
          console.error(`Error registering user: ${error.message}`);
          res.redirect('/login')
          // Handle registration error (e.g., display an error message)
         
       }
    }else{
    
      res.render("auth/login", {
        incorrectCredentials: true,
        errorMessage: 'account already exists, login instead',
        user:req.user
      });
    }
  });
  
  
// Route to handle updating user info
router.post('/updateInfo', async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;

  try {
    
    // Find user by email
    const user = await User.findOne({ email:req.user.email });

    if (!user) {
      // Handle case when user is not found
      return res.render('auth/updatePassword', {
        message: 'User not found',
        user: req.user,
        
      });
    }

    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    // Save updated user
    await user.save();

    // Render updatePassword page with success message
    res.render('auth/manageAccount', {
      message: 'Account info updated successfully.',
      user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



router.get("/signup", (req, res) => {
    res.render("auth/signup",{
        layout: "layouts/non_header_layout"
    });
})

router.get("/updatePassword", (req, res) => {
  const user = req.user
  res.render("auth/updatePassword",{
      user,message:''
  });
});

router.get("/resetPassword", (req, res) => {
  const user = req.user
  res.render("auth/forgotPassword",{
      user,message:''
  });
});
// User.deleteMany({}).then((done=>{
//   console.log(done)
// }))
// Route to handle password update
router.post('/updatePassword', async(req, res) => {
  
  const {email,oldPassword,password,password2}= req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.render('auth/updatePassword', { 
        errors: [], 
        message: 'Old Password Incorrect' ,
      user:req.user
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.render('auth/updatePassword', { 
      errors: [], 
      message: 'Password updated successfully' ,
      user:req.user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

router.post("/forgotPassword", async (req, res) => {
  const {email} = req.body;
  // Find the user with the provided email (replace this with your actual user lookup logic)
  const user = await User.findOne({email:email})

  if (!user) {
    // Handle case when user is not found
    return res.render('auth/forgotPassword', { error: 'User not found',user:req.user });
  }

   // Generate a random verification code
  //  const verificationCode = crypto.randomBytes(6).toString('hex');
   const verificationCode = Math.floor(100000 + Math.random() * 900000);
console.log(verificationCode)
sendForgotPasswordEmail({email,code:verificationCode})
   // Update the user record in the database with the verification code (replace this with your database update logic)
   user.verificationCode = verificationCode;
  user.save();
  res.render("auth/verifyCode", {email,user:req.user});
});

// Route to handle verification code submission
router.post('/verifyCode', async (req, res, next) => {
  const { email, code, newPassword } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user || user.verificationCode !== code) {
      // Handle incorrect verification code
      return res.render('auth/verifyCode', { email, message: 'Invalid verification code', user: req.user });
    }

    // Update the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.verificationCode = ''; // Clear the verification code
    await user.save();

    // Log the user in
    req.login(user, (err) => {
      if (err) {
        console.error(`Error logging in after password reset: ${err.message}`);
        return res.render('auth/login', {
          message: 'Error logging in after password reset. Please log in manually.',
          url: "/auth/login",
          buttonText: "Login",
          user: req.user,
          incorrectCredentials: true,
          errorMessage: req.flash("error")[0],
        });
      }

      // Redirect to the password update page
      return res.redirect('/');
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



// Route to handle verification code submission
router.get('/verifyCode/:email/:code', async(req, res) => {
  const { email, code } = req.params;

  // Find the user with the provided email (replace this with your actual user lookup logic)
  const user = await User.findOne({email:email})

  if (!user || user.verificationCode !== code) {
    // Handle incorrect verification code
    return res.render('auth/verifyCode', { email, error: 'Invalid verification code' });
  }

  // Password reset successful, update the password logic here (replace this with your actual password update logic)
  // For demonstration purposes, let's just update the password in the simulated database

  // Redirect to a page indicating successful password reset
  res.render('auth/updatePassword',{code,email});
});

// // Route to handle verification code submission
// router.post('/updatePassword', async(req, res) => {
//   const { email, password, code } = req.body;

//   // Find the user with the provided email (replace this with your actual user lookup logic)
//   const user = await User.findOne({email:email})

//   if (!user || user.verificationCode !== code) {
//     // Handle incorrect verification code
//     return res.render('auth/verifyCode', { email, error: 'Invalid verification code' });
//   }
//   const salt = await bcrypt.genSalt(10);

//   // Hash the password using the salt
//   const hashedPassword = await bcrypt.hash(password, salt);
 
//   // Password reset successful, update the password logic here (replace this with your actual password update logic)
//   // For demonstration purposes, let's just update the password in the simulated database
//   user.password = hashedPassword;
//   user.verificationCode = ''
  
//   user.save();
//   // Redirect to a page indicating successful password reset
//   res.render('auth/passwordResetSuccess');
// });



async function registerUser(
  {firstName,
    lastName,
    email,
    phoneNumber,
    password}
) {
  try {
    // Generate a salt to use for hashing the password
    const salt = await bcrypt.genSalt(10);

    const verificationToken =  crypto.randomBytes(20).toString("hex");
    console.log(verificationToken);
     console.log(password)
    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user with the same email exists, throw an error
      return null;
      throw new Error("Email already exists");
    }

    // Create a new user document with the hashed password
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password:hashedPassword
    });
    sendAccountCreateEmail({userName:firstName+' '+lastName, email})
    // sendTokenEmail({userName:firstName+' '+lastName, email, token:verificationToken})
    //sendTokenEmail(firstName, email, verificationToken)\
console.log(user)
    // Save the user document to the database
    await user.save();
    return user;
    // console.log(`User ${firstName} registered successfully`);
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
  }
}

router.get("/logout", (req, res) => {

  req.user = null
  // Destroy the user session to log them out
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      // Handle error as needed
      res.status(500).send("Internal Server Error");
    } else {
      res.user = null
      // Redirect the user to the login or home page
      res.redirect("/auth/login"); // You can replace '/' with the desired destination
    }
  });
});

router.get("/verify/:token/:email", async (req, res) => {
  const token = req.params.token;
  const email = req.params.email;
  // const userDetails = req.session.userDetails;

  //  console.log(userDetails)
  // Clear the session data after using it (optional)
  const user = await User.findOne({ verificationToken: token });
  try{
    
  if(user.verificationToken === token){
    const updateUser = await User.findOneAndUpdate(
      { verificationToken: token, emailVerified: false },
      { $set: { email: email, emailVerified: true } }
    );
      
      req.login(updateUser, async (err) => {
        if (err) {
          console.error(`Error logging in after registration: ${err.message}`);
          return res.render('auth/login',{
            
            message: `
            <h3>account with <strong><i>${email}</i></strong> gmail already exists</h3>
            `,
            url: "/auth/register",
            buttonText:"back", 
          incorrectCredentials: true,
          errorMessage: req.flash("error")[0],   
        });
      }
      
      // console.log(`Username: ${user.firstName}, Password: ${user.password}`);
      return res.render("auth/login", {
        message: `<p>🤝🎉Thank you for registering with Blackout-Energy-Solutions!🤝🎉</p>
      💼 <h3>Your account will be verified shortly</h3>
      <p>We're here to provide you solutions to blackouts🤝<h3/>
     `,
        url: "/",
        buttonText: "proceed",
        user,
        incorrectCredentials : true,
        errorMessage: ' '
      });
    });

    let userName = `${user.firstName} ${user.lastName}`;

    // console.log(userDetails.email)

    sendAccountCreateEmail({email:email, userName})
    
    // delete req.session.userDetails;

  }else{
    res.render("auth/login", {
      message: `Invalid verification token, try registering again `,
      url: "/auth/register",
      buttonText: "back",
      user: req.user,
      incorrectCredentials : true,
      errorMessage: ' '
    });
  }
  }catch(error){
    console.log(error.message)
    res.redirect('/');
  }

});




module.exports = router;

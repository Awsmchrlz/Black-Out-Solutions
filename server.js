 // Import necessary modules
 const express = require('express');
 const app = express();
 const expressLayouts = require('express-ejs-layouts');
 const bodyParser = require('body-parser');
 const session = require('express-session');
 const flash = require('connect-flash');
 const mongoose = require('mongoose');



// Import routes
const homeRoute = require('./routes/home');
// const shopRoute = require('./routes/shop');
// const authRoute = require('./routes/auth');


// Database connection
// const localDB = "mongodb://127.0.0.1:27017/Blackout-solutions";
// mongoose.set('strictQuery', true);

// mongoose.connect(localDB, { useNewUrlParser: true })

//   .then(() => {
//     console.log('Database is connected');
//   })
// .catch((err) => console.log('Error connecting to database ', err));


// Configure the server
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false }));



// Use routes
app.use('/', homeRoute);
// app.use('/shop', shopRoute)
// app.use('/auth', authRoute)
// app.use('/transact',ensureAuthenticated ,transactRouter);

app.use('*', (req, res) => {
  // Redirect to the main page or any desired page
  res.redirect('/'); // You can replace '/' with the URL of your main page
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).redirect('/'); // Redirect to the error page
});


// Start the server
app.listen(process.env.PORT || 3911, () => console.log('Server is Running on port 3911'));


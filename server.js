// Import necessary modules
require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');

// Load environment variables

// Import routes
const homeRoute = require('./routes/home');
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');
const { ensureAuthenticated } = require('./config/auth');

// Initialize Passport
require('./config/passport')(passport);

const localDb = "mongodb://127.0.0.1:27017/blackout"
// Database connection
// process.env.liveDb
// process.env.

mongoose.set('strictQuery', true);
mongoose.connect(process.env.liveDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database is connected'))
  .catch(err => console.log('Error connecting to database', err));

// Configure the server
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false }));

// Session and authentication setup
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.message = req.flash('error');
 next();
});
// Use routes
app.use('/auth', authRoute);
app.use('/', homeRoute);
app.use('/shop', ensureAuthenticated,shopRoute);
// app.use('/shop', shopRoute);

app.use('*', (req, res) => {
  res.redirect('/'); // Redirect to the main page or any desired page
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).redirect('/'); // Redirect to the error page
});

// Start the server
const PORT = process.env.PORT || 3912;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

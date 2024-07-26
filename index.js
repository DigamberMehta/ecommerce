require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');
const userRouter = require('./routes/user');
const cartRoutes = require('./routes/cart');
const homeRoutes = require('./routes/home');
const searchRoutes = require('./routes/search');
const showRoutes = require('./routes/show');
const browsingHistoryRoutes = require('./routes/browsingHistory');
const authGoogleRoutes = require('./routes/authGoogle');
const nodemailerRoutes = require('./routes/nodemailer');
const CustomStrategy = require('passport-custom').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const reviewRoutes = require('./routes/review');
const addressRoutes = require('./routes/address');
const checkoutRoutes = require('./routes/checkout');
const whishlistRoutes = require('./routes/wishlist');
const contactRoutes = require('./routes/contact');

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl = process.env.ATLAS_URL || "mongodb://localhost:27017/ecommerce";

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const sessionOptions = {
  secret: "dsdsdsdsdsds",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use('custom', new CustomStrategy(
  async function(req, done) {
    try {
      let { emailOrPhone, password } = req.body;

      //* Convert emailOrPhone to lowercase and trim extra spaces
      emailOrPhone = emailOrPhone.toLowerCase().trim();

      console.log(`Login attempt: emailOrPhone=${emailOrPhone}, password=${password}`);

      // Find user by email or phone
      const user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
      });

      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect email or phone.' });
      }

      // Authenticate the user
      user.authenticate(password, function(err, user, passwordError) {
        if (err) {
          console.log(`Authentication error: ${err}`);
          return done(err);
        }
        if (passwordError) {
          console.log(`Password error: ${passwordError.message}`);
          return done(null, false, { message: passwordError.message });
        }
        console.log('Authentication successful');
        return done(null, user);
      });
    } catch (err) {
      console.log(`Error during authentication: ${err}`);
      req.flash('error', 'Something went wrong');
      return done(err);
    }
  }
));
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'
    ? "https://ecommerce-14h0.onrender.com/auth/google/callback"
    : "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  console.log('Google Strategy Callback');
  try {
    // Check if a user with the same Google ID exists
    const existingGoogleUser = await User.findOne({ googleId: profile.id });
    if (existingGoogleUser) {
      console.log('User Found');
      return done(null, existingGoogleUser);
    }
    
    // Check if a user with the same email exists
    const email = profile.emails[0].value;
    const existingEmailUser = await User.findOne({ email: email });
    if (existingEmailUser) {
      console.log('Email already registered:', email);
      return done(null, false, { message: `Email ${email} is already registered` });
    }

    // If no user exists with the same email, create a new user
    const newUser = await new User({
      googleId: profile.id,
      name: profile.displayName,
      email: email
    }).save();
    console.log('New User Created');
    done(null, newUser);
  } catch (err) {
    console.log('Error:', err);
    done(err);
  }
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.use("/", userRouter);
app.use('/cart', cartRoutes);
app.use('/', homeRoutes);
app.use('/', showRoutes);
app.use('/', searchRoutes);
app.use('/', browsingHistoryRoutes);
app.use('/auth', authGoogleRoutes);
app.use('/', nodemailerRoutes);
app.use('/', reviewRoutes);
app.use('/', addressRoutes);
app.use('/', checkoutRoutes);
app.use('/', whishlistRoutes);
app.use('/', contactRoutes);


// Review routes

// app.get('*', (req, res) => {
//   res.send("404 Page Not Found");
// });
app.get('/terms', (req, res) => {
  res.render('about/terms');
});
app.get('/terms', (req, res) => {
  res.render('about/terms');
});
app.get('/refund', (req, res) => {
  res.render('about/refund');
});
app.get('/shipping', (req, res) => {
  res.render('about/shipping');
});
app.get('/privacy', (req, res) => {
  res.render('about/privacy');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
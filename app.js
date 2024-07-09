const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session');
const userRouter = require('./routes/user');
const flash = require('connect-flash');
const { isLoggedIn } = require('./middleware');
const cartRoutes = require('./routes/cart');
const Fuse = require('fuse.js');
const CartItem = require('./models/cartItem');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl = "mongodb://localhost:27017/ecommerce";
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
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRouter);
app.use('/cart', cartRoutes);
app.use('/cart', cartRoutes)

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.post('/cart/update', isLoggedIn, async (req, res) => {
  const { cartItemId, newQuantity } = req.body;

  try {
    const cartItem = await CartItem.findById(cartItemId);

    if (!cartItem) {
      return res.json({ success: false, message: 'Cart item not found' });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId }).populate('product');
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

    res.json({ success: true, newSubtotal });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});
app.get('/home', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('home/home', { product: products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/products/:id/:slug', async (req, res) => {
  try {
    const { id, slug } = req.params;
    const product = await Product.findOne({ _id: id, slug: slug });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('home/show', { product, camelCaseToTitleCase });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q || '';
    const suggestions = req.query.suggestions === 'true';
    // console.log(`Search term: ${searchTerm}, Suggestions: ${suggestions}`); 

    if (suggestions) {
      // Fetch only the necessary fields for suggestions
      const products = await Product.find({}, 'title slug images sellingPrice');
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.3
      });

      const results = fuse.search(searchTerm).map(result => result.item);
      // console.log('Suggestions results:', results.slice(0, 5)); 
      res.json(results.slice(0, 5));
    } else {
      const products = await Product.find();
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.3
      });

      const results = fuse.search(searchTerm).map(result => result.item);
      // console.log('Search results:', results); // Debugging
      res.render('home/searchResult', { products: results, query: searchTerm });
    }
  } catch (err) {
    // console.error('Error in search endpoint:', err);
    res.status(500).send('Server Error');
  }
});

// Utility function to convert camelCase to Title Case
function camelCaseToTitleCase(camelCase) {
  return camelCase
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, function(str) { return str.toUpperCase(); }); // Capitalize the first letter
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

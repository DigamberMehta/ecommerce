const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const Fuse = require('fuse.js');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl = "mongodb://localhost:27017/ecommerce";
//   console.log(dbUrl);

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get('/home', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from the database
    // console.log(products);
    res.render('home/home', { product: products }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/products/:id/:slug', async (req, res) => {
  try {
    const { id, slug } = req.params;
    // console.log(id, slug);
    const product = await Product.findOne({ _id: id, slug: slug });
    // console.log(product);

    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('home/show', { product }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/search', async (req, res) => {
  try {
      const searchTerm = req.query.q || '';
      const suggestions = req.query.suggestions === 'true';

      if (suggestions) {
          // Return search suggestions
          const products = await Product.find();
          const fuse = new Fuse(products, {
              keys: ['title'],
              includeScore: true,
              threshold: 0.3 // Adjust threshold for fuzzy matching
          });

          const results = fuse.search(searchTerm).map(result => result.item);
          res.json(results.slice(0, 5)); // Limit to a few suggestions
      } else {
          // Return search results
          const products = await Product.find();
          const fuse = new Fuse(products, {
              keys: ['title'],
              includeScore: true,
              threshold: 0.3 // Adjust threshold for fuzzy matching
          });

          const results = fuse.search(searchTerm).map(result => result.item);
          res.render('home/searchResult', { products: results, query: searchTerm });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", wrapAsync(async (req, res, next) => {
  try {
    // Extract data from the request body
    let { email, username, phone, password } = req.body;

    // Debugging: Log original data
    console.log("Original data:", { email, username, phone, password });

    // Convert email to lowercase and trim extra spaces
    email = email.toLowerCase().trim();
    username = username.trim();
    phone = phone.trim();

    // Debugging: Log processed data
    console.log("Processed data:", { email, username, phone });

    // Create a new User instance
    const user = new User({ email, username, phone });
    console.log("Created user instance:", user);

    // Register the user
    const registeredUser = await User.register(user, password);
    console.log("Registered user:", registeredUser);

    // Log in the user
    req.login(registeredUser, err => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("User logged in successfully");
      res.redirect("/home");
    });
  } catch (e) {
    console.error("Signup error:", e);
    res.redirect("/signup");
  }
}));


router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login", savedRedirectUrl,
  passport.authenticate('custom', {
    failureRedirect: "/login",
    failureFlash: true // Ensure this is configured if using connect-flash for messages
    
  }),
  async (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);

    // Check if the redirect URL is /cart/quantity
    if (res.locals.redirectUrl === "/cart/quantity") {
      res.redirect("/");
    } else {
      // If no specific redirect URL is set, redirect to the root
      res.redirect(res.locals.redirectUrl || "/");
    }
  }
);

router.get("/logout", (req, res, next) => {
  let user = req.user.username;
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", `Logout from, ${user}!`);
    res.redirect("/home");
  });
});

module.exports = router;
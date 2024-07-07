const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


router.get("/signup", (req, res) => {
    res.render("auth/signup");
    });

router.post("/signup",wrapAsync( async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            // req.flash("success", "Welcome to Yelp Camp!");
            res.redirect("/home");
        });
    } catch (e) {
        // req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true // Ensure this is configured if using connect-flash for messages
    }),
    async (req, res) => {
      req.flash("success", `Welcome back, ${req.user.username}!`);
      res.redirect("/home");
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
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  try {
    console.log('Checking if user is authenticated...');
    if (!req.isAuthenticated()) {
      // Check if the URL is not /cart/quantity before storing it
      if (req.originalUrl !== '/cart/quantity') {
        req.session.redirectUrl = req.originalUrl;
        console.log(`Redirect URL stored: ${req.session.redirectUrl}`);
      } else {
        console.log('Redirect URL /cart/quantity is not stored.');
      }

      req.flash("error", "You must be signed in first!");
      return res.redirect("/login");
    }
    // console.log('User is authenticated.');
    next();
  } catch (error) {
    console.error(`Error in isLoggedIn middleware: ${error.message}`);
    req.flash("error", "An unexpected error occurred. Please try again later.");
    res.redirect("/login");
  }
};


module.exports.savedRedirectUrl = (req, res, next) => {
  try {
    console.log('Retrieving redirect URL...');
    if (typeof req.session.redirectUrl === 'string') {
      // Store the URL they are requesting
      res.locals.redirectUrl = req.session.redirectUrl;
      console.log(`Redirect URL retrieved: ${res.locals.redirectUrl}`);
    } else {
      console.log('No redirect URL found in session.');
    }
    next();
  } catch (error) {
    console.error(`Error in savedRedirectUrl middleware: ${error.message}`);
    res.locals.redirectUrl = null;
    next();
  }
};


module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
      const review = await Review.findById(reviewId);
      if (!review) {
          req.flash('error', 'Cannot find that review!');
          return res.redirect('back');
      }
      if (review.user.equals(req.user._id)) {
          return next();
      } else {
          req.flash('error', 'You do not have permission to do that.');
          return res.redirect('back');
      }
  } catch (err) {
      req.flash('error', 'Something went wrong.');
      return res.redirect('back');
  }
};

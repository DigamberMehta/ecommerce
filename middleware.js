const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  try {
    const excludeUrls = ['/buy-now', '/cart/quantity'];

    // Check if user is not authenticated
    if (!req.isAuthenticated()) {
      // Store the full URL with query parameters in session, except excluded URLs
      if (!excludeUrls.includes(req.originalUrl)) {
        req.session.redirectUrl = req.originalUrl;
        console.log(`Redirect URL stored: ${req.session.redirectUrl}`);
      }

      req.flash("error", "You must be signed in first!");
      return res.redirect("/login");
    }
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




module.exports.setBackUrl = (req, res, next) => {
  if (!res.locals.backUrl) {
    res.locals.backUrl = req.query.backUrl || req.originalUrl;
    console.log(`Back URL set to: ${res.locals.backUrl}`);
  }
  next();
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

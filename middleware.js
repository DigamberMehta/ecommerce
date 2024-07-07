module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be signed in first!");
      return res.redirect("/login");
    }
    next();
  };


  module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/home/download/${id}`);
  }
  next();
  };
const routeGuard = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.redirect("/authentication/signin");
  }
};

module.exports = routeGuard;

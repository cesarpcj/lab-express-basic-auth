const { Router } = require("express");
const profileRouter = Router();
const routeGuard = require("./../middleware/route-guard");

profileRouter.get("/profile", routeGuard, (req, res, next) => {
  res.render("profile", req.user);
});

module.exports = profileRouter;

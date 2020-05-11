const { Router } = require("express");
const mainRouter = Router();
const routeGuard = require("./../middleware/route-guard");

mainRouter.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
});

module.exports = mainRouter;

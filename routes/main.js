const { Router } = require("express");
const mainRouter = Router();
const routeGuard = require("./../middleware/route-guard");

mainRouter.get("/main", routeGuard, (req, res, next) => {
  res.render("main");
});

module.exports = mainRouter;

const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.render("index", req.user);
});

module.exports = router;

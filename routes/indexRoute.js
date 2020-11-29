const userRoute = require("./userRoute"),
homeRoute = require("./homeRoute"),
  router = require("express").Router();

router.use("/users", userRoute);
router.use("/", homeRoute);

module.exports = router;

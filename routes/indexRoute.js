const userRoute = require("./userRoute"),
  router = require("express").Router();

router.use("/users", userRoute);

module.exports = router;

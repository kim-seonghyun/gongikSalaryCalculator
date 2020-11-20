const router = require("express").Router(),
  userController = require("../controller/userController");

router.get(
  "/showInputFoodTransportationForm",
  userController.showInputFoodTransportationForm
);
router.get("/read", userController.showUserInfomation);
router.post("/create", userController.create);

module.exports = router;

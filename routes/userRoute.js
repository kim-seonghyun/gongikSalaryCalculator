const router = require("express").Router(),
  userController = require("../controller/userController");

router.get(
  "/showInputFoodTransportationForm",
  userController.showInputFoodTransportationForm
);
router.get("/read", userController.showUserInfomation);
router.get("/signUpForm",userController.showSignUpForm)
router.post("/create", userController.create);
router.post("/signup",userController.signUp);

module.exports = router;

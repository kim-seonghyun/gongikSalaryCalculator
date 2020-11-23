const router = require("express").Router(),
  userController = require("../controller/userController");

router.get(
  "/showInputFoodTransportationForm",
  userController.showInputFoodTransportationForm
);
router.post("/create", userController.create);

router.get("/login", userController.showLoginForm);
router.post("/login", userController.authenticate);

router.get("/signUp", userController.showSignUpForm);
router.post("/signUp", userController.signUp, userController.redirectView);

module.exports = router;

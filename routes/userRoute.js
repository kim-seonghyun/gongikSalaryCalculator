const router = require("express").Router();
  const userController = require("../controller/userController");
  const {body} = require('express-validator');

const validateRequest = [
  body("name","이름을 입력해주세요!").notEmpty(),
  body("email","이메일 형식을 맞춰주세요!").isEmail().notEmpty(),
  
  body("hashPassword","비밀번호를 입력해주세요!").notEmpty()
];


router.get(
  "/showInputFoodTransportationForm",
  userController.showInputFoodTransportationForm
);
router.post("/create",userController.create, userController.showCalculateSalaryResult);
router.get("/login", userController.showLoginForm);
router.post("/login", userController.authenticate);

router.get("/signUp", userController.showSignUpForm);
router.post("/signUp",validateRequest ,userController.validate,userController.signUp, userController.redirectView);

module.exports = router;

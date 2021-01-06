const router = require("express").Router();
  const userController = require("../controller/userController");
  const {body} = require('express-validator');
  const User = require("../model/user");
const validateUserRequest = [
  body("name","이름을 입력해주세요!").notEmpty(),
  body("email","이메일 형식을 맞춰주세요!").isEmail().notEmpty(),
  body("hashPassword","비밀번호를 입력해주세요!").notEmpty(),
  body("email","Email already exists").custom(async function(value){
    let user = await User.findOne({email:value});
      if(user){
        return Promise.reject('E-mail already in use');
      }
  })
];

const validateUserInfoRequest = [
  body("eslistmentDay","date형식이 아닙니다").isDate(),
  body("foodExpenses","식비 입력해주세요").isInt({min:2000,max:10000}),
  body("transportationCost","교통비를 입력해주세요!").isInt({min:1000,max:10000}),
  body("calculateMonth","정수값을 넣어주세요").isInt({min:1,max:12})
];

router.get( //식비, 교통비 등등 입력
  "/showUserInfoForm",
  userController.showUserInfoForm
);
//결과 계산후 리턴
router.post("/saveUserInfo",validateUserInfoRequest,userController.validate,userController.saveUserInfo, userController.redirectView);

router.get("/login", userController.showLoginForm);
router.post("/login", userController.authenticate);

router.get("/signUp", userController.showSignUpForm);
router.post("/signUp",validateUserRequest ,userController.validate,userController.signUp, userController.redirectView);

module.exports = router;

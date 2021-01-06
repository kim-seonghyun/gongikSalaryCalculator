const UserInfo = require('../model/userInfo')
const User = require('../model/user')
const passport = require('passport')
const mongoose = require('mongoose')
const calculateSalary = require('../public/js/calculateSalary')
const {validationResult} = require("express-validator");
const getUserInfoParams = (body) => {
  // form에서 제출한 데이터를 정리해주는 메소드
  return {
    _id: new mongoose.Types.ObjectId(),
    eslistmentDay: body.eslistmentDay,
    foodExpenses: body.foodExpenses,
    transportationCost: body.transportationCost,
    restDay: body.restDay
  }
}
const getUserParams = (body) => {
  return {
    email: body.email,
    name: body.name,
    hashPassword: body.hashPassword
  }
}
module.exports = {
  showSignUpForm: (req, res) => {
    res.render('userView/signUpForm')
  },
  showUserInfoForm: (req, res) => {
    res.render('userView/userInfoForm')
  },
  saveUserInfo:  (req, res, next) => {
    // eslistmentDay 값은 앞 페이지 에서 불러오기 , 업데이트 형식으로 계속 이어가는것도 괜찮을거같은데?
    if(req.skip==true){
      res.locals.redirect = "/users/showUserInfoForm";
      next();
    }
    else{
      const currentUser = res.locals.currentUser
      if (currentUser) {
        const userInfo = new UserInfo(getUserInfoParams(req.body))
        userInfo.save() // 여기서 pre 작동?
        User.update(
          { email: currentUser.email },
          { userInfo: userInfo._id },
          (_err, raw) => {
            console.log(raw)
          }
        )
      }
      next()
    }
  },
  signUp: (req, res, next) => {
    if(req.skip == true){
      res.locals.redirect = "/users/signUp";
      next()
    }
    else{
      const user = new User(getUserParams(req.body))
      user.save()
      res.locals.redirect = '/users/login'
      req.flash('success', 'complete signUp')
      next()
    }
  },
  showLoginForm: (req, res) => {
    res.render('userView/loginForm')
  },
  redirectView: (req, res) => {
    const path = res.locals.redirect
    if (path) {
      res.redirect(path)
    }
  },
  authenticate: passport.authenticate('local', {
    successRedirect: '/users/showUserInfoForm',
    failureRedirect: '/users/login'
  }),
  showCalculateSalaryResult: async (req, res, next) => {
    const salary = await calculateSalary(req.body)
    res.locals.salary = salary
    res.render('userView/showSalary')
  },validate: (req,res,next)=>{
    const errors = validationResult(req).errors;
    if(Object.keys(errors).length !== 0){
      let messages = errors.map(e => e.msg);
      req.flash("error",messages);
      req.skip = true;
      next();
    }
    next();
  }
}

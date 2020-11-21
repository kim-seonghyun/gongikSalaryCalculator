const UserInfo = require('../model/userInfo')
const User = require("../model/user")
const getUserInfoParams = (body) => {
  // form에서 제출한 데이터를 정리해주는 메소드
  return {
    eslistmentDay: body.inputEslistmentDay,
    foodExpenses: body.inputFoodExpenses,
    transportationCost: body.inputTransportationCost
  }
}
const getUserParams = (body)=>{
  return {
    email: body.email,
    name: body.name,
    hashPassword: body.hashPassword
  }

}
module.exports = {
  showSignUpForm: (req,res)=>{
    res.render('userView/signUpForm')
  },
  showInputFoodTransportationForm: (req, res) => {
    res.render('userView/inputFoodExpensesAndTransportationCostForm')
  },
  create: async (req, res, next) => {
    // eslistmentDay 값은 앞 페이지 에서 불러오기 , 업데이트 형식으로 계속 이어가는것도 괜찮을거같은데?
    const userInfo = new UserInfo(getUserInfoParams(req.body))
    const result = await userInfo.save() //여기서 pre 작동?
    return res.json(result)
  },
  showUserInfomation: async (req, res, next) => {
    // userInfo의 모든 정보를 불러옴
    const result = await UserInfo.find()
    return res.json(result)
  },
  signUp: async (req,res,next)=>{
    const user = new User(getUserParams(req.body));
    const userSavePromise = await user.save();
    return res.json(userSavePromise);
  }
  
}

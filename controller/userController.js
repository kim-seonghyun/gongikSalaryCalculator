const UserInfo = require("../model/userInfo");
let getUserParams = (body) => {
  //form에서 제출한 데이터를 정리해주는 메소드
  return {
    eslistmentDay: body.inputEslistmentDay,
    foodExpenses: body.inputFoodExpenses,
    transportationCost: body.inputTransportationCost,
  };
};
module.exports = {
  showInputFoodTransportationForm: (req, res) => {
    res.render("userView/inputFoodExpensesAndTransportationCostForm");
  },
  create: async (req, res, next) => {
    //eslistmentDay 값은 앞 페이지 에서 불러오기 , 업데이트 형식으로 계속 이어가는것도 괜찮을거같은데?
    const userInfo = new UserInfo(getUserParams(req.body));
    const result = await userInfo.save();
    console.log(result);
    return res.json(result);
  },
  showUserInfomation: async (req, res, next) => {
    // userInfo의 모든 정보를 불러옴
    const result = await UserInfo.find();
    return res.json(result);
  },
};

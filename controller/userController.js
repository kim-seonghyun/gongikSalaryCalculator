const UserInfo = require("../model/userInfo");
let getUserParams= (body)=>{
    return {
        foodExpenses: body.inputFoodExpenses,
        transportationCost: body.inputTransportationCost
    }
}
module.exports = {
    
    showInputFoodTransportationForm: (req,res,next)=>{
        res.render("userView/inputFoodExpensesAndTransportationCostForm");
    },
    create: (req,res,next)=>{ //eslistmentDay 값은 앞 페이지 에서 불러오기 , 업데이트 형식으로 계속 이어가는것도 괜찮을거같은데?
        const userInfo = new UserInfo(getUserParams(req.body));
        userInfo.save().then(()=>{
            console.log("users/create 완료");
        }).catch((error)=>{
            console.log(`users/create 실패: ${error}`);
        })
    }

} 
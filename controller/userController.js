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
    create: (req,res,next)=>{
        const userInfo = new UserInfo(getUserParams(req.body));
        userInfo.save().then(()=>{
            console.log("users/create 완료");
        }).catch((error)=>{
            console.log(`users/create 실패: ${error}`);
        })
    }

} 
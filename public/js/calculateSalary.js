const weekCalculator = require("./getWeekDaysPerMonth");
const basepay = require("./basepay");

module.exports = calculateSalary = async (body) => {
  //월급계산
  let salaryDateInfomation = {
    year: body.calculateYear,
    month: body.calculateMonth
  }
  let eslistmentDay = new Date(body.eslistmentDay);
  let basePay = basepay(eslistmentDay, salaryDateInfomation);

  let numberOfWeekDay =
    (await weekCalculator.getWeekDaysPerMonth(salaryDateInfomation)) -
    body.restDay;
    //보류 에러가 너무많음 
    //첫번쨰달 여부 확인후 결과
  // if (isFirstMonth(eslistmentDay,salaryDateInfomation.month) ==0) {
  //   let value = firstMonth(eslistmentDay, salaryDateInfomation,basePay);
  //   basePay = value[0];
  //   numberOfWeekDay = value[1];
  //   return calculateSalaryResult(body, basePay, numberOfWeekDay);
  // }
  
  return calculateSalaryResult(body, basePay, numberOfWeekDay);
};

let calculateSalaryResult = (body, basePay, numberOfWeekDay) => {
  let foodExpenses = parseInt(body.foodExpenses);
  let transportationCost = parseInt(body.transportationCost);
  return (foodExpenses + transportationCost) * numberOfWeekDay + basePay;
};

let firstMonth = (eslistmentDay, salaryDateInfomation, base) => {
  const workedDays = weekCalculator.daysPerMonth(2020, salaryDateInfomation.month);
  const basePay = Math.floor(
    (base * (workedDays - eslistmentDay.getDate())) / workedDays
  );
  const numberOfWeekDay = workedDays - eslistmentDay.getDate();
  return [basePay, numberOfWeekDay];
};

//보류
// function isFirstMonth(eslistmentDay, month){
//   return month - (eslistmentDay.getMonth()+1);
// }
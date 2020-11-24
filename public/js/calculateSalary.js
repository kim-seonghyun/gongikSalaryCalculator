const weekCalculator = require("./getWeekDaysPerMonth");

module.exports = calculateSalary = (body) => {
  //월급계산
  let eslistmentDay = new Date(body.eslistmentDay);
  let { foodExpenses, transportationCost, calculateMonth } = body;
  let basePay = calculateBasePay(eslistmentDay, calculateMonth);
  let numberOfWeekDay = weekCalculator(2020, calculateMonth);
  console.log(basePay);
  return (
    (parseInt(foodExpenses) + parseInt(transportationCost)) * numberOfWeekDay +
    basePay
  );
};

let calculateBasePay = (eslistmentDay, calculateMonth) => {
  //기본급 계산!
  let serviceMonth = calculateServiceMonth(eslistmentDay, calculateMonth);
  console.log(serviceMonth);
  if (serviceMonth < 3) {
    return 408100;
  }
  if (serviceMonth < 9) {
    return 441700;
  }
  if (serviceMonth < 15) {
    return 488200;
  }
  if (serviceMonth < 25) {
    return 540900;
  }
};

let calculateServiceMonth = (eslistmentDay, calculateMonth) => {
  //복무개월 계산
  let today = new Date(2020, calculateMonth - 1); //원하는 month의 복무개월
  let yearDifference = today.getFullYear() - eslistmentDay.getFullYear();

  if (yearDifference > 0) {
    //마감시간이 안남아서 stackOverflow 참고. 나중에 다시구현
    let months = yearDifference * 12;
    months -= eslistmentDay.getMonth();
    months += today.getMonth();
    return months;
  }
  return today.getMonth() - eslistmentDay.getMonth();
};

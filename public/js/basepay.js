module.exports = (eslistmentDay,salaryDateInfomation)=>{
    let servicedMonth = calculateServiceMonth(eslistmentDay,salaryDateInfomation);
    let userClass = returnClass(servicedMonth);
    return basepay[salaryDateInfomation.year][userClass];
}


let calculateServiceMonth = (eslistmentDay, salaryDateInfomation) => {
    //복무개월 계산
    let salaryMonth = new Date(salaryDateInfomation.year, salaryDateInfomation.month - 1); //원하는 month의 복무개월
    let yearDifference = salaryMonth.getFullYear() - eslistmentDay.getFullYear();
  
    if (yearDifference > 0) {
      //마감시간이 안남아서 stackOverflow 참고. 나중에 다시구현
      let months = yearDifference * 12;
      months -= eslistmentDay.getMonth();
      months += salaryMonth.getMonth();
      return months + 1;
    }
    return salaryMonth.getMonth() - eslistmentDay.getMonth() + 1;
  };

  function returnClass(month){
    if (month <= 2) {
      return "mobid";
    }
    if (month <= 8) {
      return "private";
    }
    if (month <= 14) {
      return "corporal";
    }
    if (month < 25) {
      return "sergeant";
    }
  }

  let basepay = {
    2020: {
        "morbid":408100,
        "private": 441700,
        "corporal": 488200,
        "sergeant": 540900  
    },
    2021: {
        "morbid": 459100,
        "private": 496900,
        "corporal": 549200,
        "sergeant": 608500 
    }
}
const getHolidayCount = require("./getHolidayCount");

const getHolidayCount = require("./getHolidayCount");

module.exports = getWeekDaysPerMonth = (year, month) => {
  return (
    daysPerMonth(year, month) -
    weekendDaysPerMonth(year, month) -
    getHolidayCount(year, month)
  );
};

let daysPerMonth = (year, month) => {
  //입력은 1~12안의 드롭다운에서 결정됨
  if (month == 2) {
    return leapDay(year);
  }
  if (1 <= month && month <= 7) {
    return month & 1 ? 31 : 30;
  }
  return month & 1 ? 30 : 31;
};

let leapDay = (year) => {
  if (year % 400 == 0) {
    return 29;
  }
  if (year % 100 == 0) {
    return 28;
  }
  if (year % 4 == 0) {
    return 29;
  }
  return 28;
};

let weekendDaysPerMonth = (year, month) => {
  let firstDay = new Date(year, month - 1).getDay();

  let firstSaturDayDate = 6 - firstDay + 1; //첫번쨰 토요일, 6-day는 현재 요일부터 토요일까지 남은날짜, 1은 기준 일
  if (firstDay === 0) {
    //1일이 일요일인경우
    firstSaturDayDate = 7;
    return (
      countSpecificDaysPerMonth(1, year, month) +
      countSpecificDaysPerMonth(firstSaturDayDate, year, month)
    ); //일요일+토요일 개수 리턴
  }
  return (
    countSpecificDaysPerMonth(firstSaturDayDate, year, month) +
    countSpecificDaysPerMonth(firstSaturDayDate + 1, year, month)
  ); //일요일+토요일 개수 리턴
};

//month 당 특정 요일 개수 리턴
let countSpecificDaysPerMonth = (firstDaydate, year, month) => {
  let result = (daysPerMonth(year, month) - firstDaydate) / 7 + 1; //첫째주 요일 + 나머지 주차 요일

  return Math.floor(result);
};

const fetch = require("node-fetch");
//입력값은 둘다 string 형식

module.exports = async (year, month) => {
  //평일 공휴일 수 리턴
  let holidayCounter = 0;
  let monthString;
  let yearString = String(year);
  monthString = String(month);

  if (month < 10) {
    monthString = String(`0` + month);
  }

  let response = await fetch(
    `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${yearString}&solMonth=${monthString}&_type=json&ServiceKey=${process.env.holidayAPI}`
  );
  let results = await response.json();
  let holidayArray = await results.response.body.items.item;

  if (holidayArray == null) {
    return 0;
  }

  if (!Array.isArray(holidayArray)) {
    //배열이 아닌경우 배열로만들기
    let holidayObj = holidayArray;
    holidayArray = [];
    holidayArray.push(holidayObj);
  }
  for (let i = 0; i < holidayArray.length; i++) {
    //공휴일이 주말인경우 count에서 제외
    let holidayDate = holidayArray[i].locdate; //날짜 변수
    let holidayDateObj = seperateYearMonthDate(holidayDate);
    if (holidayDateObj == 0 || holidayDateObj == 6) {
      continue;
    }
    holidayCounter += 1;
  }
  return holidayCounter;
};
// api값 하드코딩 하지마라

let seperateYearMonthDate = (number) => {
  //yyyymmdd의 요일 리턴
  let rawData = String(number);

  let year = parseInt(rawData.substr(0, 4));
  let month = parseInt(rawData.substr(4, 2));
  let date = parseInt(rawData.substr(6, 2));

  return new Date(year, month - 1, date).getDay();
};

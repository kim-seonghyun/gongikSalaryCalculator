const { compareSync } = require("bcrypt");
const fetch = require("node-fetch");
// 입력값은 둘다 string 형식

module.exports = async (year, month) => {
  // 평일 공휴일 수 리턴
  const yearString = String(year);
  let monthString = String(month);

  if (month < 10) {
    monthString = String("0" + month);
  }
  let holidayArray = await getHolidayArray(yearString,monthString);
  console.log(holidayArray);
  if (holidayArray ==false) { //공휴일이 없는 달에는 0일 리턴
    return 0;
  }
  return returnRestWeekday(holidayArray);
};

const getHolidayArray = async (yearString, monthString)=>{
  const response = await fetch(
    `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.holidayAPIKEY}&solYear=${yearString}&solMonth=${monthString}&_type=json`
  );
  const responsdJSON = await response.json();
  const holidayArray = await responsdJSON.response.body.items.item; // api에서 특정월 공휴일을 불러옴
    if(holidayArray ==undefined){
      return false;
    }

  if(!Array.isArray(holidayArray)){
    return [holidayArray];
  }
  return holidayArray;
}

const returnRestWeekday = async (promise) => {
  //평일 공휴일인 경우만 return
  let holidayCounter = 0;
  const holidayArray = await promise;
  for (let element of holidayArray) {
    // 공휴일이 주말인경우 count에서 제외
    const holidayDate = element.locdate; // 날짜 변수
    const holidayDay = getHolidayDay(holidayDate);
    if (holidayDay === 0 || holidayDay === 6) {
      continue;
    }
    holidayCounter += 1;
  }
  return holidayCounter;
};

const getHolidayDay = (number) => {
  // yyyymmdd의 요일 리턴
  const rawData = String(number);

  const year = parseInt(rawData.substr(0, 4));
  const month = parseInt(rawData.substr(4, 2));
  const date = parseInt(rawData.substr(6, 2));

  return new Date(year, month - 1, date).getDay();
};

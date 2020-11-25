const fetch = require("node-fetch");
// 입력값은 둘다 string 형식

module.exports = async (year, month) => {
  // 평일 공휴일 수 리턴
  const yearString = String(year);
  let monthString = String(month);

  if (month < 10) {
    monthString = String("0" + month);
  }

  const response = await fetch(
    `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.holidayAPIKEY}&solYear=${yearString}&solMonth=${monthString}&_type=json`
  );
  const responsdJSON = await response.json();
  const holidayArray = await responsdJSON.response.body.items.item; // api에서 특정월 공휴일을 불러옴

  if (holidayArray === null) {
    return 0;
  }
  pushObjectInArray(holidayArray);
  return returnRestWeekday(holidayArray);
};

const pushObjectInArray = async (promise) => {
  //객체인경우 배열안에 push
  const holidayObject = await promise;
  if (!Array.isArray(holidayObject)) {
    const holidayArray = [];
    return holidayArray.push(holidayObject);
  }
};

const returnRestWeekday = async (promise) => {
  //평일 공휴일인 경우만 return
  let holidayCounter = 0;
  const holidayArray = await promise;
  for (let i = 0; i < holidayArray.length; i++) {
    // 공휴일이 주말인경우 count에서 제외
    const holidayDate = holidayArray[i].locdate; // 날짜 변수
    const holidayDateObj = seperateYearMonthDate(holidayDate);
    if (holidayDateObj === 0 || holidayDateObj === 6) {
      continue;
    }
    holidayCounter += 1;
  }
  return holidayCounter;
};

const seperateYearMonthDate = (number) => {
  // yyyymmdd의 요일 리턴
  const rawData = String(number);

  const year = parseInt(rawData.substr(0, 4));
  const month = parseInt(rawData.substr(4, 2));
  const date = parseInt(rawData.substr(6, 2));

  return new Date(year, month - 1, date).getDay();
};

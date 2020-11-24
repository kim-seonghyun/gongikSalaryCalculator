const fetch = require("node-fetch");
//입력값은 둘다 string 형식

module.exports = async (year, month) => {
  //평일 공휴일 수 리턴
  let holidayCounter = 0;
  let yearString = String(year);
  if (month < 10) {
    month = `0${month}`;
  }
  let monthString = String(month);

  let response = await fetch(
    `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${yearString}&solMonth=${monthString}&_type=json&ServiceKey=jeyicAtHfk7VZdtnfhK4a1fcdhkDYPQslA4G%2BFVbKU9lQQYpQmwKZFmsPAvTDan%2Fh3je2EMjn7%2BMWhRJlsXd3Q%3D%3D`
  );

  let results = await response.json();
  let result = await calcuateHoliday;
  console.log(result);
  let calcuateHoliday = new Promise((resolve, reject) => {
    console.log("실행은됨");
    let holidayArray = result.response.body.items.item;
    console.log(holidayArray);
    resolve(holidayArray);
  });

  let count = await results.then((result) => {
    if (typeof holidayArray !== Array && holidayArray !== null) {
      //배열이 아닌경우 배열로만들기
      let holidayObj = holwidayArray;
      holidayArray = [];
      holidayArray.push(holidayObj);
    }
    for (let i = 0; i < holidayArray.length; i++) {
      //공휴일이 주말인경우 count에서 제외
      let holiday = holidayArray[i].locdate; //날짜 변수
      let holidayDateObj = seperateYearMonthDate(holiday);
      if (holidayDateObj == 0 || holidayDateObj == 6) {
        continue;
      }
      holidayCounter += 1;
      console.log(holidayCounter);
    }
    console.log(holidayCounter);
    return holidayCounter;
  });
  count.then((c) => {
    console.log(c);
    return c;
  });
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

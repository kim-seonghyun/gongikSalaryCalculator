const { expect } = require("chai");
const holiday = require("../public/js/getHolidayCount");



describe("숫자에서 연,월,일 분리해야됨", () => {
  it("holiday Check", async function(){
    console.log(holiday(2020,02));
    holiday(2020,02).then((result)=>{
      console.log(result)
    });
  })
});

let seperateYearMonthDate = (number) => {
  let rawData = String(number);
  let year = rawData.substr(0, 4);
  let month = rawData.substr(4, 6);
  let date = rawData.substr(6, 2);
  return new Date(year, month, date);
};

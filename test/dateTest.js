const { expect } = require("chai");
const holiday = require("../public/js/getHolidayCount");

let a = holiday(2020, 05);
console.log(`holiday = ${a}`);
describe("숫자에서 연,월,일 분리해야됨", () => {
  it("expect: 10", () => {
    expect(seperateYearMonthDate(20201018).getMonth()).to.eq(10);
  });
});

let seperateYearMonthDate = (number) => {
  let rawData = String(number);
  let year = rawData.substr(0, 4);
  let month = rawData.substr(4, 6);
  let date = rawData.substr(6, 2);
  return new Date(year, month, date);
};

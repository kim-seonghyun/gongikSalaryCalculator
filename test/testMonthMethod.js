const { expect } = require("chai");

describe("평일 계산, 월별 일수 계산, 윤년 계산", () => {
  it("윤년 메소드, 2020을 대입했을때 29일이 나와야 함", () => {
    expect(leapDay(4000)).to.eq(29);
  });
  it("월별 일수계산 메소드, 8을 대입하면 31이 나와야함", () => {
    expect(daysPerMonth(2020, 8)).to.eq(31);
  });
  it("그냥 테스트", () => {
    let day = new Date(2020, 11, 1).getDay();
    1 + 6 - day; //첫번쨰 토요일, 6-day는 현재 요일부터 토요일까지 남은날짜, 1은 기준 일
  });
  it("주말 개수 리턴 테스트, 2020 01 결과는 8일", () => {
    expect(weekendDaysPerMonth(2020, 08)).eq(10);
  });
  it("최종테스트, 각 월별 평일 개수를 완벽하게 구해내야함, 2018 9월 -> 20일", () => {
    expect(getWeekDaysPerMonth(2018, 09)).to.eq(20);
  });
});

let getWeekDaysPerMonth = (year, month) => {
  //특정케이스 1일이 토||일 인경우도 해결
  return daysPerMonth(year, month) - weekendDaysPerMonth(year, month);
};

//비트연산자 적용해봄, ex) month가 3인경우 이진수로 0011 0011과 0001을 and연산 처리하면 1이 나온다. 개꿀연산자이다.
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
  //테스트 통과
  if (year % 400 == 0) {
    return 29;
  }
  if (year % 100 == 0) {
    return 28;
  }
  if (year % 4 == 0) {
    console.log("leapDay 29일");
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
    ); //일요일,토요일 개수 리턴
  }
  return (
    countSpecificDaysPerMonth(firstSaturDayDate, year, month) +
    countSpecificDaysPerMonth(firstSaturDayDate + 1, year, month)
  ); //토요일과 일요일 개수리턴
};
let countSpecificDaysPerMonth = (firstDaydate, year, month) => {
  //month 당 특정 요일 개수 리턴
  let result = (daysPerMonth(year, month) - firstDaydate) / 7 + 1; //첫째주 요일 + 나머지 주차 요일

  return Math.floor(result);
};

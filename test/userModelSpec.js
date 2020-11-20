//테스트 개발환경 작성
const { expect } = require("chai");
const chai = require("chai"),
  chaiHTTP = require("chai-http"),
  mongoose = require("mongoose"),
  app = require("../main"),
  User = require("../model/user");
const userInfo = require("../model/userInfo");
chai.use(chaiHTTP);

beforeEach(() => {
  User.remove({});
});

describe("모델이 제대로 작동하는지 확인", () => {
  it("하나의 모델이 세이브 되어야함", () => {
    let testUser = new User({
      email: "are@are",
      name: "kim kim",
    });
    testUser.save().then((result) => {
      expect(result.length).to.be.equal(1);
      expect(result[0]).to.property("_id");
    });
  });
});


beforeEach(() => {
  User.remove({});
});
describe("userController 테스트", () => {
  it("/users/read 200으로 응답시 성공적으로 로딩된거", () => {
    chai
      .request(app)
      .get("/users/read")
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(error).to.be.equal(null);
      });
  });
  it("req로부터 값을 받는 메소드 테스트, 특정 값이 들어있어야함", () => {
    //성공
    let testBody = {
      email: "a",
      name: "q",
    };
    expect(testUser(testBody)).to.deep.include({
      email: "a",
      name: "q",
    });
  });
  
  it("testUserInfo 테스트!, 위와 동일함", () => {
    let userInfoBody = {
      eslistmentDay: "2017-01-01",
      foodExpenses: 35353,
      transportationCost: 3000,
    };
    expect(testUserInfo(userInfoBody)).to.deep.include({
      eslistmentDay: "2017-01-01",
      foodExpenses: 35353,
      transportationCost: 3000,
    });
  });
});

let testUser = (body) => {
  return {
    email: body.email,
    name: body.name,
  };
};

let testUserInfo = (body) => {
  return {
    eslistmentDay: body.eslistmentDay,
    foodExpenses: body.foodExpenses,
    transportationCost: body.transportationCost,
  };
};

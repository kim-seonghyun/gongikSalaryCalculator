//테스트 개발환경 작성
const { expect } = require("chai");
const chai = require("chai"),
  chaiHTTP = require("chai-http"),
  mongoose = require("mongoose"),
  app = require("../main"),
  User = require("../model/user");
  chai.use(chaiHTTP);

  beforeEach(()=>{
    User.remove({});
  })

describe("모델이 제대로 작동하는지 확인", () => {
  it("하나의 모델이 세이브 되어야함", () => {
    let testUser = new User({
      email: "are@are",
      name:"kim kim"
    });
    testUser.save().then((result)=>{
      expect(result.length).to.be.equal(1);
      expect(result[0]).to.property("_id");
    });
    
  });
});
beforeEach(()=>{
  User.remove({});
})
describe("userController 테스트",()=>{
  it("foodExpense뷰 불러오기",()=>{
    chai.request(app).get("/users/showInputFoodTransportationForm").end((error,res)=>{
      expect(res).to.have.status(200);
      expect(error).to.be.equal(null);
    })
  })
  it("req로부터 값을 받는 메소드 테스트, 특정 값이 들어있어야함",()=>{ //성공
    let testBody = {
      email:"a",
      name: "q"
    }
    expect(testUser(testBody)).to.deep.include({
      email:"a",
      name:"q"
    });
  })
})

let testUser = (body)=>{
  return {
    email: body.email,
    name: body.name
  }
}


const { expect } = require("chai");
const User = require("../model/user");

describe("User모델 유효성 체크  ", function () {
  it("email validate, @와 .이 없는 케이스는 에러가 나야됨", function (done) {
    //실패 케이스
    var user = new User({ email: "abcd" });
    user.validate(function (error) {
      expect(user.errors.error).to.exist("email");
      done();
    });
  });
});

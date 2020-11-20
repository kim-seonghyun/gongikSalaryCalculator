const UserInfo = require("../model/userInfo"),
  chai = require("chai"),
  coMocha = require("co-mocha"),
  mocha = require("mocha"),
  chaiHTTP = require("chai-http");
const { expect, assert } = require("chai");

describe("testing async", function () {
  it("async로 create작업 성공시 promise 반환", async () => {
    try {
      let user = new UserInfo({
        eslistmentDay: "2017-01-01",
        foodExpenses: 13535,
        transportationCost: 3535,
      });
      let result = await user.save().exec();
      assert.ok(result);
    } catch {}
  });
});

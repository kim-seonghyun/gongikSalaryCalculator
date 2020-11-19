const chai = require("chai"),
  User = require("../model/user");

describe("check Model works", () => {
  it("it shouldbe response with 200", (done) => {
    User.save({
      email: "blah blah",
      name: "sh",
    }).then();
  });
});

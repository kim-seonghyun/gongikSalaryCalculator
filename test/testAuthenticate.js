const chai = require('chai');
const chaiHTTP = require('chai-http');
const passport = require("passport");
const bcrypt = require("bcrypt");
const user = require('../model/user');
const { expect, assert } = require('chai');
chai.use(chaiHTTP);

describe("login메소드 authenticate 테스트",()=>{
    it("user결과가 나오면 성공",()=>{
        user.findOne({
            
        })
    })
})

let authenticate = ()=>{
    passport.authenticate('local',{
        successFlash: 'success',
        failureFlash: 'fail',
    })
}
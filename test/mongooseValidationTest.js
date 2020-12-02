var expect = require("chai").expect;

const user = require("../model/user");
var User = require("../model/user")
var UserInfo = require("../model/userInfo");

describe('user 모델 유효성 검사 테스트',function(){ //실패 케이스
    it("name 필드가 비어있으면 유효하지 않음!, name err필드가 존재하면 유효성 검사 통과",function(done){
        var user = new User();

        user.validate(function(error){
            expect(error.erros.name).to.exist;
            done();
        })
    })
    it("위와 마찬가지, 통과하면 유효성 검사 통과한거",function(done){
        var user = new User();

        user.validate(function(error){
            expect(error.errors.name).to.exist;
            done();
        })
    })
})

describe("userInfo 모델 유효성 검사 테스트",()=>{
    it("foodExpenses 변수의 MIN,MAX값 유효성 체크, 2000< X < 10000일경우 테스트 통과", function(done){ //실패 케이스
        var userInfo = new UserInfo({
            foodExpenses: 20002
        });

        userInfo.validate(function(error){
            expect(error.errors.foodExpenses).to.not.exist
            done();
        })

    })
    it("foodExpenses 유효성 체크중, 결과는 위와 동일",function(done){
        var userInfo = new UserInfo({
            foodExpenses: 9999
        });
        userInfo.validate(function(error){
            expect(error.errors.foodExpenses).to.not.exist;
            done();
        })
    })
    it("transportationCost 테스트 , 에러가 없어야 통과",function(done){
        var userInfo = new UserInfo({
            transportationCost: 20000
        });
        userInfo.validate(function(error){
            expect(error.errors.transportationCost).to.not.exist; //무조건 실패하도록 
            done();
        })
    }),
    it("transportation 테스트 , 에러가 없어야 통과",function(done){ //통과
        var userInfo = new UserInfo({
            transportationCost: 9999
        });
        userInfo.validate(function(error){
            expect(error.errors.transportationCost).to.not.exist;
            done();
        })
    })
})
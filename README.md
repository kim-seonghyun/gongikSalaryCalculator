# gongikSalaryCalculator
calculate gongik's salary.

# Model
## user(id,name,pw)
## userInfo(eslistmentDay,foodExpenses,transportationCosts)

# View
## index (회원가입 안돼있으면 권유, 로그인 됐으면 원하는 달의 월급 출력해줌)
## inputSalaryMonth
## layout
## loginPage
## inputEslistmentDayForm
## inputAnnualLeaveForm
## inputFoodExpensesAndTransportationCostForm
## showCalculationResult

# Controller (기능별로 구현)
- 로그인
- 회원가입
- 입력 받은 날짜, 연차, 식비 데이터를 DB에 저장
- authorize로 DB에 유효한 데이터 검증 추가 ( HTML에서 약간의 트릭으로 악용가능 하기떄문 )
- 평일과 공휴일로 출근일수 계산해주는 메소드
- 모은 정보로 결과를 구한뒤 출력해주는 메소드

# 제약사항
## 모든 컨트롤러 기능에 단위별로 테스트 진행(mocha,chai)사용

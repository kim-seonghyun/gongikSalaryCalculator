const UserInfo = require('../model/userInfo')
const { assert } = require('chai')

// eslint-disable-next-line no-undef
describe('testing async', function () {
  // eslint-disable-next-line no-undef
  it('async로 create작업 성공시 promise 반환', async () => {
    try {
      const user = new UserInfo({
        eslistmentDay: '2017-01-01',
        foodExpenses: 13535,
        transportationCost: 3535
      })
      const result = await user.save().exec()
      assert.ok(result)
    } catch {}
  })
  
})

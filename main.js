const express = require('express')
const app = express()
const router = require('./routes/indexRoute')
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.set('port', 3000)
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/gongikSalaryDB', {
  useNewUrlParser: true
})
app.use(router)
app.listen(app.get('port'), () => {
  console.log('server is running !!')
})

module.exports = app

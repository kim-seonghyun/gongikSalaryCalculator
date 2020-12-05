const express = require('express')
const app = express()
const router = require('./routes/indexRoute')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const layout = require('express-ejs-layouts')
const User = require('./model/user')
const flashMessage = require('connect-flash')
const morgan = require('morgan')
require('dotenv').config()
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)
app.use(layout)
app.use(express.static('public'))

app.use(session({
  secret: 'secret code',
  cookie: {
    maxAge: 400000,
    secure: false // production시 true
  },
  resave: false
}))
app.use( // body parser
  express.urlencoded({
    extended: false
  })
)
app.use(express.json()) // bodyparser
app.use(flashMessage())
passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'loginPW'
},

function (email, loginPW, done) { // 아마 여기서 deserialize실행?
  User.findOne({ email }, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, { messages: 'incorrect username' })
    }
    user.validatePassword(loginPW).then((result) => {
      if (!result) {
        return done(null, false, { message: 'incorrect password' })
      }
      return done(null, user)
    })
  })
}
))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/gongikSalaryDB', {
  useNewUrlParser: true
})
passport.serializeUser(function (user, done) {
  done(null, user.email)
})
passport.deserializeUser(function (email, done) {
  User.findOne({
    email
  }, function (err, res) {
    done(err, res)
  })
})
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated()
  res.locals.currentUser = req.user
  res.locals.flashMessage = req.flash()
  next()
})
app.use(router)
app.use(morgan)
app.listen(app.get('port'), () => {
  console.log('server is running !!')
})

module.exports = app

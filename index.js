var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(express.static('public'))
/*
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy

app.use(passport.initialize())

var graph = require('fbgraph')

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId
mongoose.connect('mongodb://localhost/test')

var findOrCreate = require('mongoose-findorcreate')
var ClickSchema = new Schema({ id: String,  name: String})
ClickSchema.plugin(findOrCreate)
var User = mongoose.model('User', ClickSchema)

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: '1785359551691284',
  clientSecret: 'e6f60601a2033a7eaa0090f9731132c4',
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'gender', 'email', 'photos']
},

  function (accessToken, refreshToken, profile, done) {
    graph.setAccessToken(accessToken)
    User.findOrCreate({id: profile.id,name: profile.displayName}, function (err, user) {
      if (err) { return done(err); }
      done(null, user)
    })
    app.get('/profile', function (req, res) {
      res.send(profile)
    })

  }
))

app.get('/list', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return console.error(err)
    res.send(users)
  })
})

app.post('/post', jsonParser, function (req, res) { 
  graph.post('me/feed', req.body, function (err, res) {
    // returns the post id
    console.log(res)
  })
  res.send('Success')
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'publish_actions' }))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
  failureRedirect: '/login' }))
*/

var server = app.listen(5000)
var io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
  socket.on('shareLoc', function (data) {
    console.log(data)
    io.emit('push', data)
  })
})

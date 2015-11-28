var express = require('express')
var app = express()

app.use(express.static('public'))

var server = app.listen(3000)
var io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
  socket.on('addUser', function (data) {
    console.log(data)
    io.emit('push', data)
  })
})

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

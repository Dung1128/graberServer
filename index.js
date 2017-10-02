var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
var _ = require('lodash')
var listLocation = [];
io.on("connection", function (socket) {
  console.log("user connected" + socket.id);
  io.sockets.emit('socket-id', socket.id);
  socket.on('location-client', function (data) {
    // listLocation.push(data);
    var flag = 0;
    if (listLocation.length == 0) {
      listLocation.push(data);
    } else {
      var result = _.findIndex(listLocation, item => {
        console.log('find', item.key, socket.id);
        return item.key === socket.id;
      });
      console.log(result);
      if (result >= 0) {
        listLocation[result].data = data.data
      } else {
        listLocation.push(data);
      }
    }

    console.log('location: ', listLocation);
    io.sockets.emit('send-location', listLocation);
  })

});
(function () {
  let whiteboard = require("./whiteboard");
  //let { whiteboard } = require("./whiteboard");
  let io = require("socket.io-client");

  let socket = io(window.location.origin); //es lo mimos que antes

  //dejamos estas instancias por las dependencias
  //var whiteboard = window.whiteboard;
  // var socket = window.io(window.location.origin); //socket.io-cliemt

  socket.on("connect", function () {
    console.log("Connected!");
  });

  socket.on("load", function (strokes) {
    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });
  });

  socket.on("draw", function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on("draw", function (start, end, color) {
    socket.emit("draw", start, end, color);
  });
})();

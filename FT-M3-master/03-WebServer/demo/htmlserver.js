var http = require("http");
var fs = require("fs"); //Importamos el módulo fs que nos permite leer y escribir archivos del file system

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    var html = fs.readFileSync("./nombre.html", "utf-8");
    res.end(html);
  })
  .listen(1337, "127.0.0.1");

var fs = require("fs");
var http = require("http");

/* 


Vamos a mostrar cada una de las imagenes que se encuentran en la carpeta `images` 
cuando la ruta tenga su mismo nombre.

* Crea un nuevo servidor que usando el path del url muestre la imagen con el mismo nombre. 
¿Qué tipo de "Content-Type" deberiamos usar?

* Si no hay ninguna imagen con ese nombre debería aparecer un mensaje de error




*/
// Escribí acá tu servidor

const server = http.createServer(function (req, res) {
  fs.readFile(`./images${req.url}.jpg`, function (error, data) {
    if (error) {
      res.writeHead(404, { "Content-Type": "text-plain" });
      res.end("imagen no encontrada");
    } else {
      res.writeHead(200, { "Content-Type": "image/jpg " });
      res.end(data);
    }
  });
});

//escuchando el servidor
server.listen(3000, "localhost");

/* 



 let url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    //imagen = fs.readFileSync("https://http.cat/404");

    res.end("NOT FOUND");
  } 


  

   if (url === "/arcoiris") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/arcoiris_doge.jpg");
    res.end(imagen);
  }
  if (url === "/badboy") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/badboy_doge.jpg");
    res.end(imagen);
  }
  if (url === "/code") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/code_doge.jpg");
    res.end(imagen);
  }
  if (url === "/resaca") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/resaca_doge.jpg");
    res.end(imagen);
  }
  if (url === "/retrato") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/retrato_doge.jpg");
    res.end(imagen);
  }
  if (url === "/sexy") {
    res.writeHead(200, { "content-type": "image/png" });
    //var html = fs.readFileSync(__dirname +'/html/index.html');
    imagen = fs.readFileSync("./images/sexy_doge.jpg");
    res.end(imagen);
  } 

  if (req.url === "/json") {
    //Si la URL es /api devolvemos el objeto
    res.writeHead(200, { "Content-Type": "application/json" });
    var obj = {
      mensaje: "Estas en formato JSON",
    };
    res.end(JSON.stringify(obj));
  }







*/

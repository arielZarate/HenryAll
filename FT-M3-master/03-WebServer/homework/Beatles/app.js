var http = require("http");
var fs = require("fs");

//const beatles = require("./beatles");

/* 

2. Crea la ruta "/api" que muestre el arreglo completo  ---ok

3. Ahora en la ruta "/api/John%20Lennon" deberiamos ver solo el objeto de John

4. Haz lo mismo con los otros beatles. Podemos hacer esto sin repetirnos en una misma ruta?

5. Si el usuario no entra un Beatle valido tiene que darle un error diciendo que la página no se encontro


*/

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

let server = http.createServer(function (req, res) {
  //console.log(url); ===> /api  o /home
  let url = req.url;

  if (url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(beatles));
  }

  // /api/jhonLenon

  /* 
    let ur='/api/JohnLennon';
    ur.split('/');   -->(3) ['', 'api', 'JohnLennon']
    ur.split('/')[2] --> 'JohnLennon'
    
    */
  else if (url.substring(0, 5) === "/api") {
    //templates
    /* 
  // 2. Ahora crea un nuevo template en el cual ingresaremos un profile page de cada
  // beatle, el titulo de la pagina y un h1 tiene que decir el nombre,
  //un parrafo con la fecha de nacimiento y una imagen con la profilePic.

  //cada beatle
  */

    const beatle = url.split("/")[3];
    //const beatle = url.split("/").pop();
    // el encodeURI le agrega un %20 a los espacios
    const found = beatles.find((b) => encodeURI(b.name) === beatle);

    if (found) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(found));
    }
    // res.writeHead(400, { "Content-Type": "text/plain" });
    // return res.end(`${beatle}  no es un beatle`);
    else {
      res.writeHead(404, { "Content-Type": "text/html" });
      let mandoHtml = fs.readFileSync("./error.html", "utf-8");
      let message = "NO EXISTE EL BEATLE";

      mandoHtml = mandoHtml.replace("{message}", message);
      res.end(mandoHtml);
    }
  }

  if (url === "/") {
    /*  fs.readFile("./index.html", "utf-8", function (error, data) {
      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        let mandoHtml = fs.readFileSync("./error.html", "utf-8");
        let message = "ERROR: 404 NOT FOUND";
        mandoHtml = mandoHtml.replace("{message}", message);
        return res.end(mandoHtml);
      } else { */
    let data = fs.readFileSync("./index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });

    return res.end(data);
  }
  //});
  // }

  if (url.length > 0) {
    const buscarBeatle = url.split("/").pop();
    // el encodeURI le agrega un %20 a los espacios
    const foundBeatle = beatles.find((b) => encodeURI(b.name) === buscarBeatle);

    if (foundBeatle) {
      res.writeHead(200, { "Content-Type": "text/html" });
      let data = fs.readFileSync("./beatle.html", "utf8");
      let { name, birthdate, profilePic } = foundBeatle;
      data = data
        .replace(/{name}/g, name)
        .replace("{birthdate}", birthdate)
        .replace("{profilePic}", profilePic);
      return res.end(data);
    }
    // res.writeHead(400, { "Content-Type": "text/plain" });
    // return res.end(`${beatle}  no es un beatle`);

    res.writeHead(400, { "Content-Type": "text/html" });
    let mandoHtml = fs.readFileSync("./error.html", "utf-8");
    let message = "ERROR: 404 NOT FOUND";

    mandoHtml = mandoHtml.replace("{message}", message);
    res.end(mandoHtml);
  }
});

const PORT = 3001;

//server.listen(PORT, "localhost");

server.listen(PORT, "127.0.0.1");

console.log(`escuchando en el puerto ${PORT}`);

/* 


### Html y templates

1. Crea un `index.html` (usá bootstrap). Que tenga un header básico, y un jumbotron con un mensaje de bienvenida.
En tu server, devolvé ese HTML cuando los usuarios vayan a la ruta `/`.

2. Ahora crea un nuevo template en el cual ingresaremos un profile page de cada beatle, el titulo de la pagina y un h1 tiene que decir el nombre, un parrafo con la fecha de nacimiento y una imagen con la profilePic.

> Podés usar el string replace como vimos en clases, en la carpeta `/demo` vas a encontrar los ejemplos.

3. Crea una ruta en la cual si ponemos el nombre del Beatle nos muestre su profil page ej. "/Paul%20McCartney".  NO PISES TU RUTA DE API

4. Terminaste? Fijate tu código esta muy desordenado? Te repetiste? Intenta refactorear tu codigo para que quede ordenado, intenta poner las tareas en funciones



*/

/* 
if (req.url === "/api/JohnLennon") {
  res.writeHead(200, { "Content-type": "text/html" });

  let beatleHtml = fs.readFileSync("./beatle.html", "utf-8");
  //const name = "Lisandro";
  var { name, birthdate, profilePic } = beatles;

  beatleHtml = beatleHtml
    .replace("{name}", name)
    .replace("{birthdate}", birthdate)
    .replace("{image}", profilePic);
  res.end(beatleHtml);
  // res.end(JSON.stringify(beatles[0]));
}
if (req.url === "/api/PaulMcCartney") {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify(beatles[1]));
}
if (req.url === "/api/GeorgeHarrison") {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify(beatles[2]));
}
if (req.url === "/api/RichardStarkey") {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify(beatles[3]));
}


} else if (url === "/") {
res.writeHead(404, { "Content-type": "text/html" });

const mandoHtml = fs.readFileSync("./error.html");

res.end(mandoHtml);
} */

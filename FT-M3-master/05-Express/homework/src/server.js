// const bodyParser = require("body-parser");
const express = require("express");

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

//const STATUS_OK = 200;
//const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
//const STATUS_SERVER_ERROR = 500;

//const METHOD = req.method;
//const PATH = req.path;

//funcion handlerstatuscode
const handlerStatusCode = (res, estado) => {
  switch (estado) {
    case STATUS_SERVER_ERROR:
      return res.status(500).json(`Internal server error`);
    case STATUS_NOT_FOUND:
      return res.status(404).json(`Not Found`);
    case STATUS_USER_ERROR:
      return res.status(422).json({
        error: `No se recibieron los parámetros necesarios para crear el Post`,
      });
    case STATUS_OK:
      return res.status(200).json("OK ");

    default:
      return res.json("estado no valido");
  }
};

// TODO: your code to handle requests

//RUTAS

/* 
### `POST /posts`

Cuando se ejecute un request del tipo `POST` en la ruta `/posts`:

- Asegurarse que dentro del body del request existan `author`, `title` y `contents`. 
En el caso de que alguno de ellos no se encuentre, devolver un JSON con un objeto de la 
forma `{error: "No se recibieron los parámetros necesarios para crear el Post"}`.
 Verificar que el código de error sea el adecuado.

- Si los tres campos fueron provistos, crear un nuevo objeto Post con los valores indicados 
para `author`, `title` y `contents` y asignándole un valor numérico único como propiedad `id`.
 Agregar dicho objeto al array de posts. Devolver un JSON con el objeto recientemente creado.

*/

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  //const title = req.body.title;
  //const contents = req.body.contents;

  //console.log(author, title, contents);

  /*  if (author === undefined) {
    res.status(422).json({
      error: `No se recibieron los parámetros necesarios para crear el Post`,
    });
  }
  if (title === undefined) {
    return res.status(422).json({
      error: `No se recibieron los parámetros necesarios para crear el Post`,
    });
  }
  if (contents === undefined) {
    return res.status(422).json({
      error: `No se recibieron los parámetros necesarios para crear el Post`,
    });
  } */

  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  //creando  el objeto
  const obj = {
    id: ++id, //un id autoincremental
    author,
    title,
    contents,
  };

  posts.push(obj);
  //res.send(JSON.stringify(obj));
  res.json(obj);
});

/* 
//=======================================================================================









### `POST /posts/author/:author`

Cuando se ejecute un request del tipo `POST` en la ruta `/posts/author/:author`:

- Asegurarse que dentro del body del request existan tanto `title` como `contents`. 
Ademas, por parametros viaja el nombre del autor. En el caso de que alguno de ellos no se encuentre,
 devolver un JSON con un objeto de la forma `{error: "No se recibieron los parámetros necesarios
  para crear el Post"}`. Verificar que el código de error sea el adecuado.

- Si los tres campos fueron provistos, crear un nuevo objeto Post con los valores indicados para 
`author`, `title` y `contents` y asignándole un valor numérico único como propiedad `id`.
 Agregar dicho objeto al array de posts. Devolver un JSON con el objeto recientemente creado.

*/

server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;

  // console.log("autor:", author);
  //console.log(title, contents);

  //creando  el objeto

  /*  if (author === undefined) {
    handlerStatusCode(res, 422);
  }

  if (title === undefined) {
    handlerStatusCode(res, 422);
  }
  if (contents === undefined) {
    handlerStatusCode(res, 422);
  } */

  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  const obj = {
    id: ++id, //un id autoincremental
    author,
    title,
    contents,
  };

  posts.push(obj);
  //res.send(JSON.stringify(obj));
  res.status(200).json(obj);
});

/* 
//=========================================================================================







get
*/

server.get("/posts/all", (req, res) => {
  res.json(posts);
});

/* 

//=========================================================================================









### `GET /posts`

Cuando se ejecute un request del tipo `GET` en la ruta `/posts`:

- Si existe el parámetro `term` dentro de la URL (query-string parameter) devolver aquellos 
Posts que contengan el valor del parámetro `term` en su título o en su contenido (o en ambos).

- Caso contrario, devolver todos los Posts que se encuentren almacenados en el array `posts`.

*/

server.get("/posts", (req, res) => {
  var { term } = req.query;

  console.log("este es el valor ingresado", term);

  /* const resultado = posts.filter(
    (p) => p.title === term && p.contents === term
  ); */

  if (term) {
    const resultado = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.status(200).json(resultado);
  } else {
    //console.log(posts);
    /* if (resultado.length > 0) {
    return res.json(resultado);
  } */

    return res.status(200).json(posts);
  }
});

/* 
//=========================================================================================








### `GET /posts/:author`

Cuando se ejecuta el request del tipo `GET` en la ruta `posts/:author`:

- Si existen Post del autor indicado en el parametro `author`, devolverlos.

- Caso contrario, devolver un JSON con un objeto de la forma `{error: "No existe ningun 
  post del autor indicado"}`. Verificar que el código de error sea el adecuado.
*/
server.get("/posts/:author", (req, res) => {
  let nuevo_autor = req.params.author;

  // console.log(autor);

  const resultado = posts.filter((a) => a.author === nuevo_autor);

  if (resultado.length > 0) {
    return res.json(resultado);
  } else {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }
});

//=========================================================================================

/* 
### `GET /posts/:author/:title`

Cuando se ejecuta el request del tipo `GET` en la ruta `posts/:author/:title`:

- Si existen Post que coincidan con ambos parametros, `author` y `title` devolver aquellos Posts 
que correspondan con la información provista, es decir que coincidan `author` y `title`.

- Caso contrario, devolver un JSON con un objeto de la forma `{error: "No existe ningun post
 con dicho titulo y autor indicado"}`. Verificar que el código de error sea el adecuado.

*/
server.get("/posts/:author/:title", (req, res) => {
  /*  let author = req.params.author;
  let title = req.params.title; */

  let { author, title } = req.params;

  const resultado = posts.filter(
    (p) => p.author === author && p.title === title
  );

  if (resultado.length) {
    //no usar stringfy
    return res.status(200).json(resultado);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

/* 
//===========================================================================











### `PUT /posts`


Cuando se ejecute un request del tipo `PUT` en la ruta `/posts`

- Asegurarse que dentro del body del request existan `id`, `title` y `contents`. 
En el caso de que alguno de ellos no se encuentre, devolver un JSON con un objeto 
de la forma `{error: "No se recibieron los parámetros necesarios para modificar el Post"}`.
 Verificar que el código de error sea el adecuado.

- En el caso de que el `id` no corresponda a un post válido existente, 
devolver un JSON similar al anterior modificando el mensaje de error por uno adecuado para este caso.

- Si se encuentran todos los parámetros y el `id` es válido, actualizar los datos del 
`title` y `contents` del Post que coincida con dicho `id` . 
Devolver un JSON con el objeto recientemente actualizado.
*/
server.put("/posts", (req, res) => {
  /*   let nuevo = req.body;
  let id = parseInt(req.params.id); //parseammos el numero */

  let { id, title, contents } = req.body;

  //console.log(id);
  /*   if (nuevo.title === undefined) {
    handlerStatusCode(res, 422);
  }
  if (nuevo.author === undefined) {
    handlerStatusCode(res, 422);
  }
  if (nuevo.contents === undefined) {
    handlerStatusCode(res, 422);
  }
 */

  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } else {
    //const indice = posts.findIndex((elem) => elem.id === parseInt(id));
    findPost = posts.find((elem) => elem.id === parseInt(id));
  }
  if (findPost) {
    findPost.title = title;
    findPost.contents = contents;
    return res.status(200).json(findPost);
  } else {
    return res.status(STATUS_USER_ERROR).json({ error: "id invalido" });
  }
});
//console.log(indice);
//esto me devulve un indice
/*   if (indice === -1) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  } else {
    //el array en esa poscion
    posts[indice] = nuevo;
    res.json(posts[indice]);
  } *
  
 
  /


/* 
==================================================================================
















### `DELETE /posts`

Cuando se ejecute un request del tipo `DELETE` en la ruta `posts`

- Asegurarse que dentro del body del request exista un `id` correspondiente a un Post válido. 
De no ser así, ya sea por falta del campo `id` o por ser un id inválido, devolver un JSON con
 un objeto con un mensaje correspondiente en cada caso manteniendo la forma de siempre: 
 `{error: "Mensaje de error"}`

- En el caso de que el `id` corresponda a un Post válido, eliminarlo del array de Posts y 
devolver un JSON con el siguiente objeto: `{ success: true }`.

- Nota: Ver que método van a utilizar para eliminar un post, dependiendo el caso puede
 que sea necesario modificar el `const posts = []` del comienzo por `let posts = []`
*/

server.delete("/posts", (req, res) => {
  //let id = parseInt(req.params.id);
  let { id } = req.body;
  console.log(id);

  //const indice = posts.findIndex((elem) => elem.id === id);
  const findPost = posts.find((elem) => elem.id == parseInt(id));

  //console.log(indice);
  //esto me devulve un indice
  /*  if (indice === -1) {
    return res
      .status(404)
      .json({ error: "El id indicado no corresponde con un Post existente " });
  }
  //para aliminar uso splice posts(posicion,numero de posciones a eliinar)
  posts.splice(indice, 1);
  res.json({ success: true }); */

  if (!id || !findPost) {
    return res.status(STATUS_USER_ERROR).json({ error: "ID INVALIDO" });
  } else {
    posts = posts.filter((p) => p.id !== id);
    return res.status(200).json({ success: true });
  }
});

/* 
================================================================================








### `DELETE /author`

Cuando se ejecute un request del tipo `DELETE` en la ruta `author`

- Asegurarse que dentro del body del request exista un `author` 
correspondiente a un autor válido. De no ser así, ya sea por falta del campo `author` 
o por ser un autor inválido, devolver un JSON con un objeto con un mensaje 
correspondiente en cada caso manteniendo la forma de siempre: 
`{error: "Mensaje de error"}`

- En el caso de que el `author` corresponda a un autor válido, 
eliminar del array de Posts todos los Post correspondientes a dicho autor 
y devolver los posts eliminados.

- Nota: Ver que método van a utilizar para eliminar un post, dependiendo el caso 
puede que sea necesario modificar el `const posts = []` 
del comienzo por `let posts = []`
*/

server.delete("/author", (req, res) => {
  //  let author = parseInt(req.params.author);
  let { author } = req.body;

  // console.log(id);
  //const nombre_autor = posts.find((p) => p.author === author);
  const filterPost = posts.filter((p) => p.author === author);

  if (!author || !filterPost.length) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  } else {
    posts = posts.filter((p) => p.author !== author);

    return res.status(200).json(filterPost);
  }

  //const indice = posts.findIndex((elem) => elem.id === id);
});

module.exports = { posts, server };

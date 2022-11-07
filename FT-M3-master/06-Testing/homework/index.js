const express = require("express");
const app = express();
const sumArray = require("./sumArray");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});

const getProduct = (req, res) => {
  const { a, b } = req.body;
  result = a * b;

  // en vez de pasar entre corchetes un result con la *
  //le paso un objeto que tiene la multiplicaicon adentro
  res.send({ result });
};
app.post("/product", getProduct);

//===============================
const getTest = (req, res) => {
  try {
    res.send({ message: "hola" });
  } catch (error) {
    res.sendStatus(404);
  }
};

app.get("/test", getTest);

//=================================

const getSum = (req, res) => {
  const { a, b } = req.body;

  res.status(200).json({ result: a + b });
};
app.post("/sum", getSum);

//=======================================

const getArray = (req, res) => {
  const { array, num } = req.body;
  //llama a la funcion
  const result = sumArray(array, num);
  res.status(200).send({ result });
};
app.post("/sumArray", getArray);

//===============================

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

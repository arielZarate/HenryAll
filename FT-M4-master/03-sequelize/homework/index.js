const app = require("./server");
const { db } = require("./db");
const PORT = 3000;

const main = async () => {
  try {
    await db.authenticate();
    app.listen(PORT);
    console.log(`Connection has been established successfully on port ${PORT}`);
    db.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

//ejecuto la funcion
main();

/* app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true });
}); */

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  createActivity,
  getActivity,
  getActivityByDetail,
  modifyActivity,
  deleteActivity,
} = require("../controllers/Activity");
const router = Router();

//=======ROUTING=============
router.post("/", createActivity);
router.get("/:id", getActivityByDetail);
router.get("/", getActivity);

router.put("/:id", modifyActivity);
router.delete("/:id", deleteActivity);

module.exports = router;

/* 


[ ] POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes


*/

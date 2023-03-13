//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const app = require("./src/app.js");
const { db } = require("./src/db.js");
const services = require("./src/services/services_api");

//DECLARAMOS PUERTO EN .ENV
const { PORT } = process.env;

const server = async () => {
  try {
    await db.authenticate();
    app.listen(PORT, () => {
      console.log(
        `💥💥💨 
        Connection has been established successfully on port ${PORT}

        `
      );
    });

    db.sync({ force: false });

    //llamo al metodo apenas se crea el server
    services.findOrCreateAll();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

server();

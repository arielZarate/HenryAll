"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

///PUNTO 1
class $Promise {
  //constructor
  constructor(executor) {
    if (typeof executor !== "function")
      throw TypeError("executor must to be function");
    this._state = "pending";
    this._vale = undefined;

    this._internalResolve = (value) => {
      //como solo puede cambiar uan vez de estado , de pendiente a full
      if (this._state !== "pending") return;
      this._state = "fulfilled";
      this._value = value;
    };
    this._internalReject = (reason) => {
      //como solo puede cambiar uan vez de estado , de pendiente a rejec
      if (this._state !== "pending") return;
      this._state = "rejected";
      this._value = reason;
      this._handlerGroups = [];
    };

    //metodos
    const resolve = (value) => {
      this._internalResolve(value);
    };
    const reject = (reason) => {
      this._internalReject(reason);
    };

    executor(resolve, reject);

    //PUNTO 2

    this.then = (successHandler, errorHandler) => {
      const handlerGroup = {
        successCb:
          typeof successHandler === "function" ? successHandler : false,
        errorCb: typeof errorHandler === "function" ? errorHandler : false,
      };

      this._handlerGroups.push(handlerGroup);

      const callHandlers = () => {
        const currentHandler = this._handlerGroups.shift();
        this._state === "fullfilled" && currentHandler.successCb();
      };
    };
  }
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

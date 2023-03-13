/* import React from 'react';

const Timer = () => {
  return (
    <div className="app">
      Componente Timer
    </div>
  );
};

export default Timer;
 */

import React from "react";
import "./Timer.css";
//import * as estilos from "./Timer.css";
import { useState } from "react";

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState("Contador");

  return (
    <div className="app">
      <div className="time">{segundos}</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            activo ? "active" : "inactive"
          }`}
        ></button>
        <button className="button-secondary">Reset</button>
      </div>
      {/*     <button className="button">Contador</button> */}
      <button className="button">{tipo}</button>
      <input type="number" placeholder="Ingresa Segundos" autoComplete="off" />
    </div>
  );
};

/* 

  return (
    <div className="app">
      <div className="time">
        {segundos}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button">
          Reset
        </button>
      </div>
      <button className="button">
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="number" placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
*/

export default Timer;

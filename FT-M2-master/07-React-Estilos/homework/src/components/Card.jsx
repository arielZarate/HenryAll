import React from "react";

import s from "../styles/Card.module.css";

/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */

export default function Card(props) {
  // acá va tu código

  let { max, min, name, img } = props;

  return (
    <div class="container" className={s.card}>
      <button
        type="submit"
        className={`${s.btn} ${s.color} ${s.hover} `}
        onClick={props.onClose}
      >
        X
      </button>
      <div className={`${s.middleDiv}`}>
        <h4>
          <b>{name}</b>
        </h4>
        <p>Min:{min}</p>
        <p>Max: {max}</p>
      </div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${img}@2x.png`}
          alt="imagen de card"
        />
      </div>
      {/* fin de la tarjeta  */}
    </div>
  );
}
//return <div>Card Component</div>;

/* 

<div class="card">
      <div class="container">
        <h4>
          <b>{name}</b>
        </h4>

        <p>{max}</p>
        <p>{min}</p>

        <div>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
*/

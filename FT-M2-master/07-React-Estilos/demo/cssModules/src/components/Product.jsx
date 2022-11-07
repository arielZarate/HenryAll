import React from "react";
import s from "./Product.css";

function Product(props) {
  console.log("esto es s:", s);
  return (
    <div className={`${s.producto} ${s.tamano}`}>
      <h3 className={s.tamano}>{props.title}</h3>
      <p>{props.price}</p>
    </div>
  );
}

export default Product;

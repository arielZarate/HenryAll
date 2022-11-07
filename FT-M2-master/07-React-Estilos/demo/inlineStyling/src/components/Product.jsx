import React from "react";

/* estos son objetos de js con propiedades de css 

PROBLEMA SE PIERDE LOS ATRIBUTOS HOVER ,ETC
*/
const divStyle = {
  margin: "40px",
  border: "5px solid pink",
};
const pStyle = {
  fontSize: "15px",
  textAlign: "center",
};

function Product(props) {
  return (
    <div
      /* ACA LE AGREGO EN EL DIV LOS STYLE EN LINEA */
      style={divStyle}
    >
      <h3>{props.title}</h3>
      <p
        /* ACA LE PONGO EL OTRO ESTILO DE LINEA */
        style={pStyle}
      >
        {props.price}
      </p>
    </div>
  );
}

export default Product;

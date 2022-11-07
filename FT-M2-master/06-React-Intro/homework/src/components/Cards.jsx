import React from "react";
import Card from "./Card";

export default function Cards(props) {
  // acá va tu código
  // tip, podés usar un map

  let ciudades = props.cities;

  if (ciudades === null) {
    return <h1>No hay ciudades para mostrar</h1>;
  } else {
    return (
      <div>
        {ciudades.map((ciudad) => (
          <Card
            max={ciudad.main.temp_max}
            min={ciudad.main.temp_min}
            name={ciudad.name}
            img={ciudad.weather[0].icon}
            onClose={() => alert(ciudad.name)}
          />
        ))}
      </div>
    );
  }
}

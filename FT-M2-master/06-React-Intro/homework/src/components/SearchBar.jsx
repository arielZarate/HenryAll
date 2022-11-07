import React from "react";

/* 

Este Componente recibe por props una función `onSearch` que recibe un parámetro 
(que será el nombre de la ciudad tomado desde el input pero de momento pueden pasarle 
  uno cualquiera ya que aún no estamos utilizando estados dentro del componente).
   La función `onSearch` se debe ejecutar cuando se haga click en el botón `Agregar`.

*/
export default function SearchBar(props) {
  // acá va tu código
  return (
    <div>
      <input
        type="search"
        name="city"
        id="city"
        placeholder="ingrese el nombre de la ciudad"
      />
      <button
        type="submit"
        name="city"
        id="city"
        onClick={function (e) {
          // return props.onSearch(props.cities);
          // return props.onSearch(console.log(e));
          return props.onSearch("buscando ciudad ...");
        }}
      >
        Agregar
      </button>
    </div>
  );

  //<div>Search Bar Component</div>
}

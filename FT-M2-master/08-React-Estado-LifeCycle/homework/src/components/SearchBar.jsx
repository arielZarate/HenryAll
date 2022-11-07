import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <form
      class="d-flex"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        //onSearch("Cairns");
        onSearch(city);
        // setCity(""); //esta linea setea el valor del input
      }}
    >
      <input
        class="form-control me-2"
        type="search"
        placeholder="Ciudad ..."
        aria-label="Search"
        //aca declaro una atributo value y le paso city
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button class="btn btn-outline-success" type="submit">
        Agregar
      </button>
    </form>
  );
}

/* 

  <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch("Cairns");
      }}
    >
      <input type="text" placeholder="Ciudad..." />
      <input type="submit" value="Agregar" />
    </form>
*/

import React from "react";
import { useState } from "react"; //Se agregó el { useState }

import "./App.css";
import Nav from "./components/Nav";
import Cards from "./components/Cards";

export default function App() {
  const [cities, setCities] = useState([]);

  function onSearch(city) {
    const apiKey = "e9b2771e2c0119354388e8e34f3cff9d";
    //const apiKey = "4ae2636d8dfbdc3044bede63951a019b";

    //http://api.openweathermap.org/data/2.5/weather?q=londres&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      // .then((response) => console.log(response))
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const city = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon,
          };
          setCities((oldCities) => [...oldCities, city]);
        } else {
          alert("Ciudad no encontrada");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  //funciton onClose paso de id

  function onClose(id) {
    setCities((oldCities) => oldCities.filter((c) => c.id !== id));
  }

  //========return=============
  return (
    <div className="App">
      <div>
        <Nav onSearch={onSearch}></Nav>

        <Cards cities={cities} onClose={onClose}></Cards>
      </div>
    </div>
  );
}

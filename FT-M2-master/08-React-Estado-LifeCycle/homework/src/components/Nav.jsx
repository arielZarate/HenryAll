import React from "react";
import Logo from "../logoHenry.png";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";

function Nav({ onSearch }) {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand " href="#">
          <img
            src={Logo}
            alt=""
            width="30"
            height="24"
            class="d-inline-block align-text-top  "
          />
          <span class=".ms-5"> Henry Weather-App</span>
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"></a>
            </li>
            {/*  <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li> */}
          </ul>

          <SearchBar onSearch={onSearch}></SearchBar>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

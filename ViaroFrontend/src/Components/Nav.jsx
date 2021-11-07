import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      <nav
        class="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <div class="container-fluid">
          <Link class="navbar-brand" href="/">
            Viaro
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/alumnos">
                  Alumnos
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/profesores">
                  Profesores
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/grados">
                  Grados
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/gradosalumnos">
                  GradosAlumnos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

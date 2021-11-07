import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alumnos from "./Pages/Alumnos";
import Profesores from "./Pages/Profesores";
import GradosAlumnos from "./Pages/GradosAlumnos";
import Grados from "./Pages/Grados";
import Footer from "./Components/Footer";
function App() {
  return (
    <>

      <Router>
        <Nav />
        <div className="my-5 mx-5">
          <Switch>
            <Route exact path="/">
              <Alumnos />
            </Route>
            <Route exact path="/alumnos">
              <Alumnos />
            </Route>
            <Route exact path="/profesores">
              <Profesores />
            </Route>
            <Route exact path="/gradosalumnos">
              <GradosAlumnos />
            </Route>
            <Route exact path="/grados">
              <Grados />
            </Route>
          </Switch>
        </div>
      </Router>

      <Footer />
    </>
  );
}

export default App;

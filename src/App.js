import React from "react";
import Tela1 from "./Tela1";
import Tela2 from "./Tela2";
import Tela3 from "./Tela3";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <button type="button" className="btn btn-info">
          <Link to="/Tela1">Tela1</Link>
        </button>
        <button type="button" className="btn btn-info">
          <Link to="/Tela2">Tela2</Link>
        </button>
        <button type="button" className="btn btn-info">
          <Link to="/Tela3">Tela3</Link>
        </button>
      </nav>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Tela1">
            <Tela1 />
          </Route>
          <Route path="/Tela2">
            <Tela2 />
          </Route>
          <Route path="/Tela3">
            <Tela3 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

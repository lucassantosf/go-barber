import React from "react";
import { Router } from "react-router-dom";

import "./config/ReactotronConfig";

import Routes from "./routes";
import history from "./services/history";

import GlobalStyled from "./styles/global";

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyled />
    </Router>
  );
}

export default App;

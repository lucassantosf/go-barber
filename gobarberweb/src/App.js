import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./config/ReactotronConfig";

import Routes from "./routes";
import history from "./services/history";

import store from "./store";

import GlobalStyled from "./styles/global";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Routes />
        <GlobalStyled />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

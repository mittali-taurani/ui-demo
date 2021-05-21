import React from 'react';
import './App.css';
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ROUTE } from "./helper/constants";
import Home from "./components/ContainerComponents/Home";
import PaymentProcess from "./components/ContainerComponents/PaymentProcess";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={ROUTE.PAYMENT_PROCESS} component={PaymentProcess} />
          <Route path={ROUTE.HOME} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

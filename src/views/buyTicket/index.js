import React, { lazy } from "react";
import "./index.scss";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import SuspenseComponent from "../../utils/router";
const Home = lazy(() => import("./home/home.js"));
const Query = lazy(() => import("./query/query.js"));
const Ticket = lazy(() => import("./ticket/ticket.js"));

class BuyTicket extends React.Component {
  render() {
    return (
      <div className="bg">
        <div className="phone">
          <Switch>
            <Route path="/buyTicket/home" component={SuspenseComponent(Home)} />
            <Route path="/buyTicket/query" component={SuspenseComponent(Query)} />
            <Route path="/buyTicket/ticket" component={SuspenseComponent(Ticket)} />
            <Redirect to="/buyTicket/home" from="/buyTicket" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default BuyTicket;

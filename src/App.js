import "./app.css";
import React, { lazy,Profiler } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./views/layout";
import Login from "./views/login";
import SuspenseComponent from "./utils/router";
import Author from "./utils/author";
const NotFound = lazy(() => import("./views/404"));



class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* login一定要放在/的上方 */}
          <Route path="/login" component={SuspenseComponent(Login)} />
          <Route path="/404"  component={SuspenseComponent(NotFound)} />
          {/* 这里不能加exact，会导致子路由匹配不到 */}
          <Author path="/" component={SuspenseComponent(Layout)}></Author>
        </Switch>
      </Router>
    );
  }

}

export default App;

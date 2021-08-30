import React,{lazy} from "react";
import "./query.scss";
import QueryData from "./query.json";
const List =lazy(()=>import('./list.js'))

class Query extends React.Component {
  render() {
    //{/* <Header title={`${this.props.location.query?this.props.location.query.from:''}-${this.props.location.query?this.props.location.query.to:''}`} canBack back={()=>this.props.history.goBack()}></Header> */}
    return (
      <div className="query-bg">
        <div className="header1">
          <span className="back" onClick={() => this.props.history.goBack()}>
            {"<"}
          </span>
          <span>{`${
            this.props.location.query ? this.props.location.query.from : ""
          }-${
            this.props.location.query ? this.props.location.query.to : ""
          }`}</span>
        </div>
        <div className="header2">
          <span>前一天</span>
          <span>当前时间</span>
          <span>后一天</span>
        </div>
        <div className="content">
          <List></List>
        </div>
      </div>
    );
  }

}

export default Query;

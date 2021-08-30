import React from "react";
import "./common.scss";

class Header extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  back() {
    this.props.back();
  }
  render() {
    return this.props.canBack ? (
      <div className="header">
        <span className="back" onClick={this.back.bind(this)}>
          {"<"}
        </span>
        <span>{this.props.title}</span>
      </div>
    ) : (
      <div className="header">
        <span>{this.props.title}</span>
      </div>
    );
  }
}

export default Header;

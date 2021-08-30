import React from "react";

//自写dialog
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.show ? (
      <div style={{ width: "300px", height: "300px", backgroundColor: "gray" }}>
        {this.props.title}
      </div>
    ) : null;
  }
}

export default Dialog;

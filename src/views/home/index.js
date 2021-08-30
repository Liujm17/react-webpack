import React,{lazy} from "react";
import { connect } from "react-redux"

class Home extends React.Component {
  render(){
      return (
          <>
          <p onClick={this.props.handleClick}>{this.props.subject_data.count}</p>
          <p>444</p>
          </>
      )
  }
}
const mapStateToProps = (state) => {
  return {
      subject_data: state.counter
  }
}

const mapDispatchToProps=(dispatch) =>{
  return {
      handleClick: ()=> dispatch({type:'COUNT_ADD'}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)

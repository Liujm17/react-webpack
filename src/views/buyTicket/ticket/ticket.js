import React, { lazy } from "react";
import { Card } from "antd";
import jsonData from "./timeTable.json";
import "./ticket.scss";
// import ThemeContext from './creatContext'
const Header = lazy(() => import("../components/header.js"));
const Mask = lazy(()=>import('./mask.js'))



export const ThemeContext = React.createContext()

var timer = null;
class Ticket extends React.Component {
  state = {
    loading: true,
    TicketData: "",
    schedule:'',
    activeCard:'',
    showMask:false,
  };
  componentDidMount() {
    this.setState(
      {
        TicketData: jsonData.timeData,
        schedule:jsonData.schedule
      },
      () =>
        (timer = setTimeout(() => {
          this.setState({ loading: false });
        }, 500))
    );
  }
  componentWillUnmount() {
    clearTimeout(timer);
  }
  render() {
    return (
      <>
        <Header title="车次" canBack back={() =>this.props.history.goBack()}></Header>

        <Card
          style={{ width: "100%", marginTop: 16 }}
          loading={this.state.loading}
        >
          {this.span.bind(this)("dStation", "dTime", "date")}
          {this.spanMid.apply(this)}
          {this.span.bind(this)("aStation", "aTime", "date")}
        </Card>
        <div className="seat">{this.seat.apply(this)}</div>
        <ThemeContext.Provider value={{name:'ljm'}}>
        <Mask maskData={this.state.schedule?this.state.schedule:''} click={()=>this.setState({showMask:!this.state.showMask})} visibility={this.state.showMask}></Mask>
        </ThemeContext.Provider>
      </>
    );
  }
  span(val1, val2, val3) {
    if (this.state.TicketData) {
      return (
        <span className="span">
          <p>{this.state.TicketData.trainsInfo[val1]}</p>
          <p>{this.state.TicketData.trainsInfo[val2]}</p>
          <p>
            {this.state.TicketData.trainsInfo[val3].slice(5, 10) +
              "周" +
              "日一二三四五六".charAt(
                new Date(this.state.TicketData.trainsInfo[val3]).getDay()
              )}
          </p>
        </span>
      );
    } else {
      return null;
    }
  }
  spanMid() {
    if (this.state.TicketData) {
      return (
        <span className="span-mid">
          <p>{this.state.TicketData.trainsInfo.trainNumber}</p>
          <p style={{cursor:'pointer'}} onClick={()=>this.setState({showMask:true})}>时刻表</p>
          <p>{"耗时" + this.state.TicketData.trainsInfo.time}</p>
        </span>
      );
    } else {
      return null;
    }
  }
  seat() {
    if (this.state.TicketData) {
      return this.state.TicketData.candidates.map((item, index) => (
        <div key={index} className="seat-item">
          <span onClick={this.clickBar.bind(this,index)}>
            <div>{item.type}</div>
            <div>{"¥" + item.priceMsg}</div>
            <div>{item.ticketsLeft}</div>
            <div>{this.state.activeCard === index?'预订':'收起'}</div>
          </span>
          {/* 过度动画一定要定高 */}
          <span className='animation' style={{width:'100%',height:this.state.activeCard === index?'80px':'0px',overflow:'hidden',transition:'0.5s'}}>
            <div className='animation-item'>
                <div className='animation-item-one'>
                    <div>{item.channels[0].name}</div>
                    <div>{item.channels[0].desc}</div>
                </div>
                <div className='animation-item-two'>
                    <span>买票</span>
                </div>
            </div>
            <div className='animation-item'>
                <div className='animation-item-one'>
                <div>{item.channels[1].name}</div>
                <div>{item.channels[1].desc}</div>
                </div>
                <div className='animation-item-two'>
                <span>买票</span>
                </div>
            </div>
          </span>
        </div>
      ));
    } else {
      return null;
    }
  }
  clickBar(index){
    if(this.state.activeCard ===index){
        this.setState({
            activeCard:''
        })
    }else{
        this.setState({
            activeCard:index
        })
    }
  }
}

export default Ticket;

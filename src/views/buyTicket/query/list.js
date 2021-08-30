import React from 'react';
import QueryData from "./query.json";
import {  withRouter } from 'react-router-dom';

class List extends React.Component{
    render(){
        return(
            QueryData.dataMap.directTrainInfo.trains.map((item, index) => {
                return (
                  <ul className="query-ul" key={index} onClick={this.selectTicket.bind(this,item)}>
                    <li className="query-li">
                      <div className="li-time">
                        <div>{item.dTime}</div>
                        <div>{item.aTime}</div>
                      </div>
                      <div className="li-address">
                        <div>
                          <i className="train-station train-start">始</i>
                          <span>{item.dStation}</span>
                        </div>
                        <div>
                          <i className="train-station train-end">终</i>
                          <span>{item.aStation}</span>
                        </div>
                      </div>
                      <div className="li-type">
                        <div>{item.trainNumber}</div>
                        <div>{item.time}</div>
                      </div>
                      <div className="li-ticket">
                        <div>{item.priceMsg}</div>
                        <div>{item.trainShowDesc}</div>
                      </div>
                    </li>
                  </ul>
                );
              })
        )
    }
    selectTicket(val){
     this.props.history.push({
         pathname:'/buyTicket/ticket',
         query:{
             id:val.sort
         }
     })
    }
}

export default withRouter(List)
import React, { lazy } from "react";
import "./home.scss";
import switchImg from "../static/img/switch.svg";
import { connect } from "react-redux";
import { Switch, Button } from "antd";
const Header = lazy(() => import("../components/header.js"));
const DatePage = lazy(()=>import('./date'))
const CityPage = lazy(()=>import('./city'))






class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        homeShow: "home",
        time:[
            {year:new Date().getFullYear(),month:new Date().getMonth() + 1},
            {year:(new Date().getMonth()+2>12)?(new Date().getFullYear()+1):(new Date().getFullYear()),month:(new Date().getMonth()+2>12)?(new Date().getMonth()+2-12):(new Date().getMonth()+2)},
            {year:(new Date().getMonth()+3>12)?(new Date().getFullYear()+2):(new Date().getFullYear()),month:(new Date().getMonth()+3>12)?(new Date().getMonth()+3-12):(new Date().getMonth()+3)},
            ],
        searchTime:new Date(props.data.departDate).toJSON().slice(0, 10),
        searchWeek:"周" + "日一二三四五六".charAt(new Date().getDay()),
        onlyHighSpeed:false,
        from:props.data.from,
        to:props.data.to,
        toCity:''
    };
  }
 

  componentDidMount() {

  }
  render() {
    if (this.state.homeShow === 'home') {
      return (
        <>
          <Header title="查询"></Header>
          <div className="content">
            <div className="first">
              <div className="place" onClick={() => this.setState({ homeShow: 'city',toCity:'from' })}>{this.props.data.from}</div>
              <div className="img">
                <img src={switchImg} width="70" height="40" alt="switch" onClick={()=>{this.props.Exchange_FromTo()}} />
              </div>
              <div className="place" onClick={() => this.setState({ homeShow: 'city',toCity:'to' })}>{this.props.data.to}</div>
            </div>
            <div
              className="second"
              onClick={() => this.setState({ homeShow: 'date' })}
            >
              <div className="place">
                <div className="date" >{this.state.searchTime}</div>
                <div className="week">
                  &nbsp;&nbsp;
                  {this.state.searchWeek}
                </div>
              </div>
            </div>
            <div className="third">
              <div className="slt">
                <span>只看高铁/动车</span>
                <span>
                  <Switch onChange={this.onChange.bind(this)} />
                </span>
              </div>
              <div className="bt">
                <Button type="primary" ghost size="large" shape="round" block onClick={this.onSearch.bind(this)}>
                  搜索
                </Button>
              </div>
            </div>
            {/* 这里发现redux的dispatch只能改变props里的，不能直接改变state里的 */}
            {/* <div>{this.props.data.from}</div>
            <div onClick={()=>this.props.changeFrom('from','安庆')}>操作</div> */}
          </div>
        </>
      );
    } else if(this.state.homeShow === 'date'){
      return (
        <>
          <Header title="日期选择" back={()=>this.setState({homeShow:'home'})} canBack></Header>
          <DatePage onSelect={this.onSelect.bind(this)} time={this.state.time}></DatePage>
        </>
      );
    }else if(this.state.homeShow === 'city'){
        return (
        <>
          <CityPage back={()=>this.setState({homeShow:'home'})} onSelect={(val)=>{this.setState({homeShow:'home',[this.state.toCity]:val},()=>this.props.changeFrom(this.state.toCity,val))}}></CityPage>
        </>
        )
    }
  }
  onChange(checked){
    this.setState({
        onlyHighSpeed:checked
    })
  }
  onSelect(val){
      //传参为(childItem2+86400000)是因为使用.toJSON().slice(0, 10)获取年月日的时间会少计算一天的时间戳，所以加上一天
      let time=new Date(val+86400000).toJSON().slice(0, 10)
      let week="周" + "日一二三四五六".charAt(new Date(val).getDay())
      this.setState({
          searchTime:time,
          searchWeek:week
      },()=>{
          this.setState({
              homeShow:'home'
          })
      })
  }
  onSearch(){
    this.props.history.push({pathname:'/buyTicket/query',query:{...this.state}})
  }
}

const mapStateToProps = (store) => {
  return {
    data: store.ticket,
    count:store.counter.count
  };
};
  
const mapDispatchToProps=(dispatch) =>{
  return {
      changeFrom: (key,value)=> dispatch({type:'Change',key,value}),
      addCount:()=>dispatch({type:'COUNT_ADD'}),
      Exchange_FromTo:()=>dispatch({type:'Exchange_FromTo'}),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);

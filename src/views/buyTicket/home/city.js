import React from 'react';
import "./home.scss";
import CityData from './city.json'
import { Input } from 'antd';
import { connect } from "react-redux";

class CityPage extends React.Component{
    state={
        //26个字母集合
        alphabet:Array.from(new Array(26), (ele, index) => {return String.fromCharCode(65 + index);}),
        showCity:true,
        fitCities:''
    }
    componentDidMount(){
    }
    render(){
        if(this.state.showCity){
            return (
                <div className="city-bg">
                    <div className="city-header">
                    <div className="city-icon" onClick={()=>this.props.back()}>{'<'}</div>
                    <Input placeholder="城市的中文或拼音" style={{width:'80%'}}  onChange={this.onChange.bind(this)}/>
                    </div>
                    <div className="city-content">
                        <div className="centent-left">
                            {CityData.cityList.map((item,index)=>{
                               return (
                               <ul className='city-ul' key={index}>
                                  <li  className="city-li" data-cate={item.title}>{item.title}</li>
                                  {item.citys?item.citys.map((childItem,childIndex)=>{
                                       return(
                                        <li  className="city-li" key={childIndex} onClick={this.onSelect.bind(this,(childItem.name))}>{childItem.name}</li>
                                       )
                                  }):''}
                               </ul>
                               )
                            })}
                        </div>
                        {/* 右侧字母集快捷搜寻 */}
                        {/* <div className="content-right">
                            {this.state.alphabet.map((item,index)=><i className="city-index-item" key={index} onClick={this.toAlpha.bind(this,item)}>{item}</i>)}
                        </div> */}
                    </div>
                </div>
            )
        }else{
            return this.onSearchPage(this.state.fitCities)
        }
    }
    //到字母位置
    toAlpha(val){
        document.querySelector(`[data-cate='${val}']`).scrollIntoView();
    }
    //城市选择
    onSelect(val){
        this.props.onSelect(val)
    }
    //搜索时候显示的组件
    onSearchPage(val){
       return (
          <div className="city-bg">
            <div className="city-header">
            <div className="city-icon" onClick={()=>this.props.back()}>{'<'}</div>
            <Input placeholder="城市的中文或拼音" style={{width:'80%'}}  onChange={this.onChange.bind(this)}/>
            </div>
            <div className="city-content">
                <div className="centent-left">
                <ul className='city-ul'>
                   {val?val.map((item,index)=>{
                       return (<li  className="city-fit-li" key={index} onClick={this.onSelect.bind(this,(item))}>{item}</li>)
                   }):''}
                </ul>
                </div>
            </div>
        </div>
       )
    }
    //搜索框改变
    onChange(e){
        if(e.target.value){
            this.setState({showCity:false},()=>{this.setState({fitCities:this.props.cities.filter((item)=>item.includes(e.target.value))})})
        }else{
            this.setState({showCity:true})
        }
    }

}

const mapStateToProps = (store) => {
    return {
      cities: store.ticket.cities,
    };
  };
  
  const mapDispatchToProps=(dispatch) =>{
    return {
        changeCities: (val)=> dispatch({type:'Add_Cities',playload:val}),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(CityPage)
import React from 'react'
import ChildMask from './childMask'

function Mask(props){
    return(
        <div className='mask' onClick={()=>props.click()} style={{visibility:props.visibility?'visible':"hidden"}}>
            <div className='mask-item'>
                <div className='item-header'>列车时刻表</div>
                <div className='item-common item-title'><span>车站</span><span>到达</span><span>发车</span><span>停留时间</span></div>
                {/* <div className='item-common item-content'><span>{props.station}</span><span>{props.arriveTime?props.arriveTime:'始发站'}</span><span>{props.departTime?props.departTime:'终点站'}</span><span>{props.stay?props.stay:'-'}</span></div> */}
                {props.maskData?props.maskData.map((item,index)=>{
                    return(<div key={index} className='item-common item-content'><span style={{color:`${index===0||index===2?'red':''}`}}>{item.station}</span><span style={{color:`${index===2?'red':''}`}}>{item.arriveTime?item.arriveTime:'始发站'}</span><span style={{color:`${index===0?'red':''}`}}>{item.departTime?item.departTime:'终点站'}</span><span>{item.stay?item.stay:'-'}</span></div>)
                }):''}
                <ChildMask></ChildMask>
            </div>
        </div>
    )
}

export default Mask
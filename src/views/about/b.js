import React, {memo} from 'react'
// const B =memo((props)=>{
//     console.log('B')
//     return <div>B</div>
//  })
 class B extends React.Component{
     // eslint-disable-next-line 
     constructor(props){
         super(props)
     }
     test(){
         console.log('test')
     }
      //nextProps是下次渲染用到的props
  shouldComponentUpdate(nextProps, nextState) {
    //将下次渲染用到的props和当前props对比
    //对比要具体到某个值
    if (nextProps.b === this.props.b) {
      return false;//返回false则当前组件不会被重新渲染
    }
    return true;//返回true则当前组件需要被重新渲染
  }
     render(){
        return <div onClick={()=>this.props.add()}>{this.props.b}{console.log('B页面数据变化')}</div>
     }
 }
 
 export default B
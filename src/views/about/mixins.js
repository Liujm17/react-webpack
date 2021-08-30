import React, { Component } from 'react'
export const withMixins =ChildComponent=>{
   return class extends Component{
    constructor(props){
       super(props)
       this.state={
           name:'ljm',
           age:20
       }
    }
    componentDidMount(){
        console.log('this is mixins')
    }
    test(){
        console.log('test')
    }
    render(){
        return <ChildComponent {...this.props} test={this.test.bind(this)}/>
    }
   }
}
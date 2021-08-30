import React from 'react'
import { Route, withRouter,Redirect} from "react-router-dom"
import { connect } from "react-redux"
// import { message } from 'antd';
const AuthRouter = ({ Component, ...props }) => {
    if (props.token) {
        console.log('有权限')
        return <Route {...props} componet={Component} />
    } else {
        console.log('没有权限')
        // message.warning('你还没有登录，淘气鬼，让我把你送回去吧！');
        return <Redirect to={{ pathname: "/login" }} />
    }
};

//   创建映射函数读取redux中保存用户登录状态
const mapStateToProps = function (state) {
    return {
        token: state.post.token
    }
}
export default connect(mapStateToProps)(withRouter(AuthRouter))
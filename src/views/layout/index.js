import React, {  lazy } from 'react'
import "./index.scss";
import { Menu } from "antd";
import {  withRouter,Route, Switch, Redirect } from 'react-router-dom';
import {
  MailOutlined,
} from "@ant-design/icons";
import SuspenseComponent from '../../utils/router'
import {routes,redirect} from '../../routes'
// const Home = lazy(() => import("../home"));
// const About = lazy(() => import("../about"));
// const Test = lazy(() => import("../test"));
// const AntdPage = lazy(() => import("../antdPage"));
// const BuyTicket = lazy(() => import("../buyTicket"));

const { SubMenu } = Menu;

class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page:'home'
        }
    }
  handleClick = (e) => {
    // eslint-disable-next-line
        this.props.history.push(`/${e.key}`)
        this.setState({
            page:e.key
        })
  };
  UNSAFE_componentWillMount(){
    this.setState({
        page:this.props.location.pathname.split('/')[1]
    },()=>{
        // console.log(this.state)
    })
  }
  render() {
    return (
      <div className="layout-bg">
        <div className="layout-header">
            <span>财务管理系统</span>
            <span>{new Date().toJSON().slice(0,10)}</span>
            <span>用户xxx</span>
        </div>
        <div className="layout-left">
          <Menu
            onClick={this.handleClick}
            style={{ width: "100%", height: "100%" }}
            defaultSelectedKeys={[this.state.page]}
            defaultOpenKeys={["sub3"]}
            mode="inline"
          >
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="home" title="Item 1">Home</Menu.Item>
              <Menu.Item key="about" title="Item 2">About</Menu.Item>
              <Menu.Item key="test" title="Item 3">Test</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<MailOutlined />} title="UI使用">
              <Menu.Item key="antdPage" title="Item 1">antd</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<MailOutlined />} title="自写项目">
              <Menu.Item key="buyTicket" title="Item 1">购票</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<MailOutlined />} title="组件库">
              <Menu.Item key="component" title="Item 1">组件库</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="layout-content">
        <Switch>
          {routes.map((item,index)=>{
            return(<Route key={index} path={item.path} component={SuspenseComponent(item.component)} />)
          })}
           <Redirect to={redirect} from="/" />
        </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Layout)

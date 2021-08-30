//aixos配置，请求拦截器
import axios from 'axios'

const http = axios.create({
    baseURL : 'http://localhost:80',
    timeout: 3000
})

//请求拦截
http.interceptors.request.use(config => {
    config.headers['content-type']='application/json; charset=utf-8'
  return config
}, err => {
  alert(error)
  // console.log("err",err);
  return Promise.reject(err)
})

//响应拦截处理
http.interceptors.response.use(response => {
  // console.log(response.data);
  //如果返回401,则清除token,跳转登录
  if (response.data.code === 401) {
    // sessionStorage.removeItem('Authorization');
    // sessionStorage.removeItem('userInfo');
    console.log('401')
    return;
  }
  return response
}, error => {
  if (error && error.response) {
    if (error.response.status === 403) {
      alert('用户登陆信息失效')
    } else if (error.response.status === 404) {
      alert('找不到目录')
    } else if(error.response.status === 401){
        alert('用户登陆信息失效')
    }else{
      alert(error)
    }
  }
  return Promise.reject(error)
})

export default http
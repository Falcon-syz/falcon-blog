import axios from "axios"
// import spinner from "@/components/spinner"


const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: 'http://www.sunyazheng.com:3000',
    timeout: 7000
});

// const a = spinner.data()

//请求拦截器
// request.interceptors.request.use(config => {
//     a.loading = false
//     console.log(a)
//     return config
// }, error => {
//     a.loading = false
//     return Promise.reject(error);
// })

// 响应拦截器 
// request.interceptors.response.use(response => {
//     a.loading = false
//     return response
// }, error => {
//     a.loading = false
//     return Promise.reject(error);
// })

export default request
import axios from 'axios' 

// 创建axios实例
const service = axios.create({ 
    baseURL: `/api`,
    // 设置超时时间，如果该时间内，还是没有响应，则请求失败，开发的时候可以调大一点
    timeout: 1000000
})

// request拦截器
service.interceptors.request.use(config => {

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            var part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    return res.data
}, error => {
    return Promise.reject(error)
}
)
export default service

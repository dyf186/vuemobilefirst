import axios from "axios";
import JSONBig from "json-bigint";
import router from "@/router/index.js";
import store from "@/store";
const instance = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/",
    transformResponse: [
        function(data) {
            try {
                return JSONBig.parse(data);
            } catch (err) {
                return data;
            }
        }
    ]
});
// 在请求拦截器中注入token
instance.interceptors.request.use(
    function(config) {
        if (store.state.user.token) {
            config.headers.Authorization = "Bearer" + store.state.user.token;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
// 在响应拦截器处理返回数据,401处理
// instance.interceptors.response.use(
//     function(response) {
//         try {
//             return response.data.data;
//         } catch (err) {
//             return response.data;
//         }
//     },
//     async function(error) {
//         if (error.response.status === 401) {
//             if (!store.state.user.refresh_token) {
//                 router.push("/login");
//                 return Promise.reject(error);
//             }
//             try {
//                 const result = await axios({
//                     method: "put",
//                     url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
//                     headers: {
//                         Authorization: `Bearer ${store.state.user.refresh_token}`
//                     }
//                 });
//                 store.commit("updateUser", {
//                     token: result.data.data.token,
//                     refresh_token: store.state.user.refresh_token
//                 });
//                 return instance(error.config);
//             } catch (err) {
//                 store.commit("clearUser");
//                 router.push("/login");
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// 配置【响应拦截器】
instance.interceptors.response.use(function(response) {
    // 正常响应处理
    // 有时返回data、有时返回data.data
    try {
        // data.data如果报错，没有获得到，错误信息会被catch步骤，就走data了
        return response.data.data
    } catch (err) {
        return response.data
    }
}, async function(error) {
    // 响应有错误，有可能错误状态码为401
    if (error.response.status === 401) {
        // 如果refresh_token不存在
        if (!store.state.user.refresh_token) {
            router.push('/login')
            return Promise.reject(error)
        }

        try {
            // 刷新用户token
            // 应该发送一个请求 换取新的token
            // 这里不应该再用instance  因为 instance会再次进入拦截器  用默认的axios

            // token2小时已经失效，但是refresh_token 在客户端存在，不确定是否失效，此时要通过新的axios带着
            // refresh_token，向服务器端发请求，有可能把token的时效给刷新一次
            // 执行新的axios，不要执行instance了，其为401错误的状态信息
            // 接口：【刷新用户token】
            const result = await axios({
                    method: 'put',
                    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
                    // 配置token
                    headers: {
                        Authorization: `Bearer ${store.state.user.refresh_token}`
                    }
                })
                // 获取到新token后，就对vuex和localStorage进行更新
                // 注意：axios通过refresh_token向服务器端发送请求，返回的数据信息中只有token，
                //      没有refresh_token
            store.commit('updateUser', {
                    token: result.data.data.token, // 拿到新的token之后
                    refresh_token: store.state.user.refresh_token // 将之前 refresh_token 获取使用
                })
                // error.config对象中存有之前失败请求的所有参数信息
                // 例如url、method、data等等
                // console.dir(error)
            return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
                // instance({url:xx,method:xx,data:xx})
        } catch (err) {
            // 如果错误 表示补救措施也没用了(有可能refresh_token也失效了)
            // 应该跳转到登录页 并且 把废掉的用户信息全都干掉
            store.commit('clearUser') // 所有的用户信息清空
            router.push('/login') // 跳转到回登录页
            return Promise.reject(err)
        }
    }
    return Promise.reject(error)
})
export default instance;
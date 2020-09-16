import axios from "axios";
import JSONBig from "json-bigint";
import store from "@/store";
import router from "@/router/index.js";
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
instance.interceptors.response.use(
    function(response) {
        try {
            return response.data.data;
        } catch (err) {
            return response.data;
        }
    },
    async function(error) {
        if (error.response.status === 401) {
            if (!store.state.user.refresh_token) {
                router.push("/login");
                return Promise.reject(error);
            }
            try {
                const result = await axios({
                    method: "put",
                    url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
                    headers: {
                        Authorization: `Bearer ${store.state.user.refresh_token}`
                    }
                });
                store.commit("updateUser", {
                    token: result.data.data.token,
                    refresh_token: store.state.user.refresh_token
                });
                console.dir(error);
                return instance(error.config);
            } catch (err) {
                store.commit("clearUser");
                router.push("/login");
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
export default instance;
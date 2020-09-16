// 导入axios模块
import instance from "@/utils/request.js";

export function apiUserLogin({ mobile, code }) {
    return instance({
        url: "/app/v1_0/authorizations",
        method: "post",
        data: {
            mobile,
            code
        }
    });
}
// 导入axios模块
import request from "@/utils/request.js";

export function apiUserLogin({ mobile, code }) {
    return request({
        url: "/app/v1_0/authorizations",
        method: "post",
        data: {
            mobile,
            code
        }
    });
}
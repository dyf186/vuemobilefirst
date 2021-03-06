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
// 关注
export function apiFollow(target) {
    return request({
        url: "/app/v1_0/user/followings",
        method: "post",
        data: {
            target
        }
    });
}
/**
 * 关注作者
 * @param {target} 被关注用户id
 */
export function apiUserFollow(target) {
    return request({
        url: "/app/v1_0/user/followings",
        method: "post",
        data: {
            // 成员简易赋值 target:target
            target: target
        }
    });
}

// 取消关注
export function apiUnFollow(target) {
    return request({
        url: `/app/v1_0/user/followings/${target}`,
        method: "delete"
    });
}
/**
 * 取消关注作者
 * @param {target} 取消关注用户id
 */
export function apiUserUnFollow(target) {
    return request({
        url: `/app/v1_0/user/followings/${target}`,
        method: "delete"
    });
}
// 获取用户信息
export const apiUserInfo = () => {
    return request({
        url: `/app/v1_0/user`,
        method: "GET"
    });
};
// 获取用户个人资料
export function apiUserProfile() {
    return request({
        url: "/app/v1_0/user/profile",
        method: "get"
    });
}
// 编辑用户照片资料
export function apiUserPhoto(fdObj) {
    return request({
        url: "/app/v1_0/user/photo",
        method: "patch",
        data: fdObj
    });
}
// 更新用户资料
export function apiSaveProfile({ name, gerder, birthday }) {
    return request({
        url: "/app/v1_0/user/profile",
        method: "patch",
        data: {
            name,
            gerder,
            birthday
        }
    });
}
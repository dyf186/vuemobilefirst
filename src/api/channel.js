import store from '@/store'
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KEY_VIP = 'hm-channel-vip' // 登录用户key
import request from "@/utils/request.js";
export function apiChannelList() {
    return new Promise(async(resolve) => {
            const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL
            const localChannels = localStorage.getItem(key)
            if (localChannels) {
                resolve({ channels: JSON.parse(localChannels) })
            } else {
                const result = await request({
                    url: "/app/v1_0/user/channels",
                    method: "get"
                });
                localStorage.setItem(key, JSON.stringify(result.channels))
                resolve(result)
            }
        })
        // return request({
        //     url: "/app/v1_0/user/channels",
        //     method: "get"
        // });
}
export function apiChannelAll() {
    return request({
        url: '/app/v1_0/channels',
        method: 'get'
    })
}
import request from '@/utils/request'
export function apiSuggestionList({ q }) {
    return request({
        url: '/app/v1_0/suggestion',
        method: 'get',
        params: {
            q
        }
    })
}
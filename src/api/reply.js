import request from "@/utils/request.js";
export function apiReplyList({ commentID, lastID }) {
    return request({
        url: '/app/v1_0/comments',
        method: 'get',
        params: {
            type: 'c',
            source: commentID,
            offset: lastID,
            limit: 10
        }
    })
}
// export function apiAddCorR({ target, content, art_id = null }) {
//     return request({
//         url: '/app/v1_0/comments',
//         method: 'POST',
//         data: {
//             target,
//             content,
//             art_id
//         }
//     })
// }
export function apiAddCorR({ target, content, art_id = null }) {
    return request({
        url: '/app/v1_0/comments',
        method: 'POST',
        data: {
            target,
            content,
            art_id
        }
    })
}
import request from "@/utils/request.js";
export function apiCommentList({ articleID, commentID }) {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params: {
            type: 'a',
            source: articleID,
            offset: commentID,
            limit: 10
        }
    })
}
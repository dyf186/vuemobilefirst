import request from "@/utils/request.js";
export function apiArticleList({ channel_id, timestamp }) {
    return request({
        url: "/app/v1_1/articles",
        method: "get",
        params: {
            channel_id,
            timestamp,
            with_top: 1
        }
    });
}
// 不感兴趣
export function apiArticleDislike(articleID) {
    return request({
        url: "/app/v1_0/article/dislikes",
        method: "post",
        data: {
            target: articleID
        }
    });
}
// 举报文章
export function apiArticleReport({ articleID, type, remark = "" }) {
    return request({
        url: "/app/v1_0/article/reports",
        method: "post",
        data: {
            target: articleID,
            type,
            remark
        }
    });
}
// 文章详情
export function apiArticleDetail(articleID) {
    return request({
        url: '/app/v1_0/articles/' + articleID,
        method: 'get'
    })
}
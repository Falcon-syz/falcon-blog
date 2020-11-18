import request from "@/utils/request"

export default {
    //提交文章
    postEssay(content) {
        return request({
            url: `essay/back`,
            method: "post",
            data: { "content": content }
        })
    },
    // 删除文章
    delEssay(id) {
        return request({
            url: `essay/?id=${id}`,
            method: "delete",
        })
    },
    // 编辑文章
    editEssay(id, data) {
        return request({
            url: `essay/?id=${id}`,
            method: "put",
            data: { newEssay: data }
        })
    },
    //获取文章列表
    getEssay(tag, pubDate, keyWords) {
        return request({
            url: `essay/?tag=${tag}&pubDate=${pubDate}`,
            method: "post",
            data: { keyW: keyWords }
        })
    },
    // //后台获取文章列表
    // getEssayBack() {
    //     return request({
    //         url: `/essay/list/`,
    //         method: "get",
    //     })
    // },
    //通过id查询文章
    findEssay(id) {
        return request({
            url: `essay/?id=${id}`,
            method: "get",
        })
    },
    // 提交评论
    putComments(id, userId, username, userImg, pubTime, data) {
        return request({
            url: `essay/comments/?id=${id}&userId=${userId}&username=${username}&userImg=${userImg}&pubTime=${pubTime}`,
            method: "post",
            data: { 'content': data }
        })
    },
    //删除评论
    delComments(id) {
        return request({
            url: `essay/comments/?id=${id}`,
            method: "delete",
        })
    }
}
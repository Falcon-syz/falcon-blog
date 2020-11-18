import request from "@/utils/request"

export default {
    // 获取留言
    getMsg() {
        return request({
            url: "msgBoard",
            method: "get",
        })
    },
    // 新增留言
    addMsg(username, userImg, content, pubDate) {
        return request({
            url: "msgBoard",
            method: "post",
            data: {
                "username": username,
                "userImg": userImg,
                "content": content,
                "pubTime": pubDate
            }
        })
    },
    // 删除留言
    delMsg(id) {
        return request({
            url: `msgBoard/?id=${id}`,
            method: "delete",
        })
    },
}
import request from "@/utils/request"

export default {
    // 获取头像
    getHeadImg() {
        return request({
            url: "headimg",
            method: "get",
        })
    },
    // 更新头像
    updateHeadImg(user, url) {
        return request({
            url: `headimg/?url=${url}`,
            method: "put",
            data: { "user": user }
        })
    },
}
import request from "@/utils/request"

export default {
    // 更新浏览量
    updatePV() {
        return request({
            url: "pv",
            method: "put",
        })
    },
    // 获取浏览量
    getPV() {
        return request({
            url: "pv",
            method: "get",
        })
    },

}
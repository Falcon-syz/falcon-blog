import request from "@/utils/request"

export default {
    // 获取标签
    getTags() {
        return request({
            url: "tags",
            method: "get",
        })
    },
    // 新增标签
    addTags(content) {
        return request({
            url: "tags",
            method: "post",
            data: { tagName: content }
        })
    },
    // 删除标签
    delTag(content) {
        return request({
            url: `tags/?tagName=${content }`,
            method: "delete",
        })
    }
}
import request from "@/utils/request"

export default {
    // 获取随笔
    getNotes() {
        return request({
            url: "notes",
            method: "get",
        })
    },
    // 新增随笔
    addNotes(content) {
        return request({
            url: "notes",
            method: "post",
            data: { "content": content }
        })
    },
    // 删除随笔
    delNotes(id) {
        return request({
            url: `notes/?id=${id}`,
            method: "delete",
        })
    }
}
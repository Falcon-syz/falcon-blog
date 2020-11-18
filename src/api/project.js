import request from "@/utils/request"

export default {
    getProject() {
        return request({
            url: "project",
            method: "get",
        })
    },
    editProject(id, data) {
        return request({
            url: `project/?id=${id}`,
            method: "put",
            data: { "data": data }
        })
    },
    delProject(id) {
        return request({
            url: `project/?id=${id}`,
            method: "delete",
        })
    },
    addProject(data) {
        return request({
            url: "project",
            method: "post",
            data: { "project": data }
        })
    }
}
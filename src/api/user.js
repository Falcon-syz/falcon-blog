import request from "@/utils/request"

export default {
    userLogin(user) {
        return request({
            url: "user/login",
            method: "post",
            data: { "userData": user }
        })
    },

    getUser(token) {
        return request({
            url: `user/${token}`,
            method: "get"
        })
    },
    userRegister(form) {
        return request({
            url: "user/register",
            method: "post",
            data: { "userMsg": form }
        })
    },
    getAllUsers() {
        return request({
            url: `user`,
            method: "get"
        })
    },
    delUser(id) {
        return request({
            url: `user/?id=${id}`,
            method: "delete"
        })
    }
}
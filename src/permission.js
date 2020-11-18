import router from "./router"
import pv from "./api/webdata"

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem("blog-user"))
    if (to.path == "/back" || to.path == "/back/essayList" || to.path == "/back/" || to.path == "/back/msgBd" || to.path == "/back/note" || to.path == "/back/proj" || to.path == "/back/tags" || to.path == "/back/users" || to.path == "/back/writeEssay") {
        if (user) {
            if (user.roles == "admin") {
                next()
            } else {
                next({ path: "/" })
            }
        } else {
            next({ path: "/" })
        }
    } else {
        next()
    };

    if (to.path == "/") {
        pv.updatePV().then(response => {
            const resp = response.data
            console.log(resp)
        })
        next()
    }
})
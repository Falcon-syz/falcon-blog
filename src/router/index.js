import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/home";
import about from "@/views/about";
import msgBoard from "@/views/msgBoard";
import project from "@/views/project";
import notes from "@/views/notes";
import essayDetail from "../views/essayDetail";
import indexLayout from "@/components/indexLayout";
import back from "@/components/back";
import essayList from "@/views/back/essayList";
import msgBd from "@/views/back/msgBd";
import note from "@/views/back/note";
import proj from "@/views/back/proj";
import tags from "@/views/back/tags";
import users from "@/views/back/users";
import writeEssay from "@/views/back/writeEssay";
import backHome from "@/views/back/home";




Vue.use(VueRouter);

const routes = [
  {
    path: "/back",
    component: back,
    
    children: [
      {
        path: "/",
        name: "backHome",
        component: backHome,
        meta: { title: "首页" }
      },
      {
        path: "essayList",
        name: "essayList",
        component: essayList,
        meta: { title: "文章列表" }
      },
      {
        path: "msgBd",
        name: "msgBd",
        component: msgBd,
        meta: { title: "留言管理" }
      },
      {
        path: "note",
        name: "note",
        component: note,
        meta: { title: "随笔管理" }
      },
      {
        path: "proj",
        name: "proj",
        component: proj,
        meta: { title: "项目管理" }
      },
      {
        path: "tags",
        name: "tags",
        component: tags,
        meta: { title: "标签管理" }
      },
      {
        path: "users",
        name: "users",
        component: users,
        meta: { title: "用户管理" }
      },
      {
        path: "writeEssay",
        name: "writeEssay",
        component: writeEssay,
        meta: { title: "写文章" }
      }]
  },
  {
    path: "/",
    component: indexLayout,
    children: [
      {
        path: "/about",
        name: "about",
        component: about
      },
      {
        path: "/",
        name: "Home",
        component: home
      },
      {
        path: 'essayDetail/:id',
        component: essayDetail
      },
      {
        path: "msgBoard",
        name: "msgBoard",
        component: msgBoard
      },
      {
        path: "project",
        name: "project",
        component: project
      },
      {
        path: "notes",
        name: "notes",
        component: notes
      }
    ]
  },

];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;

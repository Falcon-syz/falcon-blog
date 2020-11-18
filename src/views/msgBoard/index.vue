<template>
  <b-container class="homeMain">
    <b-row>
      <b-col v-loading="loading">
        <form ref="textarea">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="留个言吧..."
            rows="3"
            trim
            :state="valid"
            required
          ></b-form-textarea>
        </form>
        <b-button
          v-b-modal.modal-prevent-closing
          variant="info"
          class="mx-auto"
          style="display:block;margin-bottom:10px;margin-top:10px"
          v-show="islogin==false"
        >登陆评论</b-button>
        <b-container style="margin:10px 0px" v-show="islogin==true">
          <b-row align-content="center">
            <b-col style="text-align:right">
              <b-button variant="outline-primary" @click="postClick">
                <b-icon icon="pen"></b-icon>留个言
              </b-button>
            </b-col>
            <b-col>
              <b-button variant="outline-secondary" @click="text='';valid=null">
                <b-icon icon="arrow-counterclockwise"></b-icon>清空
              </b-button>
            </b-col>
          </b-row>
        </b-container>

        <!-- 留言列表 -->
        <b-list-group>
          <b-list-group-item
            class="flex-column align-items-start"
            v-for="item in msgList"
            :key="item.id"
          >
            <div class="d-flex w-100 justify-content-between">
              <div>
                <b-img v-bind="mainProps" rounded alt="Rounded image" :src="url+item.userImg"></b-img>
                <span style="padding-left:0.5rem">{{item.username}}</span>
              </div>

              <small>{{item.pubDate}}</small>
            </div>

            <p class="mb-1">{{item.content}}</p>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import msg from "@/api/msgBoard";
import PubSub from "pubsub-js";
import msgDb from "../../db/msgBoard";

export default {
  methods: {
    //   时间格式化
    dateFormat: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },

    postClick() {
      this.valid = this.$refs.textarea.checkValidity();
      if (this.valid) {
        this.addMsg();
      } else {
        return;
      }
    },
    addMsg() {
      var user = JSON.parse(localStorage.getItem("blog-user"));
      if (user) {
        var username = user.name;
        var userImg = user.img;
        // console.log(user, username, userImg);
        var pubTime = this.dateFormat(new Date());
        msg.addMsg(username, userImg, this.text, pubTime).then(response => {
          const resp = response.data;
          if (resp.flag) {
            // this.msgList = resp.msg;
            this.$message({
              message: resp.message,
              type: "success"
            });
            this.getMsg();
          } else {
            this.$message({
              message: resp.message,
              type: "error"
            });
          }
        });
      }
    },

    getMsg() {
      this.loading = true;
      msg.getMsg().then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.msgList = resp.msg;
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.getMsg();
    if (localStorage.getItem("blog-user")) {
      this.islogin = true;
    } else {
      this.islogin = false;
    }
    PubSub.subscribe("islogin", (msg, loginState) => {
      console.log(loginState, "收到订阅");
      this.islogin = loginState;
    });
  },
  data() {
    return {
      url: process.env.VUE_APP_SERVICE_URL,
      loading: null,
      msgList: msgDb,
      mainProps: {
        // blank: true,
        // blankColor: "#777",
        width: 50,
        height: 50,
        class: "m1"
      },
      text: "",
      valid: null,
      islogin: null
    };
  }
};
</script>
<style lang="less" scoped>
.homeMain {
  background-color: #ffffff;
  margin: 2rem auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>

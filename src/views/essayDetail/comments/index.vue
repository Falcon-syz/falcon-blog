<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button
          v-b-modal.modal-prevent-closing
          variant="info"
          class="mx-auto"
          style="display:block;margin-bottom:10px"
          v-show="islogin==false"
        >登陆评论</b-button>
        <form ref="textarea">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            trim
            :state="valid"
            required
          ></b-form-textarea>
        </form>
        <b-container style="margin-top:10px" v-show="islogin==true">
          <b-row align-content="center">
            <b-col style="text-align:right">
              <b-button variant="outline-primary" @click="pubComments">发表</b-button>
            </b-col>
            <b-col>
              <b-button variant="outline-secondary" @click="text='';valid=null">清空</b-button>
            </b-col>
          </b-row>
        </b-container>

        <ul>
          <li v-for="item in thisComments" :key="item.id">
            <b-img
              rounded
              alt="Rounded image"
              width="55"
              height="55"
              :src="url+item.commenterImg"
              style="margin-right:10px"
            ></b-img>
            <div class="comment" style="display:inline-block">
              <div class="commterName">
                <a href="javascript:;">{{item.commenterName}}</a>
              </div>
              <div class="commTime">
                <a href="javascript:;">{{item.pubTime}}</a>
              </div>
            </div>
            <div>
              <p style="line-height:60px">{{item.content}}</p>
            </div>
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-img :src="src"></b-img>
  </b-container>
</template>
<script>
import essay from "@/api/essay";
import PubSub from "pubsub-js";
export default {
  created() {
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
  watch: {
    essayComments(newVal) {
      this.thisComments = newVal;
    }
  },
  props: {
    essayComments: {
      type: Array
    },
    essayId: {
      type: String
    }
  },
  data() {
    return {
      url: process.env.VUE_APP_SERVICE_URL,
      islogin: null,
      thisComments: [],
      text: "",
      src: require("../../../assets/ggif.gif"),
      valid: null
    };
  },
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

    //提交评论
    pubComments() {
      const vd = this.$refs.textarea.checkValidity();
      this.valid = vd;

      if (this.valid) {
        // console.log(this.essayId);
        this.valid = null;
        const userMsg = JSON.parse(localStorage.getItem("blog-user"));
        // console.log(userMsg);
        var time1 = new Date();
        var time2 = this.dateFormat(time1);
        console.log(time2, new Date());
        essay
          .putComments(
            this.essayId,
            userMsg.id,
            userMsg.name,
            userMsg.img,
            time2,
            this.text
          )
          .then(response => {
            const resp = response.data;
            if (resp.flag) {
              //刷新评论，获取文章信息
              essay.findEssay(this.essayId).then(response => {
                const resp = response.data;
                if (resp.flag) {
                  console.log(resp, "文章信息");
                  this.thisComments = resp.comments;
                }
              });
              this.$message({
                message: resp.message,
                type: "success"
              });
            } else {
              this.$message({
                message: resp.message,
                type: "error"
              });
            }
          });
      } else {
        return false;
      }
      this.text = "";
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  li {
    border-top: 1px solid rgb(238, 238, 238);
    display: block;
    margin-top: 20px;
    padding-top: 10px;
    .comment {
      height: 50px;

      .commterName {
        font-size: 0.8rem;
        a {
          height: 20px;
          padding-top: 10px;
          display: block;
          color: rgb(45, 54, 66);
          text-decoration: none;
          &:hover {
            color: rgb(23, 162, 184);
          }
        }
      }
      .commTime {
        font-size: 0.8rem;
        a {
          color: gray;
          display: block;
          height: 10px;
          transform: translateY(10px);
          text-decoration: none;
          &:hover {
            color: rgb(23, 162, 184);
          }
        }
      }
    }
  }
}
</style>
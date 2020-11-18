<template>
  <b-container fluid style="position : relative" id="title">
    <!-- 内部容器 -->
    <b-container>
      <!-- 行 -->
      <b-row align-v="center">
        <!-- 文字部分 -->
        <b-col md="4" class="py-3">
          <label style="margin-bottom:0;color:rgb(170, 173, 177)">HAPPY TO SEE U</label>
        </b-col>
        <!-- 链接部分 -->
        <b-col md="2" offset-md="4" class="pb-1">
          <a href="javascript:;">友链</a>
          <router-link to="/about">关于</router-link>
          <a href="javascript:;">技术链</a>
          <b-link to="/back" v-if="identity=='admin'">后台管理</b-link>
        </b-col>
        <!-- 搜索栏 -->
        <b-col md="2" class="py-3" style="width:12rem;">
          <b-input-group class="pt-0">
            <b-form-input size="sm" v-model="keyWords"></b-form-input>
            <b-input-group-append>
              <b-button size="sm" variant="light" @click="pubkeyWords">
                <b-icon icon="search"></b-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
    <!-- login -->
    <b-button
      v-b-modal.modal-prevent-closing
      class="headImg"
      variant="outline-light"
      v-show="islogin==false"
    >LOGIN</b-button>
    <b-img
      id="userImg"
      v-show="islogin==true"
      class="headImg"
      v-bind="mainProps"
      :src="url+userImgUrl"
      rounded
      alt="Rounded image"
      style="cursor:pointer"
    ></b-img>
    <b-popover target="userImg" triggers="hover" placement="bottom">
      <!-- <template v-slot:title>退出登录</template> -->
      <b-button variant="danger" @click="logout" style="margin-bottom:1rem">退出登录</b-button>
      <br />
      <b-button variant="outline-primary" @click="dialogHeadVisible=true;fetchHead()">换个头像</b-button>
    </b-popover>
    <el-dialog
      title="选择头像"
      :visible.sync="dialogHeadVisible"
      :fullscreen="isFullScreen"
      @close="dialogClose"
    >
      <b-container>
        <b-row>
          <b-col cols="3" md="2" v-for="item in headimgurl" :key="item.id">
            <el-radio v-model="currentUrl" :label="item.imgUrl">
              <el-image
                style="width: 70px; height: 70px"
                :src="url + item.imgUrl"
                fit="fill"
                class="headerCheck"
              ></el-image>
            </el-radio>
          </b-col>
        </b-row>
      </b-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogHeadVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHeadImg">确 定</el-button>
      </div>
    </el-dialog>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Hello World!"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-tabs content-class="mt-3" fill>
        <b-tab title="登录" active @click="islog = true">
          <!-- 登陆表单 -->
          <form ref="logForm" @submit.stop.prevent="logSubmit">
            <b-form-group
              :state="loginNameState"
              label-for="login-name-input"
              invalid-feedback="账号不能为空"
            >
              <b-form-input
                id="login-name-input"
                v-model="loginName"
                :state="loginNameState"
                :formatter="formatter"
                required
                trim
                placeholder="账号"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              :state="loginPwdState"
              label-for="login-pwd-input"
              invalid-feedback="密码不能为空"
            >
              <b-form-input
                id="login-pwd-input"
                v-model="loginPwd"
                :state="loginPwdState"
                :type="'password'"
                :formatter="formatter"
                required
                trim
                placeholder="密码"
              ></b-form-input>
            </b-form-group>
          </form>
        </b-tab>
        <b-tab title="注册" @click="islog = false" id="reg">
          <!-- 注册表单 -->
          <form @submit.prevent="submit">
            <!-- 账号 -->
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
              <input
                @keyup="name=name.replace(/[\u4e00-\u9fa5]/ig,'')"
                class="form__input"
                v-model.trim="name"
                @input="setName($event.target.value)"
                placeholder="账号"
              />
              <div class="default" v-if="!$v.name.required">请输入账号</div>
              <div
                class="error"
                v-if="!$v.name.minLength||!$v.name.maxLength"
              >长度需在 {{$v.name.$params.minLength.min}} 到 {{$v.name.$params.maxLength.max}} 字符之间.</div>
            </div>

            <!-- 密码 -->
            <div class="form-group" :class="{ 'form-group--error': $v.pwd.$error }">
              <input
                @keyup="name=name.replace(/[\u4e00-\u9fa5]/ig,'')"
                class="form__input"
                v-model.trim="pwd"
                @input="setPwd($event.target.value)"
                placeholder="密码"
                type="password"
              />
              <div class="default" v-if="!$v.pwd.required">请输入密码</div>
              <div
                class="error"
                v-if="!$v.pwd.minLength||!$v.pwd.maxLength"
              >长度需在 {{$v.pwd.$params.minLength.min}} 到 {{$v.pwd.$params.maxLength.max}} 字符之间.</div>
            </div>

            <!-- 确认密码 -->
            <div class="form-group" :class="{ 'form-group--error': $v.pwdd.$error }">
              <input
                @keyup="name=name.replace(/[\u4e00-\u9fa5]/ig,'')"
                class="form__input"
                v-model.trim="pwdd"
                @input="setPwdd($event.target.value)"
                placeholder="确认密码"
                type="password"
              />
              <div class="error" v-if="!$v.pwdd.sameAsPassword">两次输入密码不一致</div>
              <div class="default" v-if="!$v.pwdd.required">请确认密码</div>
            </div>

            <!-- 昵称 -->
            <div class="form-group" :class="{ 'form-group--error': $v.username.$error }">
              <input
                class="form__input"
                v-model.trim="username"
                @input="setUsername($event.target.value)"
                placeholder="昵称"
              />
              <div class="default" v-if="!$v.username.required">请输入昵称</div>
              <div
                class="error"
                v-if="!$v.username.minLength||!$v.username.maxLength"
              >长度需在 {{$v.username.$params.minLength.min}} 到 {{$v.username.$params.maxLength.max}} 字符之间.</div>
            </div>
          </form>
        </b-tab>
      </b-tabs>
    </b-modal>
  </b-container>
</template>
<script>
import headimg from "@/api/headImg";
import user from "@/api/user";
import PubSub from "pubsub-js";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  mounted() {
    //获取屏幕可使宽度
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  computed: {
    isFullScreen() {
      return this.screenWidth < 992;
    }
  },
  created() {
    window.screenWidth = document.body.clientWidth;
    this.screenWidth = window.screenWidth;

    this.loaclLogin();
    const user = JSON.parse(localStorage.getItem("blog-user"));
    if (user) {
      this.identity = user.roles;
    } else {
      return;
    }
  },
  watch: {
    islogin() {
      this.pub();
    }
  },

  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(14)
    },
    pwd: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(14)
    },
    pwdd: {
      required,
      sameAsPassword: sameAs("pwd")
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(14)
    }
  },

  data() {
    return {
      currentUrl: "",
      url: process.env.VUE_APP_SERVICE_URL,
      headimgurl: [],
      screenWidth: "",
      dialogHeadVisible: false,

      keyWords: "",
      identity: "",
      userImgUrl: "",
      mainProps: {
        blankColor: "#777",
        width: 50,
        height: 50,
        class: "m1"
      },
      islogin: false,
      islog: true,

      name: "",
      username: "",
      pwd: "",
      pwdd: "",

      loginName: "",
      loginPwd: "",
      loginNameState: null,
      loginPwdState: null
    };
  },
  methods: {
    formatter(value) {
      return value
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/\s*/g, "")
        .replace(/‘/g, "")
        .replace(/”/g, "")
        .replace(/’/g, "")
        .replace(/“/g, "");
    },
    dialogClose() {
      this.currentUrl = "";
      // console.log(document.body);
      document.body.style = "";
    },
    // 更新头像
    updateHeadImg() {
      this.dialogHeadVisible = false;
      var user = JSON.parse(localStorage.getItem("blog-user"));
      // console.log(this.currentUrl, user);
      if (user) {
        headimg.updateHeadImg(user, this.currentUrl).then(response => {
          const resp = response.data;
          console.log(resp.data[0]);
          if (resp.flag) {
            this.$message({
              message: resp.message,
              type: "success"
            });
            localStorage.setItem("blog-user", JSON.stringify(resp.data[0]));
            this.userImgUrl = resp.data[0].img;
          } else {
            this.$message({
              message: resp.message,
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "获取用户信息失败",
          type: "error"
        });
      }
    },
    // 获取头像
    fetchHead() {
      headimg.getHeadImg().then(response => {
        const resp = response.data;
        console.log(resp);
        this.headimgurl = resp.data;
      });
    },

    // 搜索
    pubkeyWords() {
      PubSub.publish("keyWords", this.keyWords);
    },

    // 点击ok
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.islog) {
        // 登陆
        this.loginSubmit();
        console.log("login");
      } else {
        // 注册
        this.regSubmit();
        console.log("register");
      }
    },

    // 登录校验
    logincheck() {
      const Valid = this.$refs.logForm.checkValidity();
      this.loginNameState = Valid;
      this.loginPwdState = Valid;
      return Valid;
    },

    // 登录提交
    loginSubmit() {
      if (!this.logincheck()) {
        return;
      }
      console.log(this.loginName);
      // 关闭modal
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      // 登录信息对象
      const logData = {
        username: this.loginName,
        password: this.loginPwd
      };
      //校验通过，发送请求
      user.userLogin(logData).then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          // 用户Token存到本地
          localStorage.setItem("blog-user-token", resp.data[0].id);
          //用户信息存到本地
          localStorage.setItem("blog-user", JSON.stringify(resp.data[0]));
          //显示头像
          this.userImgUrl = resp.data[0].img;
          this.islogin = true;
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
    },

    setName(value) {
      var newValue = value
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/\s*/g, "")
        .replace(/‘/g, "")
        .replace(/”/g, "")
        .replace(/’/g, "")
        .replace(/“/g, "");
      this.name = newValue;
      this.$v.name.$touch();
      // console.log(this.name);
    },
    setPwd(value) {
      var newValue1 = value
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/\s*/g, "")
        .replace(/‘/g, "")
        .replace(/”/g, "")
        .replace(/’/g, "")
        .replace(/“/g, "");
      this.pwd = newValue1;
      this.$v.pwd.$touch();
    },
    setPwdd(value) {
      this.pwdd = value;
      this.$v.pwdd.$touch();
    },
    setUsername(value) {
      var newValue3 = value
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/\s*/g, "")
        .replace(/‘/g, "")
        .replace(/”/g, "")
        .replace(/’/g, "")
        .replace(/“/g, "");
      this.username = newValue3;
      this.$v.username.$touch();
    },
    // 注册提交
    regSubmit() {
      console.log("提交注册", {
        name: this.name,
        username: this.username,
        password: this.pwd
      });
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        user
          .userRegister({
            name: this.name,
            username: this.username,
            password: this.pwd
          })
          .then(response => {
            const resp = response.data;
            console.log(resp);
            if (resp.flag) {
              // 注册成功
              localStorage.setItem("blog-user-token", resp.data[0].id);
              localStorage.setItem("blog-user", JSON.stringify(resp.data[0]));
              this.islogin = true;
              this.userImgUrl = resp.data[0].img;
              this.$refs["modal"].hide();
              this.$message({
                message: resp.message,
                type: "success"
              });
            } else {
              this.$message({
                message: resp.meassage,
                type: "error"
              });
            }
          });
      }
    },

    // 重置表单
    resetModal() {
      this.islog = true;
      this.registerName = "";
      this.loginName = "";
      this.loginPwd = "";
      this.loginNameState = null;
      this.loginPwdState = null;
      this.name = "";
      this.username = "";
      this.pwd = "";
      this.pwdd = "";
    },

    //登出
    logout() {
      this.islogin = false;
      localStorage.removeItem("blog-user");
      localStorage.removeItem("blog-user-token");
    },

    //本地验证登录
    loaclLogin() {
      const userToken = localStorage.getItem("blog-user-token");
      const userMsg = JSON.parse(localStorage.getItem("blog-user"));
      console.log(userToken, user);
      if (userMsg) {
        this.islogin = true;
        this.userImgUrl = userMsg.img;
      } else if (userToken) {
        user.getUser(userToken).then(response => {
          const resp = response.data;
          console.log(resp);
          if (resp.flag) {
            this.islogin = true;
            this.userImgUrl = resp.user.img;
            localStorage.setItem("blog-user", JSON.stringify(resp.user));
            this.$message({
              message: resp.message,
              type: "success"
            });
          } else {
            this.$message({
              message: "请重新登录",
              type: "error"
            });
          }
        });
      } else {
        return;
      }
    },

    // pubsub发送消息
    pub() {
      PubSub.publish("islogin", this.islogin);
      console.log("订阅已发送");
    }
  }
};
</script>

<style lang="less">
.el-radio {
  .el-radio__input {
    display: none;
  }
  &.is-checked {
    .el-image {
      box-shadow: 0px 0px 10px rgb(1, 19, 179);
    }
  }
}
.headerCheck {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0px 0px 5px rgba(31, 17, 82, 0.705);
    cursor: pointer;
  }
}
.headactive {
  box-shadow: 0px 0px 5px rgba(31, 17, 82, 0.705);
}
@titleCol: rgb(45, 54, 66);
.headImg {
  position: absolute;
  display: block;
  top: 4.5rem;
  right: 5%;
}
#title {
  color: #ffffff;
  font-size: 0.8rem;
  background-color: @titleCol;
  a {
    text-decoration: none;
    display: inline-block;
    border-bottom: rgb(170, 173, 177) 1px dotted;
    margin-right: 1rem;
    color: rgb(170, 173, 177);
    &:hover {
      color: aliceblue;
    }
  }
}
@media screen and (min-width: 992px) {
  .headImg {
    top: 0.5rem;
  }
}
#reg {
  // .form-group--error {
  //   box-shadow: 0px 0px 3px red;
  // }

  .form-group {
    width: 100%;
    height: 65px;
    .default {
      font-size: 0.8rem;
      color: gray;
    }
    .error {
      font-size: 0.8rem;
      color: rgb(243, 34, 34);
    }

    .form__input {
      border-radius: 0.3rem;
      border: 1px solid rgba(68, 68, 68, 0.1);
      width: 100%;
      height: 60%;
      &:focus {
        box-shadow: 0px 0px 4px rgb(122, 122, 255);
      }
    }
  }
}
</style>

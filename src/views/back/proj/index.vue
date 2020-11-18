<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="2 " v-for="item in proj" :key="item.id" style="margin-bottom:20px">
        <el-card class="box-card">
          <div style="text-align:center ; margin-bottom:10px">
            <svg
              t="1584193082409"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5312"
              width="24"
              height="24"
            >
              <path
                d="M272.4 813.1c-1.4 0-2.7-0.1-4.1-0.3-13.1-2.3-21.9-14.7-19.6-27.7l4.5-26.2c2.2-13.1 14.7-21.8 27.7-19.6 13.1 2.3 21.9 14.7 19.6 27.7l-4.5 26.2c-2 11.7-12.1 19.9-23.6 19.9z"
                fill="#3778FF"
                p-id="5313"
              />
              <path
                d="M885 434.7l-244.8-35.6c-7.8-1.1-14.6-6.1-18.1-13.1l-74.8-151.6-69.6 141-74.7 10.8c-3.5 7-10.2 11.8-18 12.9l-191.2 27.8 202.8 197.7L361.3 831l140.1-73.7c7-3.7 15.4-3.7 22.4 0l62.7 33 22.2-11.7 129.7 68.2L701 628.7c-1.3-7.8 1.3-15.8 6.9-21.3L885 434.7z"
                fill="#91B4FF"
                p-id="5314"
              />
              <path
                d="M774.1 940.4c-3.8 0-7.7-0.9-11.2-2.8L512 805.8 261.1 937.7c-8.1 4.3-17.9 3.5-25.3-1.8-7.4-5.4-11.1-14.5-9.6-23.5l11.5-67.2c2.2-13.1 14.8-21.9 27.7-19.6 13.1 2.3 21.9 14.7 19.6 27.7l-3.3 19.2 219-115.1c7-3.7 15.4-3.7 22.4 0l219 115.1-41.8-243.8c-1.3-7.8 1.3-15.8 6.9-21.3l177.2-172.7-244.8-35.6c-7.8-1.1-14.6-6.1-18.1-13.1L512 164.1 402.6 386c-3.5 7.1-10.3 12-18.1 13.1l-244.8 35.6 177.2 172.7c5.7 5.5 8.3 13.5 6.9 21.3L311.7 699c-2.3 13.1-14.6 21.9-27.7 19.6-13.1-2.2-21.9-14.7-19.6-27.7l9.9-57.8-203-197.8c-6.6-6.4-8.9-15.9-6.1-24.6 2.8-8.7 10.3-15 19.4-16.3l280.5-40.8L490.5 99.2c4.1-8.2 12.4-13.4 21.5-13.4s17.5 5.2 21.5 13.4L659 353.4l280.5 40.8c9 1.3 16.6 7.6 19.4 16.3 2.8 8.7 0.5 18.3-6.1 24.6L749.9 633l47.9 279.4c1.5 9-2.2 18.1-9.6 23.5-4.1 3-9.1 4.5-14.1 4.5z"
                fill="#3778FF"
                p-id="5315"
              />
            </svg>
          </div>
          <div class="inner">
            <p>{{item.title}}</p>
          </div>
          <div class="inner2">
            <p v-html="item.content"></p>
          </div>
          <div>
            <el-button-group style="width:100%">
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                style="width:33.3%"
                @click="editProj(item)"
              ></el-button>
              <el-button
                type="primary"
                plain
                icon="el-icon-share"
                style="width:33.5%"
                @click="copyUrl = item.linkUrl"
                v-clipboard:copy="copyUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              ></el-button>
              <el-button
                type="primary"
                plain
                icon="el-icon-delete"
                style="width:33.3%"
                @click="delProj(item.id)"
              ></el-button>
            </el-button-group>
          </div>
        </el-card>
      </b-col>
      <b-col cols="12" md="2" style="margin-bottom:20px">
        <div id="addCard" @click="addProj">
          <div class="innerDiv">
            <svg
              t="1584200154064"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2040"
              width="100"
              height="100"
            >
              <path
                d="M934.950293 956.242803 813.230196 956.242803c-11.211802 0-20.28583-9.112542-20.28583-20.286022 0-11.212366 9.074028-20.286022 20.28583-20.286022l101.433243 0 0-101.429087c0-11.211343 9.074028-20.284999 20.286853-20.284999 11.173938 0 20.286853 9.073656 20.286853 20.284999L955.237146 935.956781C955.237146 947.130262 946.124231 956.242803 934.950293 956.242803zM934.950293 712.812585c-11.212825 0-20.286853-9.113565-20.286853-20.286022L914.663439 570.810431c0-11.211343 9.074028-20.284999 20.286853-20.284999 11.173938 0 20.286853 9.073656 20.286853 20.284999l0 121.716132C955.237146 703.69902 946.124231 712.812585 934.950293 712.812585zM934.950293 469.382367c-11.212825 0-20.286853-9.113565-20.286853-20.286022L914.663439 327.380212c0-11.212366 9.074028-20.284999 20.286853-20.284999 11.173938 0 20.286853 9.072633 20.286853 20.284999l0 121.715109C955.237146 460.268802 946.124231 469.382367 934.950293 469.382367zM934.950293 225.952148c-11.212825 0-20.286853-9.112542-20.286853-20.286022l0-101.429087-101.433243 0c-11.211802 0-20.28583-9.112542-20.28583-20.286022 0-11.212366 9.074028-20.286022 20.28583-20.286022l121.720096 0c11.173938 0 20.286853 9.073656 20.286853 20.286022l0 121.714086C955.237146 216.838583 946.124231 225.952148 934.950293 225.952148zM691.5101 956.242803 569.78898 956.242803c-11.211802 0-20.284807-9.112542-20.284807-20.286022 0-11.212366 9.073004-20.286022 20.284807-20.286022l121.72112 0c11.172915 0 20.286853 9.073656 20.286853 20.286022C711.797977 947.130262 702.683015 956.242803 691.5101 956.242803zM691.5101 104.237039 569.78898 104.237039c-11.211802 0-20.284807-9.112542-20.284807-20.286022 0-11.212366 9.073004-20.286022 20.284807-20.286022l121.72112 0c11.172915 0 20.286853 9.073656 20.286853 20.286022C711.797977 95.124498 702.683015 104.237039 691.5101 104.237039zM668.68739 469.382367c22.386764 0 40.573707 18.146289 40.573707 40.571021 0 22.385846-18.186943 40.571021-40.573707 40.571021L546.967294 550.524408l0 121.716132c0 22.385846-18.186943 40.571021-40.573707 40.571021-22.425651 0-40.572683-18.185174-40.572683-40.571021L465.820904 550.524408 344.100808 550.524408c-22.426674 0-40.572683-18.185174-40.572683-40.571021 0-22.424732 18.147032-40.571021 40.572683-40.571021l121.720096 0L465.820904 347.667258c0-22.424732 18.147032-40.571021 40.572683-40.571021 22.386764 0 40.573707 18.146289 40.573707 40.571021l0 121.715109L668.68739 469.382367zM448.069907 104.237039 326.349811 104.237039c-11.212825 0-20.28583-9.112542-20.28583-20.286022 0-11.212366 9.073004-20.286022 20.28583-20.286022l121.720096 0c11.172915 0 20.286853 9.073656 20.286853 20.286022C468.356761 95.124498 459.243846 104.237039 448.069907 104.237039zM204.630738 956.242803 82.910642 956.242803c-11.213849 0-20.286853-9.112542-20.286853-20.286022L62.623789 814.240649c0-11.211343 9.073004-20.284999 20.286853-20.284999 11.192358 0 20.28583 9.073656 20.28583 20.284999l0 101.429087 101.434266 0c11.193382 0 20.28583 9.073656 20.28583 20.286022C224.916568 947.130262 215.82412 956.242803 204.630738 956.242803zM204.630738 104.237039l-101.434266 0 0 101.429087c0 11.17348-9.093471 20.286022-20.28583 20.286022-11.213849 0-20.286853-9.112542-20.286853-20.286022L62.623789 83.951017c0-11.212366 9.073004-20.286022 20.286853-20.286022l121.720096 0c11.193382 0 20.28583 9.073656 20.28583 20.286022C224.916568 95.124498 215.82412 104.237039 204.630738 104.237039zM82.910642 307.095213c11.192358 0 20.28583 9.072633 20.28583 20.284999l0 121.715109c0 11.172457-9.093471 20.286022-20.28583 20.286022-11.213849 0-20.286853-9.113565-20.286853-20.286022L62.623789 327.380212C62.623789 316.167846 71.696793 307.095213 82.910642 307.095213zM82.910642 550.524408c11.192358 0 20.28583 9.073656 20.28583 20.284999l0 121.716132c0 11.172457-9.093471 20.286022-20.28583 20.286022-11.213849 0-20.286853-9.113565-20.286853-20.286022L62.623789 570.810431C62.623789 559.599088 71.696793 550.524408 82.910642 550.524408zM326.349811 915.669736l121.720096 0c11.172915 0 20.286853 9.073656 20.286853 20.286022 0 11.17348-9.112915 20.286022-20.286853 20.286022L326.349811 956.24178c-11.212825 0-20.28583-9.112542-20.28583-20.286022C306.063981 924.744415 315.136986 915.669736 326.349811 915.669736z"
                p-id="2041"
                fill="#8a8a8a"
              />
            </svg>
          </div>
        </div>
      </b-col>
      <!-- Form -->
      <el-dialog title="项目编辑" :visible.sync="dialogFormVisible" :fullscreen="isFullScreen">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows:6}"
              v-model="form.content"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目地址" :label-width="formLabelWidth">
            <el-input v-model="form.linkUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="github地址" :label-width="formLabelWidth">
            <el-input v-model="form.linkGithub" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postEdit">确 定</el-button>
        </div>
      </el-dialog>
    </b-row>
  </b-container>
</template>
<script>
import proj from "@/api/project";
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
  created() {
    this.fetchProj();
    window.screenWidth = document.body.clientWidth;
    this.screenWidth = window.screenWidth;
  },
  computed: {
    isFullScreen() {
      return this.screenWidth < 992;
    }
  },
  //   watch: {
  //     screenWidth() {
  //       console.log(this.screenWidth);
  //     }
  //   },
  data() {
    return {
      copyUrl: "http://baidu.com",
      isAdddialog: null,
      screenWidth: "",
      dialogFormVisible: false,
      form: {
        id: "",
        title: "",
        content: "",
        linkUrl: "",
        linkGithub: ""
      },
      formLabelWidth: "100px",
      proj: []
    };
  },
  methods: {
    //新增项目
    addProj() {
      this.isAdddialog = true;
      this.dialogFormVisible = true;
    },
    //提交编辑
    postEdit() {
      if (this.isAdddialog) {
        // 新增
        proj.addProject(this.form).then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.$message({
              message: resp.message,
              type: "success"
            });
            this.fetchProj();
          } else {
            this.$message({
              message: resp.message,
              type: "error"
            });
          }
        });
      } else {
        //编辑
        proj.editProject(this.form.id, this.form).then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.$message({
              message: resp.message,
              type: "success"
            });
            this.fetchProj();
          } else {
            this.$message({
              message: resp.message,
              type: "error"
            });
          }
        });
      }
      this.fetchProj();
      this.dialogFormVisible = false;
      this.form = {
        id: "",
        title: "",
        content: "",
        linkUrl: "",
        linkGithub: ""
      };
    },
    //获取项目
    fetchProj() {
      proj.getProject().then(response => {
        const resp = response.data;
        if (resp.flag) {
          //   this.$message({
          //     message: resp.message,
          //     type: "success"
          //   });
          this.proj = resp.project;
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    // 打开编辑
    editProj(proj) {
      this.isAdddialog = false;
      console.log(proj);
      this.dialogFormVisible = true;
      this.form = proj;
    },
    //分享
    onCopy(proj) {
      console.log(proj);
      this.$notify({
        title: "链接已复制",
        message: "快去分享吧",
        type: "success"
      });
    },
    onError() {
      this.$notify({
        title: "链接复制失败",
        message: "不晓得咋个回事",
        type: "error"
      });
    },
    // 删除项目
    delProj(id) {
      console.log(id);
      proj.delProject(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.fetchProj();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#addCard {
  width: 100%;
  height: 348px;
  border: 2px dashed rgb(155, 154, 154);
  border-radius: 0.3rem;
  position: relative;
  cursor: pointer;
  .innerDiv {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
  }
}
.inner {
  width: 100%;
  height: 40px;
  background-color: rgb(245, 245, 245);
  border-radius: 0.2rem;
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 1px gray;
  p {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;
    line-height: 35px;
    margin-bottom: 0;
    padding: 4px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 3%;
    width: 20px;
    border: 1.7px solid rgb(45, 140, 240);
    background-color: rgb(45, 140, 240);
  }
}
.inner2 {
  width: 100%;
  height: 160px;
  background-color: rgb(245, 245, 245);
  border-radius: 0.2rem;
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 1px gray;
  p {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4; // 控制多行的行数
    -webkit-box-orient: vertical;

    font-size: 0.9rem;
    line-height: 38px;
    margin-bottom: 0;
    padding: 4px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 3%;
    left: 3%;
    width: 20px;
    // height: 1px;
    border: 1.5px solid rgb(45, 140, 240);
    background-color: rgb(45, 140, 240);
  }
}
</style>
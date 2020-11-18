<template>
  <el-form :model="form" size="mini" label-position="left">
    <!-- 富文本编辑器 -->
    <el-form-item>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <b-row>
            <b-col md="3">
              <el-card class="box-card">
                <el-input v-model="form.title" autocomplete="off" placeholder="文章标题"></el-input>
              </el-card>
            </b-col>
            <b-col md="2">
              <el-card class="box-card">
                <el-input v-model="form.author" autocomplete="off" placeholder="文章作者"></el-input>
              </el-card>
            </b-col>
            <b-col md="5">
              <el-card>
                <el-input
                  type="textarea"
                  v-model="form.describes"
                  autocomplete="off"
                  autosize
                  placeholder="文章描述"
                ></el-input>
              </el-card>
            </b-col>
            <b-col md="2">
              <el-popover placement="right" width="400" trigger="click">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标签</span>
                  </div>
                  <el-radio-group v-model="form.tag">
                    <el-radio :label="item" v-for="(item,index) in allTags" :key="index">
                      <el-tag>{{item.tagname}}</el-tag>
                    </el-radio>
                  </el-radio-group>
                </el-card>
                <el-button slot="reference" plain icon="el-icon-collection-tag">标签</el-button>
              </el-popover>
              <el-popover placement="right" width="400" trigger="click">
                <el-card class="box=card">
                  <div slot="header" class="clearfix">
                    <span>文章图片</span>
                  </div>
                  <el-upload
                    :action="uploadImgUrl"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="onSuccess"
                    name="imgUrl"
                    ref="upload"
                    :auto-upload="true"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-card>
                <el-button slot="reference" plain icon="el-icon-picture-outline">图片</el-button>
              </el-popover>
              <el-button @click="postEs">提交文章</el-button>
            </b-col>
          </b-row>

          <!-- <span>文章内容</span> -->
        </div>
        <div class="edit_container">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </el-card>
    </el-form-item>
    <!-- 文本编辑器end -->
  </el-form>
</template>
<script>
import essay from "@/api/essay";
import tags from "@/api/tags";

export default {
  created() {
    this.fetchTags();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  data() {
    return {
      uploadImgUrl: process.env.VUE_APP_SERVICE_URL + "/uploadImg2",
      // 表单图片url
      dialogImageUrl: "",
      allTags: [],
      dialogVisible: false,
      editorOption: {},
      form: {
        content: "",
        author: "",
        pubDate: "",
        title: "",
        describes: "",
        tag: "",
        img: ""
      }
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
      // var hours =
      //   date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      // var minutes =
      //   date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // var seconds =
      //   date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day;
    },
    postEs() {
      this.form.pubDate = this.dateFormat(new Date());
      essay.postEssay(this.form).then(response => {
        const resp = response.data;
        if (resp.flag) {
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
    // 获取全部标签
    fetchTags() {
      tags.getTags().then(response => {
        const resp = response.data;
        // console.log(resp,123);
        this.allTags = resp.tags;
      });
    },
    // 编辑器方法---------------------
    onEditorReady() {
      // 准备编辑器
    },
    onEditorBlur() {
      this.form.content = this.form.content.replace(/'/g, '"');
    }, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    // 内容改变事件
    onEditorChange() {
      console.log(this.form.content);
    },
    // 编辑器end-----------------------
    // 放大删除上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功回调
    onSuccess(response, file, fileList) {
      console.log(response);
      if (response.flag) {
        this.$message({
          message: response.message,
          type: "success"
        });
        this.form.img = response.imgUrl;
      } else {
        this.$message({
          message: response.message,
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@media screen and (min-width: 992px) {
  .quill-editor {
    height: 380px !important;
  }
}
</style>
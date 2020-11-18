<template>
  <b-container fluid style="padding:0">
    <!-- 文章表格 -->
    <el-table
      ref="filterTable"
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="550"
      stripe
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="pubDate" label="发布时间" sortable width="100" column-key="date"></el-table-column>
      <el-table-column prop="author" label="发布人" width="60"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="tagFilter"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === 'Vue' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑文章dialog -->
    <el-dialog title="编辑文章" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form" size="mini" label-position="left">
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文章标题</span>
            </div>
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>发布时间</span>
            </div>
            <el-input readonly v-model="form.pubDate" autocomplete="off"></el-input>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文章作者</span>
            </div>
            <el-input v-model="form.author" autocomplete="off"></el-input>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-card>
            <div slot="header" class="clearfix">
              <span>文章描述</span>
            </div>
            <el-input type="textarea" v-model="form.describes" autocomplete="off" autosize></el-input>
          </el-card>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文章内容</span>
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
        <el-form-item>
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
        </el-form-item>
        <el-form-item>
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
              :data="resData"
              :auto-upload="true"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-card>
        </el-form-item>
        <el-button @click="dialogTableVisible = true">编辑评论</el-button>

        <el-dialog title="管理评论" :visible.sync="dialogTableVisible" append-to-body width="90%">
          <el-table :data="gridData">
            <el-table-column prop="commenterName" label="评论人"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="pubTime" label="评论时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="delComm(scope.$index,scope.row)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editForm">确 定</el-button>
      </div>
    </el-dialog>
  </b-container>
</template>

<script>
import getEssay from "@/api/essay";
import tags from "@/api/tags";

export default {
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    this.getEssayList();
    this.fetchTags();
  },

  data() {
    return {
      resData: {
        essayId: ""
      },
      uploadImgUrl: process.env.VUE_APP_SERVICE_URL + "/uploadImg",
      currentEssayId: "",
      loading: null,
      gridData: [
        {
          id: "",
          commenterName: "",
          content: "",
          pubTime: ""
        }
      ],
      dialogTableVisible: false,
      // 标签数组
      allTags: [],
      editorOption: {},
      dialogVisible: false,
      // 表单dialog开关
      dialogFormVisible: false,
      // 表单数据
      form: {
        title: "",
        img: "",
        pubDate: "",
        author: "",
        tag: { id: "", tagname: "" },
        describes: "",
        content: ""
      },
      // 表单图片url
      dialogImageUrl: "",
      // 表单标签宽度
      formLabelWidth: "80px",
      // 搜索关键词
      search: "",
      // 标签过滤
      tagFilter: [],
      // 文章列表数据
      tableData: [{ author: "", pubDate: "", title: "", tag: "" }]
    };
  },
  methods: {
    // 编辑文章
    editForm() {
      this.dialogFormVisible = false;
      // console.log("edit");
      getEssay.editEssay(this.currentEssayId, this.form).then(response => {
        const resp = response.data;
        // console.log(resp);
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.getEssayList();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    // 删除评论
    delComm(index, row) {
      console.log(row);
      getEssay.delComments(row.id).then(response => {
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
        console.log(resp);
      });
      this.dialogTableVisible = false;
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
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 编辑器end-----------------------

    // 初始化标签过滤
    initTagFilter(Data) {
      // console.log(this.tableData, 11);
      var oldArray = [];
      var newArray = [];
      Data.forEach(item => {
        oldArray.push(item.tag);
      });
      console.log(oldArray);
      oldArray.forEach(item => {
        if (newArray.length == 0) {
          newArray.push(item);
        } else {
          if (newArray.includes(item)) {
            return;
          } else {
            newArray.push(item);
          }
        }
      });
      console.log(newArray);
      var newTagFilter = [];

      newArray.forEach(val => {
        newTagFilter.push({
          text: val,
          value: val
        });
      });
      this.tagFilter = newTagFilter;
    },
    // 获取文章列表
    getEssayList() {
      this.loading = true;
      getEssay.getEssay(null, null, "null").then(response => {
        const resp = response.data;
        console.log(resp);
        const tData = resp.data.rows;
        this.tableData = tData;
        this.loading = false;
        this.$nextTick(() => {
          this.initTagFilter(tData);
        });
      });
    },
    //筛选标签
    filterTag(value, row) {
      console.log("restefilter");
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 编辑文章
    handleEdit(index, row) {
      getEssay.findEssay(row.id).then(response => {
        const resp = response.data;
        console.log(resp);
        this.gridData = resp.comments;
      });
      this.currentEssayId = row.id;
      this.resData.essayId = row.id;
      console.log(index, row);
      this.dialogFormVisible = true;
      this.form.title = row.title;
      this.form.img = row.img;
      this.form.author = row.author;
      this.form.content = row.content;
      this.form.pubDate = row.pubDate;
      this.form.tag = row.tag;
      this.form.describes = row.describes;

      this.dialogImageUrl = process.env.VUE_APP_SERVICE_URL + this.form.img;

      // this.gridData = row.comments;
      // console.log(this.gridData,"gridData")
    },

    // 删除文章
    handleDelete(index, row) {
      console.log(index, row);
      getEssay.delEssay(row.id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.getEssayList();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    // 放大删除上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功回调
    onSuccess(response, file, fileList) {
      console.log(response);
      if (response.flag == "true") {
        this.$message({
          message: response.message,
          type: "success"
        });
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
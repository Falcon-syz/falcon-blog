<template>
  <el-card shadow="never">
    <el-tag
      style="margin-top:10px;margin-bottom:10px"
      :key="tag.id"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag.tagname)"
    >{{tag.tagname}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </el-card>
</template>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
import tags from "@/api/tags";
export default {
  created() {
    this.getTags();
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    //获取标签
    getTags() {
      tags.getTags().then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          // this.$message({
          //   message: resp.message,
          //   type: "success"
          // });
          this.dynamicTags = resp.tags;
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    // 删除标签
    handleClose(tag) {
      // console.log(tag);
      tags.delTag(tag).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.getTags();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    // 显示新增标签输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 新增标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        // this.dynamicTags.push(inputValue);
        tags.addTags(inputValue).then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.$message({
              message: resp.message,
              type: "success"
            });
            this.getTags();
          } else {
            this.$message({
              message: resp.message,
              type: "error"
            });
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>
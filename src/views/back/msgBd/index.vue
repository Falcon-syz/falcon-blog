<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'pubDate', order: 'descending'}"
    stripe
    size="mini"
    height="500"
  >
    <el-table-column prop="pubDate" label="留言时间" sortable width="150"></el-table-column>
    <el-table-column prop="username" label="留言人" width="80"></el-table-column>
    <el-table-column prop="content" label="留言内容" :formatter="formatter"></el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="warning" plain size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import msg from "@/api/msgBoard";
export default {
  created() {
    this.fetchMsg();
  },
  data() {
    return {
      tableData: [
        {
          pubDate: "2016-05-02",
          username: "王小虎",
          content: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    //删除留言
    handleClick(row) {
      console.log(row)
      msg.delMsg(row.id).then(response => {
        const resp = response.data;
        // console.log(resp);
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.fetchMsg();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    //   获取留言
    fetchMsg() {
      msg.getMsg().then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          this.tableData = resp.msg;
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
    formatter(row, column) {
      return row.content;
    }
  }
};
</script>
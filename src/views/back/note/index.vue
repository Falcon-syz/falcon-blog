<template>
  <b-container fluid>
    <b-row style="margin-bottom:1rem">
      <b-col>
        <el-card class="box-card">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="写随笔"
            v-model="form.textarea2"
          >
            <el-button slot="append" icon="el-icon-s-promotion" @click="postNotes"></el-button>
          </el-input>
        </el-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'pubDate', order: 'descending'}"
          stripe
          size="mini"
          height="430"
        >
          <el-table-column prop="pubDate" label="发布时间" sortable width="150"></el-table-column>
          <el-table-column prop="content" label="随笔内容" :formatter="formatter"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="warning" plain size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import notes from "@/api/notes";
export default {
  created() {
    this.fetchNotes();
  },
  data() {
    return {
      form: {
        textarea2: ""
        // pubDate: new Date().Format("yyyy-MM-dd hh:mm:ss")
      },
      tableData: [
        {
          pubDate: "2016-05-02",
          content: "上海市普陀区金沙江路 1518 弄"
        }
      ]
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

    //   写随笔
    postNotes() {
      // console.log(this.form);
      var data = {
        textarea2: this.form.textarea2,
        pubDate: this.dateFormat(new Date())
      };
      notes.addNotes(data).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.fetchNotes();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    //删除随笔
    handleClick(row) {
      // console.log(row)
      notes.delNotes(row.id).then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.fetchNotes();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    //   获取随笔
    fetchNotes() {
      notes.getNotes().then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          this.tableData = resp.notes;
          //   this.$message({
          //     message: resp.message,
          //     type: "success"
          //   });
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
<template>
  <b-container fluid>
    <b-row>
      <b-col cols="6" md="1" v-for="item in users" :key="item.userId" style="margin-top:0.5rem">
        <el-popconfirm title="确定删除该用户吗？" @onConfirm="delUser(item.id)">
          <el-card
            class="box-card hovered"
            style="text-align:center;cursor:pointer"
            slot="reference"
          >
            <div style="text-align:center">
              <el-avatar :size="40" :src="url+item.img"></el-avatar>
            </div>
            <h6 style="margin-bottom:0;font-size:0.7rem">{{item.name}}</h6>
          </el-card>
        </el-popconfirm>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import user from "@/api/user";
export default {
  data() {
    return {
      url: process.env.VUE_APP_SERVICE_URL,
      visible: false,
      users: []
    };
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    //   删除用户
    delUser(id) {
      console.log(id);
      user.delUser(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.$message({
            message: resp.message,
            type: "success"
          });
          this.fetchAllUsers();
        } else {
          this.$message({
            message: resp.message,
            type: "error"
          });
        }
      });
    },
    //获取用户
    fetchAllUsers() {
      user.getAllUsers().then(response => {
        const resp = response.data;
        console.log(resp);
        if (resp.flag) {
          //   this.$message({
          //     message: resp.message,
          //     type: "success"
          //   });
          this.users = resp.users;
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
<style lang="less">
.hovered {
  &:hover {
    box-shadow: 0px 0px 5px rgb(64, 158, 255) !important;
  }
}
</style>
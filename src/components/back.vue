<template>
  <el-container>
    <!-- header -->
    <el-header class="theader">
      <el-button
        circle
        class="el-icon-guide"
        style="font-size:20px;float:right"
        plain
        type="primary"
        @click="$router.push('/')"
      ></el-button>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!-- nav -->
        <side-nav></side-nav>
      </el-aside>
      <el-main>
        <!-- main -->
        <body-main></body-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import bodyMain from "@/components/back-main";
import sideNav from "@/components/back-nav";
export default {
  components: {
    sideNav,
    bodyMain
  }
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: rgb(52, 73, 94);
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding-top: 10px;
}
</style>
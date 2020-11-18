<template>
  <el-menu
    default-active="/back/"
    class="el-menu-vertical-demo menu"
    :collapse="isCollapse"
    collapse-transition
    style="border-bottom:1px solid rgb(230, 230, 230)"
    :router="true"
  >
    <el-menu-item  @click="isCollapse=!isCollapse">
      <i :class="isCollapse ?'el-icon-turn-off':'el-icon-open'"></i>
    </el-menu-item>
    <el-menu-item index="/back/" >
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/back/essayList" class="menuItem">
          <i class="el-icon-s-order"></i>
          <span>文章列表</span>
        </el-menu-item>
        <el-menu-item index="/back/writeEssay" class="menuItem">
          <i class="el-icon-edit"></i>
          <span>写文章</span>
        </el-menu-item>
        <el-menu-item index="/back/tags" class="menuItem">
          <i class="el-icon-collection-tag"></i>
          <span>标签管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/back/msgBd">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">留言管理</span>
    </el-menu-item>
    <el-menu-item index="/back/proj">
      <i class="el-icon-collection"></i>
      <span slot="title">项目管理</span>
    </el-menu-item>
    <el-menu-item index="/back/note">
      <i class="el-icon-wind-power"></i>
      <span slot="title">随笔管理</span>
    </el-menu-item>
    <el-menu-item index="/back/users">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
  </el-menu>
</template>
<style scoped>
@media screen and (min-width: 992px) {
  .menu {
    height: 662px !important;
  }
  .el-icon-open {
    color: rgb(64, 158, 255) !important;
  }
  .el-icon-turn-off {
    color: rgb(64, 158, 255) !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .menuItem {
    background-color: rgb(243, 243, 243);
  }
}
 .menu {
    height: 100%;
  }
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>
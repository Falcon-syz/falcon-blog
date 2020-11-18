<template>
  <b-container fluid style="padding:0">
    <!-- 标题栏 -->
    <page-title></page-title>
    <!-- 导航栏 -->
    <page-nav></page-nav>
  </b-container>
</template>
<script>
import pageNav from "./nav";
import pageTitle from "./title";

export default {
  components: {
    pageNav,
    pageTitle
  }
};
</script>

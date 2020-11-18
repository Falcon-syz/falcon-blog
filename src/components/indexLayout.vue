<template>
  <b-container fluid style="padding:0 ; background-color:rgb(249, 249, 249) ">
    <!-- header -->
    <page-header></page-header>
    <!-- body -->
    
    <page-body></page-body>

    <!-- footer -->
    <page-footer></page-footer>
  </b-container>
</template>
<script>
import pageHeader from "./header";
import pageFooter from "./footer";
import pageBody from "./body";

export default {
  components: {
    pageHeader,
    pageFooter,
    pageBody
  }
};
</script>

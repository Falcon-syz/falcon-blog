<template>
  <div id="spinner" v-show="loading">
    <b-spinner
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      type="grow"
      class="loading1"
    ></b-spinner>
    <b-spinner
      v-show="loading"
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      type="grow"
      class="loading2"
    ></b-spinner>
    <b-spinner
      v-show="loading"
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      type="grow"
      class="loading3"
    ></b-spinner>
     <b-spinner
      v-show="loading"
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      type="grow"
      class="loading4"
    ></b-spinner>
     <b-spinner
      v-show="loading"
      style="width: 3rem; height: 3rem;"
      label="Large Spinner"
      type="grow"
      class="loading5"
    ></b-spinner>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
   methods: {
        changeLoading(val){
            this.loading = val
        }
    },
};
</script>
<style lang="less" scoped>
#spinner {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .loading1 {
    position: absolute;
    top: 10%;
    left: 49%;
  }
  .loading2 {
    position: absolute;
    top: 30%;
    left: 49%;
  }
  .loading3 {
    position: absolute;
    top: 50%;
    left: 49%;
  }
  .loading4 {
    position: absolute;
    top: 70%;
    left: 49%;
  }
  .loading5 {
    position: absolute;
    top: 90%;
    left: 49%;
  }
}
</style>
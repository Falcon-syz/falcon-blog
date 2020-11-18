<template>
  <b-navbar toggleable="lg" type="dark" class="green">
    <b-container>
      <b-navbar-brand href="#/" class="height">Falcon</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="navBtn" exact exact-active-class="active" to="/">主页</b-nav-item>
          <b-nav-item class="navBtn" to="/msgBoard" exact exact-active-class="active">留言板</b-nav-item>
          <b-nav-item class="navBtn" to="/project" exact exact-active-class="active">项目</b-nav-item>
          <b-nav-item class="navBtn" to="/notes" exact exact-active-class="active">随笔</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<style scoped lang="less">
@import "../../../styles/font.css";

@green: rgb(32, 178, 170);

.active {
  background-color: #ffffff;
  color: @green !important;
}

.green {
  background-color: @green;
}
.height {
  height: 90px;
  padding-top: 28px;
  font-size: 2rem;
  text-shadow: 1px 1px 1px rgb(117, 117, 117);
  font-family: "M39_SQUAREFUTURE";
}
.nav-link {
  padding-left: 15px !important;
}
.navBtn {
  border-top: 2px solid rgb(72, 192, 185);
  &:hover {
    background-color: #ffffff;
    .nav-link {
      color: @green !important;
    }
  }
}
@media screen and (min-width: 992px) {
  .navBtn {
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    margin-left: 20px;
  }
  .nav-link {
    padding-left: 0.5rem !important;
  }
}
</style>

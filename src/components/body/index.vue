<template>
  <div>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less">
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s ease;
}
.v-leave-active {
  transition: all 0.3s ease;
}


</style>

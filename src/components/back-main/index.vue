<template>
  <b-container fluid style="padding:0">
    <el-card class="box-card" v-if="$route.meta.title=='首页'?false:true" style="margin-bottom:15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <b-container fluid style="padding:0">
      <router-view></router-view>
    </b-container>
  </b-container>
</template>

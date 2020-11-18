<template>
  <b-container class="homeMain">
    <b-row>
      <!-- 左侧栏 -->
      <b-col class="left" cols="12" md="8">
        <!-- 文章卡片列表 -->
        <b-list-group v-for="item in list" :key="item.id">
          <!-- item -->
          <b-list-group-item style="padding:0px 0px 15px 0px ;border:none">
            <b-card no-body style="max-width: 750px;">
              <!-- 行 -->
              <b-row no-gutters>
                <!-- img -->
                <b-col md="4">
                  <b-link :to="'/essayDetail/'+item.id" class="cardLink">
                    <b-card-img :src="url+ item.img" height="100%" class="rounded-0"></b-card-img>
                  </b-link>
                </b-col>
                <!-- content -->
                <b-col md="8">
                  <b-card-body style="background-color:rgba(248, 249, 250,0.5)">
                    <b-card-header
                      style="background-color:rgb(251, 252, 252); padding-left:0px; border-bottom:none"
                    >
                      <h4>
                        <b-link :to="'/essayDetail/'+item.id" class="cardLink">{{item.title}}</b-link>
                      </h4>
                    </b-card-header>
                    <!-- 文章内容 -->
                    <b-card-text class="content">{{item.describes}}</b-card-text>

                    <!-- 卡片页脚 -->
                    <b-card-footer footer-class="cardFooter" style="padding:10px ">
                      <!-- 作者 -->
                      <div class="footerItem">
                        <b-icon
                          icon="person-fill"
                          font-scale="1.2"
                          style="color: rgb(202, 202, 202);"
                        ></b-icon>
                        <span>
                          <b-link :to="'/essayDetail/'+item.id" class="tagLink">{{item.author}}</b-link>
                        </span>
                      </div>
                      <!-- 浏览量 -->
                      <div class="footerItem">
                        <b-icon
                          icon="pie-chart-fill"
                          font-scale="1.2"
                          style="color: rgb(202, 202, 202);"
                        ></b-icon>
                        <span>
                          <b-link
                            :to="'/essayDetail/'+item.id"
                            class="tagLink"
                          >浏览量({{item.pageView}})</b-link>
                        </span>
                      </div>
                      <!-- 评论
                      <div class="footerItem">
                        <b-icon
                          icon="chat-fill"
                          font-scale="1.2"
                          style="color: rgb(202, 202, 202);"
                        ></b-icon>
                        <span>
                          <b-link
                            :to="'/essayDetail/'+item.id"
                            class="tagLink"
                          >评论({{item.comments.length}})</b-link>
                        </span>
                      </div> -->
                      <!-- 日期 -->
                      <div class="footerItem">
                        <b-icon
                          icon="calendar-fill"
                          font-scale="1.2"
                          style="color: rgb(202, 202, 202)"
                        ></b-icon>
                        <span>
                          <b-link :to="'/essayDetail/'+item.id" class="tagLink">{{item.pubDate}}</b-link>
                        </span>
                      </div>
                      <!-- 标签 -->
                      <div class="footerItem">
                        <b-icon icon="tag-fill" font-scale="1.2" style="color: rgb(202, 202, 202)"></b-icon>
                        <span>
                          <b-link :to="'/essayDetail/'+item.id" class="tagLink">
                            <b-badge>{{item.tag}}</b-badge>
                          </b-link>
                          <!-- <b-link :to="'/essayDetail/'+item.id" class="tagLink">
                            <b-badge>{{item.tag}}</b-badge>
                          </b-link>-->
                        </span>
                      </div>
                    </b-card-footer>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-list-group-item>
        </b-list-group>
        <spinner ref="spinner"></spinner>
      </b-col>
      <!-- 右侧栏 -->
      <right-bar @tagSearch="fetchData" :total="total" ref="right"></right-bar>
    </b-row>
  </b-container>
</template>
<script>
import rightBar from "./right";
import essay from "@/api/essay";
import spinner from "@/components/spinner";
import PubSub from "pubsub-js";

export default {
  components: {
    rightBar,
    spinner
  },
  data() {
    return {
      url: process.env.VUE_APP_SERVICE_URL,
      keyWords: "",
      list: [],
      total: 0
      // src: require("../../assets/logo.png")
    };
  },
  watch: {
    keyWords() {
      this.fetchData(null, null, this.keyWords);
    }
  },
  created() {
    PubSub.subscribe("keyWords", (msg, keyWords) => {
      console.log(keyWords, "收到订阅");
      this.keyWords = keyWords;
    });
    this.fetchData(null, null, "null");
  },
  methods: {
    //获取文章列表
    fetchData(tag, pubDate, keyWords) {
      //打开loading
      this.$nextTick(() => {
        // console.log(this.$refs.spinner, 132);
        this.$refs.spinner.loading = true;
      });

      console.log(tag, pubDate, keyWords);
      //获取数据
      essay.getEssay(tag, pubDate, keyWords).then(response => {
        const resp = response.data;
        console.log(resp);
        this.list = resp.data.rows;
        this.total = resp.data.total;
        //关闭loading
        this.$nextTick(() => {
          this.$refs.spinner.loading = false;
        });
      });
    }
  }
};
</script>


<style lang="less" scoped>
.left {
  position: relative;
}
.tagLink {
  text-decoration: none;
  color: rgb(122, 119, 119);
  &:hover {
    color: rgb(32, 178, 170);
  }
}
.cardLink {
  // text-decoration: none;
  color: rgb(83, 83, 83);
  &:hover {
    color: rgb(32, 178, 170);
  }
}
.content {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  overflow: hidden;
  -webkit-box-orient: vertical;
  color: gray;
  font-family: "STHeiti";
  font-size: 0.9rem;
  width: 100%; /*一定要设置宽度，或者元素内含的百分比*/
  text-overflow: ellipsis; /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
.footerItem {
  display: inline-block;
  padding-right: 1rem;
  span {
    color: rgb(202, 202, 202);
  }
}
.cardFooter {
  background-color: rgb(247, 247, 247);
  border-radius: 0.3rem !important;
  border-top: none;
}
.homeMain {
  background-color: #ffffff;
  margin: 2rem auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
}
</style>

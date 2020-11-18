import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";



//vue表单校验插件
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './permission'

Vue.use(ElementUI);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// 跳转后返回顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
})

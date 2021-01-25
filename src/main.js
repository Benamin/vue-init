// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "./http/index";
import "./utils/index"
import "./utils/contants"
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.scss'

Vue.config.productionTip = false


//全局修改默认配置，
Vue.use(ElementUI, {size: 'small', zIndex: 3000}); //样式的size
ElementUI.Dialog.props.closeOnClickModal.default = false; //点击空白处不能关闭弹窗


Vue.component('footer-copyright', {
  template: '<p class="footer-msg">©CopyRight 2021 汇纳科技 版权所有</p>'
});
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  created() {
    // const loading = document.querySelector("#global-loading");
    // loading.style.display = "none";
  }
})

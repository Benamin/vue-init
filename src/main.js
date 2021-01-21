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
Vue.use(ElementUI, {size: 'small', zIndex: 3000});

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

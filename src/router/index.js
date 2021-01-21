import Vue from 'vue'
import Router from 'vue-router'
import List from '@/view/list'
import Login from '@/view/login'
import {getToken} from '@/utils/index';
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router;

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
  } else {
    if (!getToken()) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  }
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

"use strict";

import Vue from 'vue';
import axios from "axios";

export const rest_s = '/api/rest_s/v1';

let config = {
  baseURL: '',
  timeout: 600 * 1000,
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    config.headers.token = localStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.errcode !== "0") {
      window.vm.$message.error({message: data.errmsg, showClose: true})
    }
    return data;
  },
  function (error) {
    if (error.response.status == 400) {
      window.vm.$message.error({message: "请求错误", showClose: true})
    } else if (error.response.status == 401) {
      window.vm.$message.error({message: "未授权，请登录", showClose: true})
    } else if (error.response.status == 404) {
      window.vm.$message.error({message: "请求地址出错", showClose: true})
    } else if (error.response.status == 408) {
      window.vm.$message.error({message: "请求超时", showClose: true})
    } else if (error.response.status == 500) {
      const {message} = error.response.data;
      if (message == "402,token过期请重新登录！") {
        window.vm.$message.error('登录已过期，请重新登录')
        router.replace({path: "/login"})
        return null
      }
      if (message == "401") {
        window.vm.$message.error('登录已过期，请重新登录')
        router.replace({path: "/login"})
        return null
      }
      window.vm.$message.error({message: "服务器内部错误", showClose: true})
    } else if (error.response.status == 501) {
      window.vm.$message.error({message: "服务未实现", showClose: true})
    } else if (error.response.status == 502) {
      window.vm.$message.error({message: "网关错误", showClose: true})
    } else if (error.response.status == 503) {
      window.vm.$message.error({message: "服务不可用", showClose: true})
    } else if (error.response.status == 504) {
      window.vm.$message.error({message: "网关超时", showClose: true})
    } else if (error.response.status == 505) {
      window.vm.$message.error({message: "HTTP版本不受支持", showClose: true})
    }
    const response = {
      data: {success: false, respData: {}}
    }
    return response;
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

import Vue from 'vue';

const utils = {
  downloadFile(title, data) {
    const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});

    const ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
      ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
      ieEDGE = navigator.userAgent.match(/Edge/g),
      ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
    if (ie && ieVer < 10) {
      this.$message.error('No blobs on IE<10');
      return;
    }
    if (ieVer > -1) {
      window.navigator.msSaveBlob(blob, title);
    } else {
      const url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  /**
   * @param data  json格式的数据
   * @returns {string}
   */
  toQuery(data) {
    let str = '?';
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        str += key + '=' + value + '&';
      }
    }
    str = str.substring(0, str.length - 1);
    return str;
  },
  /**
   * JSON格式数据转化为字符串 接口调用  application/x-www-form-urlencoded
   * @param data  json格式的数据
   * @returns {string}
   */
  xxxFormData(data) {
    let str = '';
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        str += key + '=' + value + '&';
      }
    }
    str = str.substring(0, str.length - 1);
    return str;
  },
  JsonToFormData(json) {
    let formData = new FormData();
    for (let k in json) {
      formData.append(k, json[k])
    }
    return formData;
  },
  formatJSON(json) {
    let strArr = [];
    for (let key in json) {
      strArr.push(key + "=" + json[key])
    }
    return strArr.join("&");
  },
}

export function setToken(token) {
  console.log(token);
  localStorage.setItem("token", token)
}

export function getToken() {
  return localStorage.getItem("token")
}

export function removeToken() {
  localStorage.removeItem("token")
}

Vue.prototype.$utils = utils;

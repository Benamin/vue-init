
const formatJSON = (json) => {
  let strArr = [];
  for (let key in json) {
    strArr.push(key + "=" + json[key])
  }
  return strArr.join("&");
}

export function setUserInfo(obj) {
  if (obj instanceof Object) {
    obj = JSON.stringify(obj)
  }
  sessionStorage.setItem("userInfo", obj)
}

export function setToken(token) {
  sessionStorage.setItem("token", token)
}

export function getToken() {
  return sessionStorage.getItem("token")
}

export function removeToken() {
  sessionStorage.removeItem("token")
}

const root = window
const storage = root.localStorage

const localStorage = {
  setItem: function (skey, sval) {
    try {
      return storage.setItem(skey, sval)
    } catch (e) {
      console.info(e)
    }
  },
  getItem: function (skey) {
    try {
      return storage.getItem(skey)
    } catch (e) {
      console.info(e)
      return null
    }
  },
  removeItem: function (skey) {
    try {
      return storage.removeItem(skey)
    } catch (e) {
      console.info(e)
      return null
    }
  },
  getJSON: function (skey, p) {
    try {
      var d = storage.getItem(skey)
      if (d) {
        d = JSON.parse(d)
        return d[p]
      }
    } catch (e) {
      console.info(e)
    }
  },
  setJSON: function (skey, p, val) {
    try {
      var f = storage.getItem(skey)
      f = f ? JSON.parse(f) : {}
      f[p] = val
      storage.setItem(skey, JSON.stringify(f))
    } catch (e) {
      console.info(e)
    }
  },
  removeJSON: function (skey, p) {
    try {
      var d = storage.getItem(skey)
      if (d) {
        d = JSON.parse(d)
        delete d[p]
        storage.setItem(skey, JSON.stringify(d))
      }
    } catch (e) {
      console.info(e)
    }
  }
}

export default {formatJSON, localStorage}

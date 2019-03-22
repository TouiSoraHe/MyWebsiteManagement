// 该脚本执行部分初始化功能
import store from '@/store/store.js'
import { getToken } from '@/utils/auth.js'

function initUserName() {
  const token = getToken()
  if (token) {
    store.commit('changeUserName', JSON.parse(window.atob(token.split('.')[1])).username)
  }
}

initUserName()

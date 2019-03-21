import { login } from '@/api/api.js'

import { removeToken } from '@/utils/auth.js'

const user = {
  state: {
    userName: ''
  },

  mutations: {
    changeUserName(state, newValue) {
      state.userName = newValue
      console.log(state.userName)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          commit('changeUserName', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}

export default user

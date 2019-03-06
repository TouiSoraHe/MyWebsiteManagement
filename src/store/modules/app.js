import { deleteTag } from '@/api/api.js'

const app = {
  state: {
  },
  mutations: {
  },
  actions: {
    Test({ commit }, id) {
      return new Promise((resolve, reject) => {
        deleteTag(1).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app

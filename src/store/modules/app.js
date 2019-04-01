import { getBlogInfos, updateBlogInfo, getBlogInfosById
  , getBlog, addBlog, updateBlog, deleteBlog
  , getTags, getTag, updateTag, addTag, deleteTag
  , getExceptionInfos, deleteExceptionInfo, getExceptionInfo
  , getBloggerInfo, updateBloggerInfo
} from '@/api/api.js'

const app = {
  state: {
    exceptionInfos: []
  },
  mutations: {
    changeExceptionInfos(state, newValue) {
      state.exceptionInfos = newValue
    }
  },
  actions: {
    GetBlog({ commit }, id) {
      return new Promise((resolve, reject) => {
        getBlog(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteBlog({ commit }, id) {
      return new Promise((resolve, reject) => {
        deleteBlog(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetBlogInfos({ commit }) {
      return new Promise((resolve, reject) => {
        getBlogInfos().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetBlogInfosByIds({ commit }, blogInfoIds) {
      return new Promise((resolve, reject) => {
        getBlogInfosById(blogInfoIds).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTags({ commit }) {
      return new Promise((resolve, reject) => {
        getTags().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTag({ commit }, id) {
      return new Promise((resolve, reject) => {
        getTag(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateTag({ commit }, tag) {
      return new Promise((resolve, reject) => {
        updateTag(tag).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddTag({ commit }, tag) {
      return new Promise((resolve, reject) => {
        addTag(tag).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteTag({ commit }, id) {
      return new Promise((resolve, reject) => {
        deleteTag(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetExceptionInfos({ commit }) {
      return new Promise((resolve, reject) => {
        getExceptionInfos().then(response => {
          commit('changeExceptionInfos', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetExceptionInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getExceptionInfo(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteExceptionInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        deleteExceptionInfo(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateBlogInfo({ commit }, bloginfo) {
      return new Promise((resolve, reject) => {
        updateBlogInfo(bloginfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddBlog({ commit }, blog) {
      return new Promise((resolve, reject) => {
        addBlog(blog).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateBlog({ commit }, blog) {
      return new Promise((resolve, reject) => {
        updateBlog(blog).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetBloggerInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getBloggerInfo().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateBloggerInfo({ commit }, bloggerInfo) {
      return new Promise((resolve, reject) => {
        updateBloggerInfo(bloggerInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app

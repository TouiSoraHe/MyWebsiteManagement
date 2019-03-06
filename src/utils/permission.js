import router from '@/router/router.js'
import { getToken } from '@/utils/auth.js' // getToken from cookie

const whiteList = ['/login', '/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(getToken())
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/views/login/login.vue'), },
    { path: '/404', component: () => import('@/views/404/404.vue'), },

    { path: '/', name: 'helloworld', component: () => import('@/views/helloworld.vue'), },

    { path: '*', redirect: '/404', hidden: true, },
  ],
})

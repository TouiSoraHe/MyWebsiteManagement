import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/views/login/login.vue') },
    { path: '/404', component: () => import('@/views/404/404.vue') },

    { path: '/', redirect: '/home/Home' },

    {
      path: '/home',
      component: Layout,
      name: 'home',
      meta: { title: '首页', icon: 'home', navbar: true },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('@/views/home/home.vue'),
          meta: { title: '首页', icon: 'home', navbar: true }
        }
      ]
    },

    {
      path: '/blog-management',
      component: Layout,
      redirect: '/blog-management/blog-list',
      name: 'blog-management',
      meta: { title: '博客管理', icon: 'blogger', navbar: true },
      children: [
        {
          path: 'blog-list',
          name: 'blog-list',
          component: () => import('@/views/blog-list/blog-list.vue'),
          meta: { title: '博客列表', icon: 'view-list', navbar: true }
        },
        {
          path: 'add-blog',
          name: 'add-blog',
          component: () => import('@/views/add-blog/add-blog.vue'),
          meta: { title: '添加博客', icon: 'plus', navbar: true }
        },
        {
          path: 'edit-blog/:id',
          name: 'edit-blog',
          components: {
            default: () => import('@/views/edit-blog/edit-blog.vue')
          },
          props: { default: true },
          meta: { title: '编辑博客', icon: 'plus' }
        }
      ]
    },

    { path: '*', redirect: '/404' }
  ]
})

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
      redirect: '/home/Home',
      name: 'home',
      meta: { title: '首页', icon: 'home', navbar: true, group: false },
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
      path: '/blogger-info-management',
      component: Layout,
      redirect: '/blog-management/blogger-info',
      name: 'blogger-info-management',
      meta: { title: '博主信息', icon: 'account', navbar: true, group: false },
      children: [
        {
          path: 'blogger-info',
          name: 'blogger-info',
          component: () => import('@/views/blogger-info/blogger-info.vue'),
          meta: { title: '博主信息', icon: 'account', navbar: true }
        }
      ]
    },
    {
      path: '/blog-management',
      component: Layout,
      redirect: '/blog-management/blog-list',
      name: 'blog-management',
      meta: { title: '博客管理', icon: 'blogger', navbar: true, group: true },
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
          meta: { title: '编辑博客', icon: '' }
        }
      ]
    },
    {
      path: '/tag-management',
      component: Layout,
      redirect: '/tag-management/tag-list',
      name: 'tag-management',
      meta: { title: '标签管理', icon: 'tag', navbar: true, group: true },
      children: [
        {
          path: 'tag-list',
          name: 'tag-list',
          component: () => import('@/views/tag-list/tag-list.vue'),
          meta: { title: '标签列表', icon: 'view-list', navbar: true }
        },
        {
          path: 'add-tag',
          name: 'add-tag',
          components: {
            default: () => import('@/views/edit-tag/edit-tag.vue')
          },
          meta: { title: '新增标签', icon: 'plus', navbar: true }
        },
        {
          path: 'edit-tag/:id',
          name: 'edit-tag',
          components: {
            default: () => import('@/views/edit-tag/edit-tag.vue')
          },
          props: { default: true },
          meta: { title: '编辑标签', icon: '' }
        }
      ]
    },
    {
      path: '/exception-list',
      component: Layout,
      redirect: '/exception-list/exception',
      name: 'exception-list',
      meta: { title: '异常列表', icon: 'bug', navbar: true, group: false },
      children: [
        {
          path: 'exception',
          name: 'exception',
          component: () => import('@/views/exception-list/exception-list.vue'),
          meta: { title: '异常列表', icon: 'bug', navbar: true }
        },
        {
          path: 'view-exception-info/:id',
          name: 'view-exception-info',
          components: {
            default: () => import('@/views/view-exception-info/view-exception-info.vue')
          },
          props: { default: true },
          meta: { title: '异常详情', icon: '' }
        }
      ]
    },

    { path: '/_empty' },
    { path: '*', redirect: '/404' }
  ]
})

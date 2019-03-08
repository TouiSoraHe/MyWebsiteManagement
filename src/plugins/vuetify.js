import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  icons: {
    'account': 'mdi-account',
    'lock-outline': 'mdi-lock-outline',
    'logout': 'mdi-logout-variant',
    'blogger': 'mdi-blogger',
    'view-list': 'mdi-view-list',
    'home': 'mdi-home',
    'plus': 'mdi-plus',
    'delete': 'mdi-delete',
    'pencil': 'mdi-pencil',
    'filter-variant': 'mdi-filter-variant'
  }
})

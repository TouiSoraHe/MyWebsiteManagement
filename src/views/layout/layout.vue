<template>
  <div>
    <v-toolbar
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ this.$router.currentRoute.meta.title }}</v-toolbar-title>
      <v-spacer />
      <v-menu open-on-hover offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-avatar
            color="grey lighten-4"
            size="36"
            v-on="on"
          >
            <img src="http://p2.music.126.net/OpgpNNPKznDDMxoBqVJy-Q==/2464005557906815.jpg" alt="avatar">
          </v-avatar>
        </template>

        <v-list dense>
          <v-list-tile>
            <v-icon>{{ $vuetify.icons['account'] }}</v-icon>&nbsp;
            <v-list-tile-content>
              <v-list-tile-title>{{ $store.state.user.userName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click.stop="$router.push('/')">
            <v-icon>{{ $vuetify.icons['home'] }}</v-icon>&nbsp;
            <v-list-tile-content>
              <v-list-tile-title>首页</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click.stop="logout">
            <v-icon>{{ $vuetify.icons['logout'] }}</v-icon>&nbsp;
            <v-list-tile-content>
              <v-list-tile-title>登出</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <span v-for="route in routes" :key="route.path">
          <v-list-group
            v-if="route.meta.group"
            :prepend-icon="$vuetify.icons[route.meta.icon]"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ route.meta.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <template v-for="childRoute in route.children">
              <v-list-tile
                v-if="childRoute.meta.navbar"
                :key="childRoute.path"
                @click.stop="clickLink(route.path+'/'+childRoute.path)"
              >
                <v-list-tile-action>
                  <v-icon>{{ $vuetify.icons[childRoute.meta.icon] }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ childRoute.meta.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

          </v-list-group>

          <v-list-tile v-else-if="!route.meta.group" @click.stop="clickLink(route.path+'/'+route.children[0].path)">
            <v-list-tile-action>
              <v-icon>
                {{ $vuetify.icons[route.children[0].meta.icon] }}
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ route.children[0].meta.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </span>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => item.meta && item.meta.navbar)
    }
  },
  methods: {
    logout() {
      const that = this
      this.$store.dispatch('FedLogOut').then(() => {
        that.$router.push({ path: '/login' })
      })
    },
    clickLink(path) {
      if (this.$router.currentRoute.fullPath === path) {
        this.reloadRoute()
      } else {
        this.$router.push({
          path
        })
      }
    },
    reloadRoute() {
      var curruntPath = this.$router.history.current.fullPath
      this.$router.replace({
        path: '/_empty'
      })
      setTimeout(() => {
        this.$router.replace({
          path: curruntPath
        })
      })
    }
  }
}
</script>

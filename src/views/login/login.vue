<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>登录</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  v-validate="'required'"
                  :prepend-icon="$vuetify.icons['account']"
                  name="username"
                  label="UserName"
                  type="text"
                  data-vv-name="username"
                  required
                  :error-messages="errors.collect('username')"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="password"
                  v-validate="'required'"
                  :prepend-icon="$vuetify.icons['lock-outline']"
                  name="password"
                  label="Password"
                  type="password"
                  data-vv-name="password"
                  required
                  :error-messages="errors.collect('password')"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" @click="login">
                登录
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

export default {
  $veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      redirect: undefined,
      dictionary: {
        attributes: {
          username: 'username',
          password: 'password'
        },
        custom: {
          username: {
            required: '用户名不能为空'
          },
          password: {
            required: '密码不能为空'
          }
        }
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.$validator.localize('zh-CN', this.dictionary)
  },
  methods: {
    login() {
      this.alert = false
      this.$validator.validateAll()
        .then((value) => {
          if (value) {
            this.loading = true
            const that = this
            this.$store.dispatch('Login', { username: that.username, password: that.password }).then(() => {
              that.loading = false
              that.$router.push({ path: that.redirect || '/' })
            }).catch((error) => {
              that.loading = false
              that.$tips.showTips({
                color: 'error',
                text: error.response.data || error,
                timeout: 3000
              })
            })
          }
        })
    }
  }
}
</script>

<style scoped>
</style>

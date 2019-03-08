<template>
  <div>
    <div>
      <v-alert
        v-model="alert"
        :type="alertStatus"
        transition="scale-transition"
        dismissible
      >
        {{ alertMessage }}
      </v-alert>
    </div>
    <div>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">
                  {{ props.item.time }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.lastModified }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.words }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.views }}
                </td>
                <td>
                  <v-switch v-model="props.item.released" hide-details @change="releaseItem(props.item)" />
                </td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    {{ $vuetify.icons['pencil'] }}
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(props.item)"
                  >
                    {{ $vuetify.icons['delete'] }}
                  </v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-alert :value="true" color="error">
                  暂无记录
                </v-alert>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    alert: false,
    alertMessage: '',
    alertStatus: 'error',
    headers: [
      {
        text: '标题',
        align: 'left',
        sortable: false,
        value: 'title'
      },
      { text: '发布时间', value: 'time' },
      { text: '最后修改时间', value: 'lastModified' },
      { text: '字数', value: 'words' },
      { text: '查看数', value: 'views' },
      { text: '发布', value: 'name', sortable: false },
      { text: '操作', value: 'name', sortable: false }
    ],
    desserts: []
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.loading = true
      this.$store.dispatch('GetBlogInfos').then((response) => {
        this.loading = false
        this.desserts = response.data
        for (const item of this.desserts) {
          item.time = this.$utils.FormatTime(new Date(item.time), 'yyyy/MM/dd')
          item.lastModified = this.$utils.FormatTime(new Date(item.lastModified), 'yyyy/MM/dd')
          item.released = !item.deleted
        }
      }).catch(() => {
        this.loading = false
      })
    },

    releaseItem(item) {
      item.deleted = !item.released
      this.loading = true
      this.$store.dispatch('UpdateBlogInfo', item).then(() => {
        this.loading = false
      }).catch((error) => {
        // 还原
        item.deleted = !item.deleted
        item.released = !item.released
        this.loading = false
        this.setAlert('error', error.response.data || error)
      })
    },

    editItem(item) {
      this.$router.push('/blog-management/edit-blog/' + item.blogId)
    },

    deleteItem(item) {
      this.loading = true
      this.$store.dispatch('DeleteBlog', item.blogId).then(() => {
        this.loading = false
        this.desserts.splice(this.desserts.indexOf(item), 1)
        this.desserts = [...this.desserts]
      }).catch((error) => {
        this.loading = false
        this.setAlert('error', error.response.data || error)
      })
    },
    setAlert(status, message) {
      this.alert = true
      this.alertStatus = status
      this.alertMessage = message
      window.setTimeout(() => {
        this.alert = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
</style>


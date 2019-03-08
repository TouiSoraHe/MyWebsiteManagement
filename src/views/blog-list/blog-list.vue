<template>
  <div>
    <div>
      <v-alert
        v-model="alert"
        type="error"
        transition="scale-transition"
        dismissible
      >
        {{ errorAlert }}
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
                  {{ props.item.deleted?'已删除':'发布中' }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.words }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.views }}
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
    errorAlert: '',
    headers: [
      {
        text: '标题',
        align: 'left',
        sortable: false,
        value: 'title'
      },
      { text: '发布时间', value: 'time' },
      { text: '最后修改时间', value: 'lastModified' },
      { text: '删除', value: 'deleted', sortable: false },
      { text: '字数', value: 'words' },
      { text: '查看数', value: 'views' },
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
        }
      }).catch(() => {
        this.loading = false
      })
    },

    editItem(item) {
      this.$router.push('/blog-management/edit-blog/' + item.blogId)
    },

    deleteItem(item) {
      item.deleted = !item.deleted
      this.loading = true
      this.$store.dispatch('UpdateBlogInfo', item).then(() => {
        this.loading = false
      }).catch((error) => {
        item.deleted = !item.deleted
        this.loading = false
        this.alert = true
        console.log(this.alert)
        this.errorAlert = error.response.data || error
      })
    }
  }
}
</script>

<style scoped>
</style>


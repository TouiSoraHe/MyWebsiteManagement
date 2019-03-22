<template>
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
            <td>{{ props.item.exceptionName }}</td>
            <td>
              {{ props.item.httpCode }}
            </td>
            <td>
              {{ props.item.method }}
            </td>
            <td>
              {{ props.item.ip }}
            </td>
            <td>
              {{ props.item.url }}
            </td>
            <td>
              {{ props.item.formatTime }}
            </td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="viewItem(props.item)"
              >
                {{ $vuetify.icons['eye'] }}
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
            暂无记录
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
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
        text: '异常名',
        align: 'left',
        value: 'exceptionName'
      },
      { text: '状态码', value: 'httpCode' },
      { text: '请求方式', value: 'method' },
      { text: '请求ip', value: 'ip' },
      { text: '请求url', value: 'url' },
      { text: '时间', value: 'formatTime' },
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
      this.$store.dispatch('GetExceptionInfos').then((response) => {
        this.loading = false
        this.desserts = response.data
        this.desserts.forEach((item) => {
          item.formatTime = this.$utils.FormatTime(new Date(item.time), 'yyyy/MM/dd hh:mm:ss')
        })
      }).catch((error) => {
        this.loading = false
        this.$tips.showTips({
          color: 'error',
          text: error.response.data || error,
          timeout: 3000
        })
      })
    },

    viewItem(item) {
      this.$router.push('/exception-list/view-exception-info/' + item.id)
    },

    deleteItem(item) {
      this.loading = true
      this.$store.dispatch('DeleteExceptionInfo', item.id).then(() => {
        this.loading = false
        this.desserts.splice(this.desserts.indexOf(item), 1)
        this.desserts = [...this.desserts]
      }).catch((error) => {
        this.loading = false
        this.$tips.showTips({
          color: 'error',
          text: error.response.data || error,
          timeout: 3000
        })
      })
    }
  }
}
</script>

<style scoped>
</style>

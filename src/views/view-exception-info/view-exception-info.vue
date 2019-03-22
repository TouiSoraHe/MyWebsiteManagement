<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-card v-if="exceptionInfo">
          <v-card-text class="subheading">
            <table style="word-break:break-all; word-wrap:break-all;">
              <tr v-for="item in exceptionInfoArray" :key="item.key">
                <td class="nowrap">
                  {{ item.key }}
                </td>
                <td class="wrap">
                  {{ item.value }}
                </td>
              </tr>
              <tr>
                <td>请求头:&nbsp;&nbsp;</td>
                <td class="font-weight-black">
                  <v-data-table
                    :items="headers"
                    class="elevation-1"
                    hide-actions
                    hide-headers
                  >
                    <template v-slot:items="props">
                      <td class="nowrap">
                        {{ props.item.key }}
                      </td>
                      <td class="wrap">
                        {{ props.item.value }}
                      </td>
                    </template>
                  </v-data-table>
                </td>
              </tr>
              <tr>
                <td class="nowrap">
                  堆栈信息:
                </td>
                <td class="wrap" style="white-space:pre-line;">
                  {{ exceptionInfo.exceptionStackTrace }}
                </td>
              </tr>
            </table>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn icon :loading="deleteBtnLoading" @click="deleteExceptionInfo">
              <v-icon>{{ this.$vuetify.icons['delete'] }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      exceptionInfo: undefined,
      deleteBtnLoading: false
    }
  },
  computed: {
    headers() {
      if (this.exceptionInfo) {
        const ret = []
        for (const key of Object.keys(this.exceptionInfo.headers)) {
          ret.push({
            'key': key,
            'value': this.exceptionInfo.headers[key]
          })
        }
        return ret
      } else { return [] }
    },
    exceptionInfoArray() {
      if (this.exceptionInfo) {
        const ret = [
          {
            key: '异常类型',
            value: this.exceptionInfo.exceptionName
          },
          {
            key: '异常信息',
            value: this.exceptionInfo.exceptionMessage
          },
          {
            key: '异常时间',
            value: this.$utils.FormatTime(new Date(this.exceptionInfo.time), 'yyyy年MM月dd日 hh时mm分ss秒')
          },
          {
            key: 'Http状态码',
            value: this.exceptionInfo.httpCode
          },
          {
            key: '请求体',
            value: this.exceptionInfo.requestBody || 'null'
          },
          {
            key: '请求方式',
            value: this.exceptionInfo.method
          },
          {
            key: '请求地址',
            value: this.exceptionInfo.url
          },
          {
            key: '请求IP',
            value: this.exceptionInfo.ip
          }
        ]
        return ret
      } else { return [] }
    }

  },
  created() {
    this.exceptionInfo = this.$store.state.app.exceptionInfos.find((item) => {
      return Number(item.id) === Number(this.id)
    })
    if (this.exceptionInfo === undefined) {
      this.$store.dispatch('GetExceptionInfo', this.id).then(response => {
        this.exceptionInfo = response.data
      }).catch(error => {
        this.$tips.showTips({
          color: 'error',
          text: error.response.data || error,
          timeout: 3000
        })
      })
    }
  },
  methods: {
    deleteExceptionInfo() {
      if (this.exceptionInfo) {
        this.deleteBtnLoading = true
        this.$store.dispatch('DeleteExceptionInfo', this.exceptionInfo.id).then(() => {
          this.deleteBtnLoading = false
          this.$tips.showTips({
            color: 'success',
            text: '删除成功',
            timeout: 3000
          })
          this.$router.push('/exception-list/exception')
        }).catch((error) => {
          this.deleteBtnLoading = false
          this.$tips.showTips({
            color: 'error',
            text: error.response.data || error,
            timeout: 3000
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.wrap{
white-space:normal;
word-wrap:break-word;
}

.nowrap{
white-space: nowrap
}
</style>

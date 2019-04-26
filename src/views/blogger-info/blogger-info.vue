<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="config.BloggerInfo.name"
                  label="用户名"
                  placeholder="用户名"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="config.BloggerInfo.email"
                  label="邮箱"
                  placeholder="邮箱地址"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                联系方式:
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogOpenOnClick(0)">
                  <v-icon>
                    {{ $vuetify.icons['plus'] }}
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-flex xs12>
                  <v-layout v-for="(value,key) in config.BloggerInfo.contactInformation" :key="key">
                    <v-flex xs12>
                      <v-text-field v-model="config.BloggerInfo.contactInformation[key]" :label="key"></v-text-field>
                    </v-flex>
                    <v-btn icon @click="$delete(config.BloggerInfo.contactInformation, key)">
                      <v-icon>{{ $vuetify.icons['delete'] }}</v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                背景图设置:
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogOpenOnClick(1)">
                  <v-icon>
                    {{ $vuetify.icons['plus'] }}
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-flex xs12>
                  <v-layout v-for="(value,key) in config.bgUrl" :key="key">
                    <v-flex xs12>
                      <v-text-field v-model="config.bgUrl[key]" :label="key"></v-text-field>
                    </v-flex>
                    <v-btn icon @click="$delete(config.bgUrl, key)">
                      <v-icon>{{ $vuetify.icons['delete'] }}</v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-title>
                网易云后台设置:
              </v-card-title>
              <v-card-text>
                <v-flex xs12>
                  <v-layout v-for="(value,key) in config.musicInfo" :key="key">
                    <v-flex xs12>
                      <v-text-field v-model="config.musicInfo[key]" :label="key"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="submitBtnLoading" @click="submit">
            提交
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-dialog v-model="dialogInfo.switch" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ dialogInfo.title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs3>
                  <v-text-field v-model="dialogInfo.label1Value" :label="dialogInfo.label1" required :error-messages="dialogInfo.errorMessages"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field v-model="dialogInfo.label2Value" :label="dialogInfo.label2" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogAddOnClick">
              添加
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      config: {
        bgUrl: {
          'default': 'https://i.loli.net/2019/04/26/5cc2a033011c3.jpg'
        },
        BloggerInfo: {
          name: '遠空',
          email: '',
          contactInformation: {
          }
        },
        musicInfo: {
          uid: '',
          '登录邮箱': '',
          '登录密码': '',
          '后台地址': ''
        }
      },
      submitBtnLoading: false,
      dialogInfo: {}
    }
  },
  computed: {
  },
  created() {
    this.$nextTick(() => {
      this.getBloggerInfo()
      this.resetDialogInfo()
    })
  },
  methods: {
    getBloggerInfo() {
      this.$store.dispatch('GetBloggerInfo').then(response => {
        Object.assign(this.config, response.data)
      })
    },
    submit() {
      this.$store.dispatch('UpdateBloggerInfo', this.config).then(response => {
        this.$tips.showTips({
          color: 'success',
          text: '修改成功'
        })
      }).catch((error) => {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error,
          timeout: 3000
        })
      })
    },
    resetDialogInfo() {
      this.dialogInfo = {
        switch: false,
        title: 'title',
        label1: 'label1',
        label1Value: undefined,
        label2: 'label2',
        label2Value: undefined,
        type: 0,
        errorMessages: undefined
      }
    },
    dialogOpenOnClick(type) {
      this.resetDialogInfo()
      if (type === 0) {
        this.dialogInfo.type = 0
        this.dialogInfo.switch = true
        this.dialogInfo.title = '添加联系信息:'
        this.dialogInfo.label1 = '联系方式'
        this.dialogInfo.label2 = '联系地址'
      } else if (type === 1) {
        this.dialogInfo.type = 1
        this.dialogInfo.switch = true
        this.dialogInfo.title = '添加背景图:'
        this.dialogInfo.label1 = '应用地址'
        this.dialogInfo.label2 = '背景图地址'
      }
    },
    dialogAddOnClick() {
      if (this.dialogInfo.label1Value) {
        this.dialogInfo.switch = false
        if (this.dialogInfo.type === 0) {
          this.$set(this.config.BloggerInfo.contactInformation, this.dialogInfo.label1Value, this.dialogInfo.label2Value)
        } else if (this.dialogInfo.type === 1) {
          this.$set(this.config.bgUrl, this.dialogInfo.label1Value, this.dialogInfo.label2Value)
        }
      } else {
        this.dialogInfo.errorMessages = '该项不能为空'
      }
    }
  }
}
</script>

<style scoped>
</style>

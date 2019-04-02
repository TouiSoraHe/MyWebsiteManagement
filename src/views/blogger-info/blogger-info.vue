<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="bloggerInfo.username"
                  label="用户名"
                  placeholder="用户名"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="bloggerInfo.email"
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
                  <v-layout v-for="(value,key) in bloggerInfo.contactInformation" :key="key">
                    <v-flex xs12>
                      <v-text-field v-model="bloggerInfo.contactInformation[key]" :label="key"></v-text-field>
                    </v-flex>
                    <v-btn icon @click="$delete(bloggerInfo.contactInformation, key)">
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
                  <v-layout v-for="(value,key) in bloggerInfo.headImg" :key="key">
                    <v-flex xs12>
                      <v-text-field v-model="bloggerInfo.headImg[key]" :label="key"></v-text-field>
                    </v-flex>
                    <v-btn icon @click="$delete(bloggerInfo.headImg, key)">
                      <v-icon>{{ $vuetify.icons['delete'] }}</v-icon>
                    </v-btn>
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
      bloggerInfo: {
        contactInformation: {},
        headImg: {}
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
        this.bloggerInfo = response.data
      })
    },
    submit() {
      this.$store.dispatch('UpdateBloggerInfo', this.bloggerInfo).then(response => {
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
        this.dialogInfo.label1 = '背景图类型'
        this.dialogInfo.label2 = '背景图地址'
      }
    },
    dialogAddOnClick() {
      if (this.dialogInfo.label1Value) {
        this.dialogInfo.switch = false
        if (this.dialogInfo.type === 0) {
          this.$set(this.bloggerInfo.contactInformation, this.dialogInfo.label1Value, this.dialogInfo.label2Value)
        } else if (this.dialogInfo.type === 1) {
          this.$set(this.bloggerInfo.headImg, this.dialogInfo.label1Value, this.dialogInfo.label2Value)
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

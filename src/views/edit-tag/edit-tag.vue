<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="tag.tagName"
          label="标签名"
        ></v-text-field>
      </v-flex>
      <v-flex sm8 xs12></v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="tag.tagImg.small"
          label="背景图(小尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="tag.tagImg.medium"
          label="背景图(中尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="tag.tagImg.large"
          label="背景图(大尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-list
            subheader
            one-line
          >
            <v-subheader>
              文章列表
              <v-spacer></v-spacer>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                  >
                    <v-icon>{{ $vuetify.icons['plus'] }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in filterBlogInfos"
                    :key="index"
                    @click="addBlog(item)"
                  >
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-subheader>

            <v-list-tile v-for="(item,index) in selectBlogInfos" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="removeBlog(item)">
                  <v-icon>{{ $vuetify.icons['delete'] }}</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="id" :loading="deleteBtnLoading" @click="deleteTag">
            删除标签
          </v-btn>
          <v-btn :loading="submitBtnLoading" @click="submit">
            提交
          </v-btn>
        </v-card-actions>
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
      tag: {
        tagImg: {

        },
        blogInfoIDs: []
      },
      blogInfos: [],
      submitBtnLoading: false,
      deleteBtnLoading: false
    }
  },
  computed: {
    filterBlogInfos() {
      return this.blogInfos.filter(item => {
        return !this.tag.blogInfoIDs.includes(item.id)
      })
    },
    selectBlogInfos() {
      return this.blogInfos.filter(item => {
        return this.tag.blogInfoIDs.includes(item.id)
      })
    }
  },
  created() {
    if (this.id) {
      this.getTag()
    }
    this.getBlogInfos()
  },
  methods: {
    async getTag() {
      this.$store.dispatch('GetTag', this.id).then((response) => {
        this.tag = response.data
      }).catch((error) => {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error
        })
      })
    },
    getBlogInfos() {
      this.$store.dispatch('GetBlogInfos').then((response) => {
        this.blogInfos = response.data
      }).catch((error) => {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error
        })
      })
    },
    addBlog(blogInfo) {
      this.tag.blogInfoIDs.push(blogInfo.id)
    },
    removeBlog(blogInfo) {
      this.tag.blogInfoIDs = this.tag.blogInfoIDs.filter(id => {
        return id !== blogInfo.id
      })
    },
    submit() {
      // 说明这是新建
      this.submitBtnLoading = true
      if (this.id === undefined) {
        this.$store.dispatch('AddTag', this.tag).then(response => {
          this.$tips.showTips({
            color: 'success',
            text: '新建成功',
            timeout: 2000
          })
          this.tag = response.data
          this.submitBtnLoading = false
        }).catch(error => {
          this.$tips.showTips({
            color: 'error',
            text: error.response ? error.response.data || error : error,
            timeout: 3000
          })
          this.submitBtnLoading = false
        })
        // 说明这是编辑
      } else {
        this.$store.dispatch('UpdateTag', this.tag).then(response => {
          this.$tips.showTips({
            color: 'success',
            text: '修改成功',
            timeout: 2000
          })
          this.tag = response.data
          this.submitBtnLoading = false
        }).catch(error => {
          this.$tips.showTips({
            color: 'error',
            text: error.response ? error.response.data || error : error,
            timeout: 3000
          })
          this.submitBtnLoading = false
        })
      }
    },
    deleteTag() {
      if (confirm('确认删除标签?')) {
        this.deleteBtnLoading = true
        this.$store.dispatch('DeleteTag', this.tag.id).then(response => {
          this.deleteBtnLoading = false
          this.$tips.showTips({
            color: 'success',
            text: '删除成功',
            timeout: 2000
          })
          this.$router.push('/tag-management/tag-list')
        }).catch(error => {
          this.deleteBtnLoading = false
          this.$tips.showTips({
            color: 'error',
            text: error.response ? error.response.data || error : error,
            timeout: 3000
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>

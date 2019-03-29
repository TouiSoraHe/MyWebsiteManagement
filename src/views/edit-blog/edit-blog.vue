<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          v-model="blog.blogInfo.title"
          label="标题"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-combobox
          v-model="tagNames"
          :items="existedTagNames"
          label="标签"
          chips
          clearable
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              :selected="data.selected"
              close
              @input="remove(data.item)"
            >
              <strong>{{ data.item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-textarea
          v-model="blog.blogInfo.summary"
          auto-grow
          label="摘要"
          rows="1"
        ></v-textarea>
      </v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="blog.blogInfo.bgImg.small"
          label="背景图(小尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="blog.blogInfo.bgImg.medium"
          label="背景图(中尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex sm4 xs12>
        <v-text-field
          v-model="blog.blogInfo.bgImg.large"
          label="背景图(大尺寸)"
          placeholder="图片 URL"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <markdown-editor ref="markdownEditor" v-model="blog.content"></markdown-editor>
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
  </v-container>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'
import { getBlog, setBlog, removeBlog } from '@/utils/blog.js'

export default {
  components: {
    markdownEditor
  },
  props: {
    id: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      blog: {
        id: this.id,
        blogInfo: {
          bgImg: {},
          tags: []
        }
      },
      tags: [],
      submitBtnLoading: false,
      needSaveBlog: false,
      saveBlogIntervalId: undefined
    }
  },
  computed: {
    tagNames: {
      get: function() {
        const names = []
        this.blog.blogInfo.tags.forEach(item => {
          names.push(item.tagName)
        })
        return names
      },
      set: function(newValue) {
        this.blog.blogInfo.tags = []
        newValue.forEach(item => {
          this.blog.blogInfo.tags.push({
            tagName: item
          })
        })
      }

    },
    existedTagNames() {
      const names = []
      this.tags.forEach(item => {
        names.push(item.tagName)
      })
      return names
    },
    blogContent() {
      return this.blog.content
    }
  },
  watch: {
    blogContent(newValue, oldValue) {
      if (oldValue === undefined) return
      this.needSaveBlog = true
    }
  },
  mounted() {
    this.saveBlogIntervalId = setInterval(() => {
      if (this.needSaveBlog) {
        this.needSaveBlog = false
        this.saveBlog()
      }
    }, 10000)
  },
  beforeDestroy() {
    if (this.needSaveBlog) {
      this.needSaveBlog = false
      this.saveBlog()
    }
    clearInterval(this.saveBlogIntervalId)
  },
  created() {
    const blog = getBlog(this.blog)
    if (this.id) {
      if (blog) {
        if (confirm('检测到本地有未上传的副本,是否使用本地副本')) {
          this.blog = blog
        } else {
          this.deleteBlog(this.blog)
          this.getBlogFromServer()
        }
      } else {
        this.getBlogFromServer()
      }
    } else if (blog) {
      this.blog = blog
    }
    this.$store.dispatch('GetTags').then((response) => {
      this.tags = response.data
    }).catch(() => {
    })
  },
  methods: {
    submit() {
      // 说明这是新建
      this.submitBtnLoading = true
      if (this.id === undefined) {
        this.$store.dispatch('AddBlog', this.blog).then(response => {
          this.deleteBlog()
          this.$tips.showTips({
            color: 'success',
            text: '新建成功',
            timeout: 2000
          })
          this.blog = response.data
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
        this.$store.dispatch('UpdateBlog', this.blog).then(response => {
          this.deleteBlog()
          this.$tips.showTips({
            color: 'success',
            text: '修改成功',
            timeout: 2000
          })
          this.blog = response.data
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
    getBlogFromServer() {
      this.$store.dispatch('GetBlog', this.id).then((response) => {
        this.blog = response.data
        this.needSaveBlog = false
      }).catch((error) => {
        this.$tips.showTips({
          color: 'error',
          text: error.response.data || error
        })
      })
    },
    remove(item) {
      this.tagNames.splice(this.tagNames.indexOf(item), 1)
      this.tagNames = [...this.tagNames]
    },
    saveBlog() {
      setBlog(this.blog)
    },
    loadBlog() {
      this.blog = getBlog(this.blog) || this.blog
    },
    deleteBlog() {
      removeBlog(this.blog)
    }
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';
</style>

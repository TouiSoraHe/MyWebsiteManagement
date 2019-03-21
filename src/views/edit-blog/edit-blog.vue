<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="blog.blogInfo.title"
            label="标题"
          />
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
          />
        </v-flex>
        <v-flex sm4 xs12>
          <v-text-field
            v-model="blog.blogInfo.bgImg.small"
            label="背景图(小尺寸)"
            placeholder="图片 URL"
          />
        </v-flex>
        <v-flex sm4 xs12>
          <v-text-field
            v-model="blog.blogInfo.bgImg.medium"
            label="背景图(中尺寸)"
            placeholder="图片 URL"
          />
        </v-flex>
        <v-flex sm4 xs12>
          <v-text-field
            v-model="blog.blogInfo.bgImg.large"
            label="背景图(大尺寸)"
            placeholder="图片 URL"
          />
        </v-flex>
        <v-flex xs12>
          <markdown-editor ref="markdownEditor" v-model="blog.content" />
        </v-flex>
        <v-flex xs12>
          <v-spacer />
          <v-btn :loading="submitBtnLoading" @click="submit">
            提交
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { markdownEditor } from 'vue-simplemde'

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
        blogInfo: {
          bgImg: {},
          tags: []
        }
      },
      tags: [],
      submitBtnLoading: false
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
    }
  },
  created() {
    if (this.id) {
      this.$store.dispatch('GetBlog', this.id).then((response) => {
        this.blog = response.data
      }).catch((error) => {
        this.$tips.showTips({
          color: 'error',
          text: error.response.data || error
        })
      })
      this.$store.dispatch('GetTags').then((response) => {
        this.tags = response.data
      }).catch(() => {
      })
    }
  },
  methods: {
    submit() {
      // 说明这是新建
      this.submitBtnLoading = true
      if (this.id === undefined) {
        this.$store.dispatch('AddBlog', this.blog).then(response => {
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
            text: error.response.data || error,
            timeout: 3000
          })
          this.submitBtnLoading = false
        })
        // 说明这是编辑
      } else {
        this.$store.dispatch('UpdateBlog', this.blog).then(response => {
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
            text: error.response.data || error,
            timeout: 3000
          })
          this.submitBtnLoading = false
        })
      }
    },
    remove(item) {
      this.tagNames.splice(this.tagNames.indexOf(item), 1)
      this.tagNames = [...this.tagNames]
    }
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';
</style>

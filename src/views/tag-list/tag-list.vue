<template>
  <v-container fluid fill-height>
    <v-layout align-center>
      <v-flex shrink>
        <v-hover v-for="item in tags" :key="item.id">
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 0}`" width="150px" height="150px" :to="'/tag-management/edit-tag/'+item.id" style="float: left;" class="ma-3">
            <v-img class="white--text" :src="item.tagImg.small || ''" style="height: 100%;width:100%;">
              <v-container fill-height fluid ma-0 pa-0>
                <v-layout ma-0 pa-0 fill-height>
                  <v-flex xs12 flexbox class="white--text text-center vertical-middle" fill-height style="background: rgba(0,0,0,.3);margin-top: auto;margin-bottom: auto;">
                    <div>
                      <div class="headline">
                        {{ item.tagName }}
                      </div>
                      <v-divider color="#fff" class="my-1"></v-divider>
                      <div class="caption">
                        共{{ item.blogInfoIDs.length }}篇
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    getTags() {
      this.$store.dispatch('GetTags').then(response => {
        this.tags = response.data
      }).catch(error => {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error,
          timeout: 3000
        })
      })
    }
  }
}
</script>
<style scoped>
.text-center {
    text-align: center;
}

.vertical-middle{
    display: table;
}

.vertical-middle > *{
    display: table-cell;
    vertical-align: middle;
}
</style>

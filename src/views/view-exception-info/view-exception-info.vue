<template>
  <div>
    <v-btn @click="test">
      点一下,玩一年
    </v-btn>
  </div>
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
      exceptionInfo: undefined
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
    test() {
      this.$tips.showTips({
        color: 'info',
        text: 'hello world',
        timeout: 3000
      })
    }
  }
}
</script>

<style scoped>
</style>

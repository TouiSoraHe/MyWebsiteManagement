<template>
  <div>
    <v-card>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
        aspect-ratio="2.75"
      />

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            Kangaroo Valley Safari
          </h3>
          <div> {{ card_text }} </div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn
          flat
          color="orange"
          :to="'/404'"
        >
          Share
        </v-btn>
        <v-btn
          flat
          color="orange"
          @click="explore"
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card_text: 'HAHAHA'
    }
  },
  methods: {
    explore() {
      this.$store.dispatch('Test', { id: 1 })
    }
  }
}
</script>

<style scoped>
</style>

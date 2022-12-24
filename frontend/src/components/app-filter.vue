<template>
  <section class="app-filter">
    <input
      type="search"
      v-model="filter.txt"
      @search="search"
      placeholder="Search for anything"
    />
  </section>
</template>

<script>
export default {
  name: 'app-filter',
  data() {
    return {
      filter: {
        txt: '',
      },
    }
  },
  methods: {
    search() {
      this.$store.commit({ type: 'setFilter', filter: this.filter })
    },
  },
}
</script>

<style></style>

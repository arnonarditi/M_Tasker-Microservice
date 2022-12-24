<template>
  <section class="app-home flex justify-center align-center">
    <h1>Mister Tasker CA bootCamp sep22</h1>
  </section>
</template>

<script>
export default {
  name: 'app-home',
  computed: {
    getMsg() {
      return this.$store.getters.getMsg
    },
  },
}
</script>

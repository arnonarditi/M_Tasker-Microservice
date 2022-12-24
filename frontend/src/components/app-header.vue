<template>
  <header class="app-header full main-container">
    <div class="header-container flex space-between align-center">
      <h1>MisterTasker</h1>
      <div class="action-container">
        <button
          @click="isOpen = !isOpen"
          class="icon menu-btn"
          v-icon="'bars'"
        ></button>
      </div>
      <app-nav :isOpen="isOpen" @toggle-open="isOpen = !isOpen"></app-nav>
    </div>
  </header>
</template>

<script>
import appNav from './app-nav.vue'
export default {
  name: 'app-header',
  data() {
    return {
      isOpen: false,
    }
  },
  components: {
    appNav,
  },
}
</script>

<style></style>

<template>
  <section class="app-container main-container">
    <app-header></app-header>
    <main class="main-container full">
      <RouterView />
    </main>
    <app-footer></app-footer>
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import { RouterLink, RouterView } from 'vue-router'
import appFooter from './components/app-footer.vue'
export default {
  name: 'app',
  components: {
    RouterLink,
    RouterView,
    appHeader,
    appFooter,
  },
  created() {
    console.log(
      '%c Vue3 cli starter\n In this starter you have:\n 1. Google maps - add your api key\n 2. Vue 3 charts for dashboard \n 3. Svg service.\n 4. Crud-suit package for basic CRUD service\n 5. Socket service\n 6. Vuex store\n 7. Vue-router',
      'color:lightgreen  '
    )
  },
}
</script>

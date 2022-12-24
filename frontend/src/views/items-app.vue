<template>
  <section>
    <actions-container @action="action" :isWorkerRunning="isWorkerRunning" />
    <app-labels />
    <app-filter />
    <loader v-if="!items" />
    <items-list @start="start" v-else :items="items" />
    <!-- <add-task></add-task> -->
    <!-- <pre>{{ getTasks }}</pre> -->
  </section>
  <RouterView />

</template>

<script>
import appLabels from '../components/app-labels.vue'
import loader from '../components/loader.vue'
import itemsList from '../components/items-list.vue'
import appFilter from '../components/app-filter.vue'
import actionsContainer from '../components/actions-container.vue'
// Note tals working

import { socketService } from './../services/socket.service'
import { microSocketService } from './../services/socket.micro.service'
export default {
  name: 'items-app',
  components: {
    itemsList,
    appFilter,
    loader,
    actionsContainer,
    appLabels,
  },
  created() {

    microSocketService.on('update-task', (data) => {
      this.$store.commit({ type: 'updateTask', data })
    })
    // sockets from main backend
    socketService.on('update-task', (data) => {
      this.$store.commit({ type: 'updateTask', data })
    })
    this.$store.dispatch({ type: 'loadItems' })
  },
  methods: {
    start(itemId) {
      const itemForUpdate = this.items.find((item) => item._id === itemId)
      const dispatchName =
        itemForUpdate.triesCount >= 5 || itemForUpdate.status === 'done'
          ? 'remove'
          : 'start'
      this.$store.dispatch({ type: dispatchName, itemId })
    },
    action(value) {
      if (value === 'addTask') {
        this.$router.push('/item/add')
      }
      this.$store.dispatch({ type: 'onAction', value })
    },
  },
  computed: {
    items() {
      const filterBy = this.$store.getters.getFilter
      let items = this.$store.getters.getItems
      
      if (!filterBy) return items
      const regex = new RegExp(filterBy.txt, 'i')
      return items.filter((item) => regex.test(item.title))
    },
    isWorkerRunning() {
      return this.$store.getters.workerStatus
    },
  },
}
</script>

<style></style>

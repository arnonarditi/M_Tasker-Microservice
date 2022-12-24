<template>
  <section class="actions-container flex">
    <button
      v-for="(action, idx) in actions"
      :key="idx"
      :class="action.class"
      @click="$emit('action', action.type)"
    >
      {{ action.value }}
    </button>
    <button class="worker" @click="$emit('action', 'toggleWorker')">
      {{ isWorkerRunning ? 'Stop' : 'Start' }} task worker
    </button>
  </section>
</template>

<script>
export default {
  name: 'actions-container',
  props: {
    isWorkerRunning: Boolean,
  },
  data() {
    return {
      actions: [
        // {
        //   type: 'generateTasks',
        //   value: 'Generate tasks',
        //   class: 'generate',
        // },
        // {
        //   type: 'clearTasks',
        //   value: 'Clear tasks',
        //   class: 'clear-all',
        // },
        {
          type: 'addTask',
          value: 'Add Task',
          class: 'create',
        },
      ],
    }
  },
}
</script>

<style></style>

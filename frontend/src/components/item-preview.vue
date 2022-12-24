<template>
  <section class="task-row">
    <section class="item-preview grid">
      <p>{{ item.title }}</p>
      <p>{{ item.status }}</p>
      <p>{{ item.importance }}</p>
      <p>{{ item.triesCount }}</p>
      <div class="actions-container">
        <button
          :class="['row-action', setBtnState]"
          v-if="item.status !== 'running'"
          @click="$emit('start', item._id)"
        >
          {{ setBtnState }}
        </button>
      </div>
    </section>
    <details>
      <summary>Details</summary>
      <p><span>Description:</span> {{ item.description }}</p>
      <p>
        <span>Errors: </span>
        <span v-for="(error, idx) in item.errors" :key="idx"
          >{{ error }} |
        </span>
      </p>
    </details>
  </section>
</template>

<script>
export default {
  name: 'item-preview',
  props: {
    item: Object,
  },
  data() {
    return {
      btnState: 'start',
    }
  },
  computed: {
    setBtnState() {
      if (this.item.triesCount >= 5) return 'Delete'
      if (this.item.status === 'done') return 'Delete'
      if (this.item.errors.length) return 'Retry'
      if (this.item.status == 'new task') return 'Start'
      console.log('this.btnStat:', this.btnState)
    },
  },
}
</script>

<style></style>

<template>
  <section class="item-list">
    <item-preview
      @start="$emit('start', $event)"
      v-for="item in items"
      :key="item._id"
      :item="item"
    />
  </section>
</template>

<script>
import itemPreview from './item-preview.vue'
export default {
  name: 'item-list',
  props: {
    items: Array,
  },
  components: {
    itemPreview,
  },
}
</script>

<style></style>

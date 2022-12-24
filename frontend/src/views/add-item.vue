<template>
  <section class="item-details flex align-center justify-center">
    <h3>Add Task</h3>

    <form @submit.prevent="save">
      <input required type="text" name="title" v-model="task.title" />
      <input required type="number" name="importance" v-model.number="task.importance" />
      <button @click.prevent="save">Add Task</button>
    </form>
    <button @click="goTo()">Go back</button>
  </section>
</template>

<script>
export default {
  name: 'item-details',
  data() {
    return {
      task: {
        title: 'Task title',
        importance: 1,
        status: 'new task',
        description: 'new task desc',
        triesCount: 0,
        doneAt: null,
        errors: [],
        lasTried: null
      },
    }
  },
  created(){
    console.log('create')
  },

  methods: {
    goTo() {
      this.$router.back()
    },
    save() {
      this.task.createdAt = Date.now()
      this.$store.dispatch({ type: 'addTask', task: this.task })
      this.$router.back()
    },
  },
}
</script>

<style>

</style>

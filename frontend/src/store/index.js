import { createStore } from 'vuex'
import { itemService } from '../services/item.service'
// Create a new store instance.
export const store = createStore({
  state: {
    msg: 'store is connected',
    filterBy: null,
    items: null,
    isWorkerRunning: false,
  },
  getters: {
    getItems(state) {
      return state.items
    },
    getFilter(state) {
      return state.filterBy
    },
    getMsg(state) {
      return state.msg
    },
    workerStatus(state) {
      return state.isWorkerRunning
    },
  },
  mutations: {
    setFilter(state, { filter }) {
      state.filterBy = { ...filter }
    },
    setItems(state, { items }) {
      state.items = items
    },
    updateTask(state, { data }) {
     
      const idx = state.items.findIndex((item) => item._id === data._id)
      state.items.splice(idx, 1, data)
    },
    remove(state, { itemId }) {
      const idx = state.items.findIndex((item) => item._id === itemId)
      state.items.splice(idx, 1)
    },
    setWorkerStatus(state, { value }) {
      state.isWorkerRunning = value
    },
    AddTask(state, { task }) {
      state.items.push(task)
    },
  },
  actions: {
    async loadItems({ commit }) {
      const items = await itemService.query()
      console.log('items:', items)
      commit({ type: 'setItems', items })
    },
    async start({ state }, { itemId }) {
      try {
        await itemService.start(itemId)
      } catch (error) { }
    },
    async remove({ commit }, { itemId }) {
      try {
        commit({ type: 'remove', itemId })
        await itemService.remove(itemId)
      } catch (error) { }
    },
    async addTask({ commit }, { task }) {
      try {
        console.log('task:', task)
        const taskToAdd = await itemService.save(task)
        commit({ type: 'AddTask', task: taskToAdd })
      } catch (error) { }
    },
    async onAction({ commit, state }, { value }) {
      try {
        switch (value) {
          case 'toggleWorker':
            state.isWorkerRunning = !state.isWorkerRunning
           
            itemService.toggleWorker(state.isWorkerRunning)
            break
          case 'clearTasks':
            console.log('value:', value)
            break
          case 'generateTasks':
            const items = await itemService.generate()
            commit({ type: 'setItems', items })
            break

          default:
            break
        }
      } catch (error) { }
    },
    async startMicroService() {
      await itemService.microService()
    },
  },
  modules: {},
})

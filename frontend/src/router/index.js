import { createRouter, createWebHashHistory } from 'vue-router'
import appHome from './../views/HomeView.vue'
import aboutView from '../views/AboutView.vue'
import itemsApp from './../views/items-app.vue'
import appMap from './../views/app-map.vue'

import addItem from './../views/Add-item.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: appHome,
    },
    {
      path: '/item',
      name: 'app',
      component: itemsApp,
      children: [
        {
          path: '/item/add',
          name: 'add',
          props: true,
          component: addItem,
        },
      ],
    },

    {
      path: '/about',
      name: 'about',
      component: aboutView,
    },
    {
      path: '/map',
      name: 'map',
      component: appMap,
    },
  ],
})

export default router

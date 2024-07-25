import { createRouter, createWebHistory } from 'vue-router'
import TodoIst from '../views/TodoIst.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TodoIst',
      component: TodoIst
    }
  ]
})

export default router

import { createWebHistory, createRouter } from 'vue-router'
import Main from './components/Main.vue'
import Docs from './components/docs/Docs.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

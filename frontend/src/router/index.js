import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Entry from '../views/Entry'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/entry',
    name: 'Entry',
    component: Entry
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StudentInfo from "@/components/StudentInfo/StudentInfo.vue";
import Login from "@/views/Login/Login.vue";
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/login',
    name: 'Login',
    component: Login
  },
  {path: '/student-info/:id',
    name: 'Student Info',
    component: StudentInfo,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/currencyconverter',
    name: 'CurrencyConverter',
    component: () => import('../components/CurrencyConverter/CurrencyConverter.vue')
  },
  {
    path: '/novaposhta',
    name: 'NovaPoshta',
    component: () => import('../components/NovaPoshta/NovaPoshta.vue')
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather/Weather.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!store.getters.getUser){
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

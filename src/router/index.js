import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {checkAuthState} from '@/firebase/auth';
import Accounts from '@/components/core/Accounts.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: false, },
    component: Home,
  },
  {
    path: '/accounts',
    name: 'accounts',
    meta: { requiresAuth: true, },
    component: Accounts,
  },
  {
    path: '/transactions',
    name: 'transactions',
    meta: { requiresAuth: true, },
    component: () => import(/* webpackChunkName: "about" */ '../components/core/Transactions.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { requiresAuth: true, },
    component: () => import(/* webpackChunkName: "about" */ '../components/core/Categories.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: { requiresAuth: false, },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false, },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: async (to, from, next) => {
      if (await checkAuthState().catch(() => {})) {
        next( {name: 'home'});
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Global before each guard
router.beforeEach(async (to, from, next) => {
  const user = await checkAuthState().catch( () => {});
  if (to.name !== 'login' && !user && to.meta.requiresAuth) {
    next( {name: 'login'});
  } else {
    next();
  }
});


export default router

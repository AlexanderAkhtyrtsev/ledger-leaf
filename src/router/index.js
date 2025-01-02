import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {checkAuthState} from '@/firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
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
  if (to.name !== 'login' && !user) {
    next( {name: 'login'});
  } else {
    next();
  }
});


export default router

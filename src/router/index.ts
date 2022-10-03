import { createRouter, createWebHashHistory } from 'vue-router';
import { supabase } from '@/supabase/init';
import MainView from '../views/MainView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      meta: {
        title: 'Home',
        auth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register',
        auth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login',
        auth: false,
      },
    },
  ],
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireChat`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: 'login' });
    return;
  }

  if (user) {
    next({ name: 'home' });
  }

  next();
});

export default router;

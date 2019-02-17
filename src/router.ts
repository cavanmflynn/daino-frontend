import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Landing from './components/pages/landing';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ './components/pages/login'),
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (auth.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "auth" */ './components/pages/signup'),
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (user.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "user" */ './components/pages/user'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (to.hash.includes('@')) {
    // Profile mode
    const username = to.hash.replace('@', '').replace('#', '');
    next(`user#profile-${username}`);
  }
  // } else if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('user');
  else next();
});

export default router;

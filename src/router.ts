import { createWebHistory, createRouter } from 'vue-router';
import Main from './components/Main.vue';
import Docs from './components/docs/Docs.vue';
import { getConfigFile } from './assets/ts/utils';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    props: (route: any) => route.meta.props || {}, // Pass the props from the meta object
    // @ts-ignore
    async beforeEnter(to, from, next) {
      const config = await getConfigFile();
      to.meta.props = { config };
      next();
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

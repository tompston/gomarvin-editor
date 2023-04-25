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
      const config = await getConfigFile(); // Fetch the async data
      // console.log('config', config);
      to.meta.props = { config }; // Store the async data in the meta object
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

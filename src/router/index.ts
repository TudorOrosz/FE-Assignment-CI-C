import type { RouteLocationNormalized } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ShowDetailView from '../views/ShowDetailView.vue';
import SearchView from '../views/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/show/:id',
    name: 'ShowDetail',
    component: ShowDetailView,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
    props: (route: RouteLocationNormalized) => ({ query: String(route.query.q || '') }),
  },
];

export default routes;

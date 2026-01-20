import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AboutUs from '../views/AboutUs.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: AboutUs
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

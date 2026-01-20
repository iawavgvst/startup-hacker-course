import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/start',
        name: 'game',
        component: GameView,
        props: (route) => ({
            difficulty: route.query.difficulty || 'easy'
        })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
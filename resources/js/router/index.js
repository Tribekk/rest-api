import { createRouter, createWebHistory } from "vue-router";
import home from "../components/Home.vue";
import Desks from "../components/Desks/Desks.vue";
import ShowDesk from "../components/Desks/ShowDesk.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
    },
    {
        path: "/desks",
        name: "desks",
        component: Desks,
    },
    {
        path: "/desks/:deskId",
        name: "ShowDesk",
        component: ShowDesk,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

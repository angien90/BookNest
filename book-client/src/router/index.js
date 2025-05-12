import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", component: HomeView },
//  { path: "/bookpage", component: BookView },
  { path: "/bookpage/:bookId", component: BookView },
  { path: "/loginpage", component: LoginView },
  { path: "/registerpage", component: RegisterView },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

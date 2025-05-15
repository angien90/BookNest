import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddBooksView from "../views/AddBooksView.vue";
import AdminPanelBookView from "../views/AdminPanelBookView.vue";
import AdminUserView from "../views/AdminUserView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/bookpage/:bookId", component: BookView },
  { path: "/loginpage", component: LoginView },
  { path: "/registerpage", component: RegisterView },
  { path: "/addbook", component: AddBooksView },
  { path: "/adminpanelbooks", component: AdminPanelBookView },
  { path: "/adminusers", component: AdminUserView },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

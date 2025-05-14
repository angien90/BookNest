import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddBooksView from "../views/AddBooksView.vue";
import AdminPanelBookView from "../views/AdminPanelBookView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/bookpage/:bookId", component: BookView },
  { path: "/loginpage", component: LoginView },
  { path: "/registerpage", component: RegisterView },
  { path: "/addbook", component: AddBooksView },
  { path: "/adminpanelbooks", component: AdminPanelBookView/*, meta: { requiresAuth: true } */},
];

// ✅ Skapa router först
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

// ✅ Använd router i beforeEach EFTER att den är skapad
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: "/loginpage", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;


import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookView from "../views/BookView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddBooksView from "../views/AddBooksView.vue";
import AdminPanelBookView from "../views/AdminPanelBookView.vue";
import AdminUserView from "../views/AdminUserView.vue";
import EditBook from "../views/EditBook.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/bookpage/:bookId", component: BookView },
  { path: "/loginpage", component: LoginView },
  { path: "/registerpage", component: RegisterView },
  { path: "/addbook", component: AddBooksView, meta: { requiresAuth: true }},
  { path: "/adminpanelbooks", component: AdminPanelBookView, meta: { requiresAuth: true }},
  { path: "/adminpanelusers", component: AdminUserView, meta: { requiresAuth: true }},
  { path: '/editbook/:id', name: 'EditBook', component: () => import('@/views/EditBook.vue')}
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/loginpage'); 
  } else {
    next();
  }
});

export default router;


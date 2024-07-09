import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";
import Operation from "./components/Operation.vue";

const routes = [
  {
    path: "/operation",
    component: Operation,
  },
  {
    path: "/login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//router.beforeEach((to, from, next) => {
 //   const publicPages = ['/login'];
  //  const authRequired = !publicPages.includes(to.path);
   // const loggedIn = localStorage.getItem('userCookie');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
//    if (authRequired && !loggedIn) {
//      next('/login');
//    } else {
//      next();
//    }
//  });

export default router;
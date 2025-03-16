document.addEventListener("DOMContentLoaded", () => {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/contact", component: ContactPage },
     { path: "/table", component: TablePage },  // New route
  ];

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  });

  const app = Vue.createApp({});
  app.use(router);
  app.mount("#app");
});

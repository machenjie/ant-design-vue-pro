import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Login.vue")
        },
        {
          path: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Register.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      children: [
        {
          path: "",
          redirect: "dashboard"
        },
        {
          path: "dashboard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "",
              redirect: "analysis"
            },
            {
              path: "analysis",
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/dashboard/Analysis.vue")
            }
          ]
        },
        {
          path: "form",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "",
              redirect: "basic-form"
            },
            {
              path: "basic-form",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/form/BasicForm.vue")
            },
            {
              path: "setup-from",
              component: { render: h => h("router-view") },
              children: [
                {
                  path: "",
                  redirect: "info"
                },
                {
                  path: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/setup/Info.vue")
                },
                {
                  path: "confirm",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/setup/Confirm.vue")
                },
                {
                  path: "result",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/setup/Result.vue")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      redirect: "/user/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

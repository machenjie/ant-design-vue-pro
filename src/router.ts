import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login.vue")
      },
      {
        path: "/user/register",
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
        path: "/",
        redirect: "/dashboard"
      },
      {
        path: "/dashboard",
        meta: {
          menuNode: true,
          icon: "dashboard",
          title: "Dashboard"
        },
        component: { render: (h: any) => h("router-view") },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            meta: {
              menuNode: true,
              title: "Analysis"
            },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "./views/dashboard/Analysis.vue")
          }
        ]
      },
      {
        path: "/form",
        meta: {
          menuNode: true,
          icon: "form",
          title: "Form"
        },
        component: { render: (h: any) => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            meta: {
              menuNode: true,
              title: "Basic Form"
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/form/BasicForm.vue")
          },
          {
            path: "/form/setup-from",
            meta: {
              menuNode: true,
              title: "Setup Form"
            },
            component: { render: (h: any) => h("router-view") },
            children: [
              {
                path: "/form/setup-from",
                redirect: "/form/setup-from/info"
              },
              {
                path: "/form/setup-from/info",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/form/setup/Info.vue")
              },
              {
                path: "/form/setup-from/confirm",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/form/setup/Confirm.vue")
              },
              {
                path: "/form/setup-from/result",
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
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export { router as default, routes };

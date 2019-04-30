import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { findLastIndex } from "lodash";
import Auth from "@/utils/Auth";
import { notification } from "ant-design-vue";

Vue.use(Router);

const routes = [
  {
    path: "/user",
    meta: {
      effectedInMenu: false
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        meta: {
          authority: ["user", "admin"]
        },
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
          title: "Dashboard",
          authority: ["user", "admin"]
        },
        component: { render: (h: any) => h("router-view") },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
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
            name: "basic-form",
            meta: {
              menuNode: true,
              title: "Basic Form",
              authority: ["user", "admin"]
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/form/BasicForm.vue")
          },
          {
            path: "/form/setup-from",
            meta: {
              menuNode: true,
              title: "Setup Form",
              hideChildrenInMenu: true,
              authority: ["admin"]
            },
            component: { render: (h: any) => h("router-view") },
            children: [
              {
                path: "/form/setup-from",
                redirect: "/form/setup-from/info"
              },
              {
                path: "/form/setup-from/info",
                name: "setup-form-info",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/form/setup/Info.vue")
              },
              {
                path: "/form/setup-from/confirm",
                name: "setup-form-confirm",
                component: () =>
                  import(/* webpackChunkName: "form" */ "./views/form/setup/Confirm.vue")
              },
              {
                path: "/form/setup-from/result",
                name: "setup-form-result",
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
    path: "/403",
    name: "forbidden",
    meta: {
      effectedInMenu: false
    },
    component: () => import(/* webpackChunkName: "form" */ "./views/403.vue")
  },
  {
    path: "*",
    meta: {
      effectedInMenu: false
    },
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
    const authRecordIndex = findLastIndex(
      to.matched,
      record => record.meta.authority
    );
    if (authRecordIndex !== -1) {
      if (!Auth.isLogin()) {
        next({
          path: "/user/login",
          query: { redirect: to.fullPath }
        });
        NProgress.done();
        return;
      } else if (
        !Auth.checkAuthority(to.matched[authRecordIndex].meta.authority)
      ) {
        notification.error({
          message: "Error",
          description: "Call admin to set your authority!"
        });
        next({
          path: "/403"
        });
        NProgress.done();
        return;
      }
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export { router as default, routes };

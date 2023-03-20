import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      layout: "Standard",
      name: "Домашняя страница",
      typePage: "display",
    },
  },

  {
    path: "/organization/all",
    name: "organizationAll",
    component: () => import("../views/Organization/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Организации",
      typePage: "display",
    },
  },

  {
    path: "/organization/create",
    name: "organizationCreate",
    component: () => import("../views/Organization/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать организацию",
      typePage: "create",
    },
  },

  {
    path: "/organization/:id",
    name: "organizationEdit",
    component: () => import("../views/Organization/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать организацию",
      typePage: "edit",
    },
  },

  {
    path: "/division/create",
    name: "divisionCreate",
    component: () => import("../views/Division/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать вышестоящее подразделение",
      typePage: "create",
    },
  },

  {
    path: "/division/:id",
    name: "divisionEdit",
    component: () => import("../views/Division/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать вышестоящее подразделение",
      typePage: "edit",
    },
  },

  {
    path: "/division/all",
    name: "divisionAll",
    component: () => import("../views/Division/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все вышестоящее подразделение",
      typePage: "display",
    },
  },

  {
    path: "/subdivision/create",
    name: "subdivisionCreate",
    component: () => import("../views/Subdivision/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать подразделение",
      typePage: "create",
    },
  },

  {
    path: "/subdivision/:id",
    name: "subdivisionEdit",
    component: () => import("../views/Subdivision/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать подразделение",
      typePage: "edit",
    },
  },

  {
    path: "/subdivision/all",
    name: "subdivisionAll",
    component: () => import("../views/Subdivision/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все подразделения",
      typePage: "display",
    },
  },
  {
    path: "/position/all",
    name: "positionAll",
    component: () => import("../views/Position/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все должности",
      typePage: "display",
    },
  },
  {
    path: "/position/create",
    name: "positionCreate",
    component: () => import("../views/Position/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать должность",
      typePage: "create",
    },
  },
  {
    path: "/position/:id",
    name: "positionEdit",
    component: () => import("../views/Position/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать должность",
      typePage: "edit",
    },
  },
  {
    path: "/individual/create",
    name: "individualCreate",
    component: () => import("../views/Individual/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать физическое лицо",
      typePage: "create",
    },
  },
  {
    path: "/individual/:id",
    name: "individualEdit",
    component: () => import("../views/Individual/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактирование физического лица",
      typePage: "edit",
    },
  },
  {
    path: "/individual/all",
    name: "individualAll",
    component: () => import("../views/Individual/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Физические лица",
      typePage: "display",
    },
  },
  {
    path: "/employee/create",
    name: "employeeCreate",
    component: () => import("../views/Employee/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создать сотрудника",
      typePage: "create",
    },
  },

  {
    path: "/employee/:id",
    name: "employeeEdit",
    component: () => import("../views/Employee/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать сотрудника",
      typePage: "edit",
    },
  },

  {
    path: "/employee/all",
    name: "employeeAll",
    component: () => import("../views/Employee/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все сотрудники",
      typePage: "display",
    },
  },

  {
    path: "/employee/group",
    name: "employeeGroup",
    component: () => import("../views/Employee/Test.vue"),
    meta: {
      layout: "Standard",
      name: "Все сотрудники",
      typePage: "display",
    },
  },

  {
    path: "/user/create",
    name: "userCreate",
    component: () => import("../views/User/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Регистрация",
      typePage: "create",
    },
  },
  {
    path: "/user/:id",
    name: "userEdit",
    component: () => import("../views/User/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактировать пользователя",
      typePage: "edit",
    },
  },
  {
    path: "/user/all",
    name: "userAll",
    component: () => import("../views/User/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все пользователи",
      typePage: "display",
    },
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/User/Login.vue"),
    meta: {
      layout: "Center",
      name: "Регистрация",
      typePage: "create",
    },
  },
  {
    path: "/pdf",
    name: "PDF",
    component: () => import("../views/Pdf.vue"),
    meta: {
      layout: "Standard",
      name: "PDF",
      typePage: "display",
    },
  },
  {
    path: "/csv",
    name: "CSV",
    component: () => import("../views/Csv.vue"),
    meta: {
      layout: "Standard",
      name: "Csv",
      typePage: "display",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

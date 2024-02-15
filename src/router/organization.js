export default [
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

]
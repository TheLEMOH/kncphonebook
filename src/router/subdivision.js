export default [
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
]
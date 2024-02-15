export default [
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
]
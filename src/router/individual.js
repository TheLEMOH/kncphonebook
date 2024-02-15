export default [
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
]
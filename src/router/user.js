export default
    [
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

    ]